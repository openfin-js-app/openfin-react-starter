import * as React from 'react';
import { Provider } from 'react-redux';

import Switch from '@material-ui/core/Switch';

import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ConfigTheme from './ConfigTheme';

import GlobalContext from '../../GlobalContext';
import {MuiTheme} from "../../reduxs";

const mockStore = configurestore();

const darkState = {
    config:{
        application:{
            theme:MuiTheme.DARK
        },
    },
};

const lightState = {
    config:{
        application:{
            theme:MuiTheme.LIGHT
        },
    },
};

describe('Config Theme',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it('render dark correctly and switch to light',()=>{

        const store = mockStore(darkState);
        const handleToggleThemeField = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <GlobalContext
                    config={darkState.config}
                    onToggleThemeField={handleToggleThemeField}
                >
                    <ConfigTheme/>
                </GlobalContext>
            </Provider>
        );

        const switches = wrapper.find(Switch);
        expect(switches).toHaveLength(1);

        switches.at(0).props().onChange();

        expect(handleToggleThemeField).toHaveBeenCalled();
        expect(handleToggleThemeField.mock.calls).toMatchSnapshot();


    })

    it('render light correctly and switch to dark',()=>{

        const store = mockStore(lightState);
        const handleToggleThemeField = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <GlobalContext
                    config={lightState.config}
                    onToggleThemeField={handleToggleThemeField}
                >
                    <ConfigTheme/>
                </GlobalContext>
            </Provider>
        );

        const switches = wrapper.find(Switch);
        expect(switches).toHaveLength(1);

        switches.at(0).props().onChange();

        expect(handleToggleThemeField).toHaveBeenCalled();
        expect(handleToggleThemeField.mock.calls).toMatchSnapshot();


    })

})