import * as React from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ConfigLang from './ConfigLang';

const mockStore = configurestore();
const zhState = {
    config:{
        application:{
            language:'zh-CN'
        }
    },
};
const enState = {
    config:{
        application:{
            language:'en-US'
        }
    },
};

describe('ConfigLang',()=>{

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

    it('render en-US correctly and switch to zh-CN',()=>{

        const store = mockStore(enState);

        const wrapper = mount(<ConfigLang store={store}/>);

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

        expect(wrapper.find(ConfigLang)).toMatchSnapshot();

    })

    it('render zh-CN correctly',()=>{

        const store = mockStore(zhState);

        const wrapper = mount(<ConfigLang store={store}/>);

        expect(wrapper.find(ConfigLang)).toMatchSnapshot();

    })

})