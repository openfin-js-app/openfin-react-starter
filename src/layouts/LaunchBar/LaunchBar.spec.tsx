import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import LaunchBar from './LaunchBar';

const mockStore = configurestore();
const initialState = {
    application:{
        launchBarCollapse:false,
    }
};

let store;

describe('LaunchBar Layout',()=>{

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
        store = mockStore(initialState);
    });

    it('render correctly and launch all non-disabled windows',()=>{
        const wrapper = mount(<LaunchBar store={store}/>);
        wrapper.find(IconButton).forEach((iconBtn)=>{
            const props = iconBtn.props();
            if ( props.disabled === false && typeof props.onClick === 'function'){
                props.onClick();
            }
        });
        expect(store.getActions()).toMatchSnapshot();
    });

    it('trigger all control panel btns',()=>{
        const wrapper = mount(<LaunchBar store={store}/>);
        wrapper.find(Button).forEach((btn)=>{
            const props = btn.props();
            if ( typeof props.onClick === 'function'){
                props.onClick();
            }
        });
        expect(store.getActions()).toMatchSnapshot();
    });

    it('render collapsed button container',()=>{
        store =mockStore({
            application:{
                launchBarCollapse:true,
            }
        });
        const wrapper = mount(<LaunchBar store={store}/>);
        expect(wrapper).toBeTruthy();
    });

});