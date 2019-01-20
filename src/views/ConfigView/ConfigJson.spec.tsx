import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ConfigJson from './ConfigJson';

import { defaultState } from '../../reduxs/config/reducer';

const mockStore = configurestore();
const initialState = {
    config:defaultState,
};

const store = mockStore(initialState);

describe('ConfigJson',()=>{

    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    afterAll(() => {
        mount.cleanUp();
    });

    it('render correctly',()=>{
        const wrapper = mount(<ConfigJson store={store}/>);
        expect(wrapper).toBeTruthy();
    });

});