import * as React from 'react';
import { Provider } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import Notification from './Notification';
import {MuiTheme} from "../../reduxs";

const muiTheme = createMuiTheme({});

const mockStore = configurestore();

const initialState = {
    config:{
        application:{
            theme:MuiTheme.LIGHT,
        }
    }
};

describe('Notification layout',()=>{

    let shallow;
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    afterAll(() => {
        mount.cleanUp();
    });


    beforeEach(() => {
        shallow = createShallow();
    });

    it('render in default state correctly',()=>{

        const store = mockStore(initialState);
        const wrapper = mount(
            <ThemeProvider theme={muiTheme}>
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/notification']}>
                        <Notification location={{pathname:'/notification'}}/>
                    </MemoryRouter>
                </Provider>
            </ThemeProvider>
        );

        expect(wrapper.find(Notification)).toHaveLength(1);
        expect(wrapper.find(IconButton)).toHaveLength(1);

        wrapper.find(IconButton).props().onClick();

        expect(store.getActions()).toMatchSnapshot();

    })

})