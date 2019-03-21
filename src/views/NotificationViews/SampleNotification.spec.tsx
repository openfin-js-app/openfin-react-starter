import * as React from 'react';
import { Provider } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { createShallow, createMount } from '@material-ui/core/test-utils';

import configurestore from 'redux-mock-store';

import SampleNotification from './SampleNotification';

const mockStore = configurestore();
const initialState = {
    client:{
        count: 0,
    }
};

const store = mockStore(initialState);

describe('SampleNotificationView',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it('render correctly by default',()=>{
        const wrapper = shallow(
            <Provider store={store}>
                <SampleNotification/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    })

    it('check the content of typography',()=>{
        const wrapper = mount(
            <Provider store={store}>
                <SampleNotification/>
            </Provider>
        );
        expect(wrapper.find(Typography)).toMatchSnapshot();
    })

});