import * as React from 'react';
import { act } from 'react-dom/test-utils';

import { Provider } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ConfigLangField from './ConfigLangField';

import GlobalContext from '../../../GlobalContext';
import {I18Language} from "../../../reduxs";

const theme = createMuiTheme({});
const mockStore = configurestore();
const zhState = {
    config:{
        application:{
            language:I18Language.zh_CN
        },
    },
};
const enState = {
    config:{
        application:{
            language:I18Language.en_US
        },
    },
};

describe('ConfigLangField',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it('render en-US correctly and switch to zh-CN',()=>{

        const store = mockStore(enState);
        const handleUpdateLangField = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <GlobalContext
                    config={enState.config}
                    onUpdateLangField={handleUpdateLangField}
                >
                    <ThemeProvider theme={theme}>
                        <ConfigLangField/>
                    </ThemeProvider>
                </GlobalContext>
            </Provider>
        );
        const btns = wrapper.find(Button);
        expect(btns).toHaveLength(1);

        // btns.props().onClick({event:{currentTarget:btns}});
        btns.simulate('click')

        // expect(wrapper.find(MenuItem)).toHaveLength(2);

        const menu = wrapper.find(Menu);
        menu.props().onClose();

        const menuItems = wrapper.find(MenuItem);
        expect(menuItems).toHaveLength(2);

        menuItems.at(1).simulate('click');

        expect(handleUpdateLangField).toHaveBeenCalled();
        expect(handleUpdateLangField.mock.calls).toMatchSnapshot();

    })

    it('render zh-CN correctly',()=>{

        const store = mockStore(zhState);
        const handleUpdateLangField = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <GlobalContext
                    config={enState.config}
                    onUpdateLangField={handleUpdateLangField}
                >
                    <ThemeProvider theme={theme}>
                        <ConfigLangField/>
                    </ThemeProvider>
                </GlobalContext>
            </Provider>
        );

        expect(wrapper.find(ConfigLangField)).toBeTruthy();

    })

})