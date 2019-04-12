import * as React from 'react';
import {Provider} from 'react-redux';
import { InitializeReactOpenfin, ReactOpenfin } from 'react-openfin';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import configurestore from 'redux-mock-store';


import ViewOne from './ViewOne';

import {rootDefaultState} from '../../reduxs';
import i18n from "../../i18n";
import hist from "../../utils/history";

const mockStore = configurestore();

const muiTheme = createMuiTheme({});
const store = mockStore(rootDefaultState);

describe('ViewOne',()=>{

    let shallow;
    let mount;

    beforeAll(()=>{
        InitializeReactOpenfin({
            finUuid: process.env.REACT_APP_FIN_UUID,
            finMockupForceSilentMode:true,
            i18n,
            hist,
            configTabs:[],
            launchBarItems:[],
        });
    })

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });


    it ('render correctly',()=>{

        const wrapper = mount(
            <ReactOpenfin>
                <Provider store={store}>
                    <ThemeProvider theme={muiTheme}>
                        <ViewOne/>
                    </ThemeProvider>
                </Provider>
            </ReactOpenfin>
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
