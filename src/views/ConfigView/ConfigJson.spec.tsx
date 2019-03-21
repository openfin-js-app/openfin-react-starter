import * as React from 'react';
import { Provider } from 'react-redux';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ReactJson from 'react-json-view';

import ConfigJson from './ConfigJson';

import { defaultState } from '../../reduxs/config/reducer';

const mockStore = configurestore();
const initialState = {
    config:defaultState,
};

const store = mockStore(initialState);

describe('ConfigJson',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it('render correctly',()=>{
        const wrapper = mount(
            <Provider store={store}>
                <ConfigJson/>
            </Provider>
        );
        expect(wrapper.find(ReactJson)).toHaveLength(1);
        expect(wrapper).toBeTruthy();
    });

});