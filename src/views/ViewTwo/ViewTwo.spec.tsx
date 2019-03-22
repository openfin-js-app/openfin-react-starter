import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import configurestore from 'redux-mock-store';


import ViewTwo from './ViewTwo';

import {rootDefaultState} from '../../reduxs';
import {Provider} from "react-redux";

const mockStore = configurestore();

const store = mockStore(rootDefaultState);

describe('ViewTwo',()=>{

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
                <ViewTwo/>
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