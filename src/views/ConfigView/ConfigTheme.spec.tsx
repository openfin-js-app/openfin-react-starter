import * as React from 'react';

import Switch from '@material-ui/core/Switch';

import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ConfigTheme from './ConfigTheme';
import {MuiTheme} from "../../reduxs";
import Button from "@material-ui/core/Button";

const mockStore = configurestore();

const darkState = {
    config:{
        application:{
            theme:MuiTheme.DARK
        }
    },
};

const lightState = {
    config:{
        application:{
            theme:MuiTheme.LIGHT
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

    it('render dark correctly and switch to light',()=>{

        const store = mockStore(darkState);
        const wrapper = mount(<ConfigTheme store={store}/>);

        const switches = wrapper.find(Switch);
        expect(switches).toHaveLength(1);

        switches.at(0).props().onChange();

        expect(wrapper.find(ConfigTheme)).toMatchSnapshot();
        expect(store.getActions()).toMatchSnapshot();


    })

    it('render light correctly and switch to dark',()=>{

        const store = mockStore(lightState);
        const wrapper = mount(<ConfigTheme store={store}/>);

        const switches = wrapper.find(Switch);
        expect(switches).toHaveLength(1);

        switches.at(0).props().onChange();

        expect(wrapper.find(ConfigTheme)).toMatchSnapshot();
        expect(store.getActions()).toMatchSnapshot();


    })

})