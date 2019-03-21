import * as React from 'react';
import { Provider } from 'react-redux';
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

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it('render and fire 8 actions when 8 btn clicked',()=>{
       const wrapper = mount(
           <Provider store={store}>
               <Accessibility/>
           </Provider>
       );
       expect(wrapper.find(Button)).toHaveLength(9);
       wrapper.find(Button).forEach((button)=>{
           const props = button.props();
           if ( typeof props.onClick === 'function'){
               props.onClick();
           }
       });
       expect(store.getActions()).toHaveLength(9);
    })
});