import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import Accessibility from './Accessibility';

const mockStore = configurestore();
const initialState = {};

const store = mockStore(initialState);

describe('AccessibilityView',()=>{

    let shallow;


    beforeEach(() => {
        shallow = createShallow();
    });

    it('render successfully',()=>{
       const wrapper = shallow(<Accessibility store={store}/>);
       expect(true).toBeTruthy();
   })
});