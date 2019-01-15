import * as React from 'react';
import { Provider } from 'react-redux';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ConfigView from './ConfigView';

import { defaultState } from '../../reduxs/config/reducer';

const mockStore = configurestore();
const initialState = {
    config:defaultState,
};

const store = mockStore(initialState);

describe('ConfigView',()=>{

    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    afterAll(() => {
        mount.cleanUp();
    });

    it('render correctly',()=>{
        const wrapper = mount(
            <Provider store={store}>
                <ConfigView/>
            </Provider>
        );
        expect(wrapper).toBeTruthy();
    });

});