import * as React from 'react';
import { Provider } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import configurestore from 'redux-mock-store';


import ViewOne from './ViewOne';

import {rootDefaultState} from '../../reduxs';

const mockStore = configurestore();

const muiTheme = createMuiTheme({});
const store = mockStore(rootDefaultState);

describe('ViewOne',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });


    it ('render correctly',()=>{

        const wrapper = mount(
            <Provider store={store}>
                <ThemeProvider theme={muiTheme}>
                    <ViewOne/>
                </ThemeProvider>
            </Provider>
        );
        expect(wrapper.find(Button)).toHaveLength(2);

        wrapper.find(Button).forEach((button)=>{
            const props = button.props();
            if ( typeof props.onClick === 'function'){
                props.onClick();
            }
        });
        expect(store.getActions()).toMatchSnapshot();

    })
});