import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import configurestore from 'redux-mock-store';

import Accessibility from './Accessibility';

const mockStore = configurestore();
const initialState = {};

const store = mockStore(initialState);

describe('AccessibilityView',()=>{

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

    it('render and fire actions when clicked',()=>{
       const wrapper = mount(<Accessibility store={store}/>);
       expect(wrapper.find(Button)).toHaveLength(10);
       wrapper.find(Button).forEach((button)=>{
           const props = button.props();
           if ( typeof props.onClick === 'function'){
               props.onClick();
           }
       });
       expect(store.getActions()).toHaveLength(4);
   })
});