import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import configurestore from 'redux-mock-store';


import ViewTwo from './ViewTwo';

import {rootDefaultState} from '../../reduxs';

const mockStore = configurestore();

const store = mockStore(rootDefaultState);

describe('ViewTwo',()=>{

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


    it ('render correctly',()=>{

        const wrapper = mount(<ViewTwo store={store}/>);
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