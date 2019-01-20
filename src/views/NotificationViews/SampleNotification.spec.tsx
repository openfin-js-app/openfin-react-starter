import * as React from 'react';

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

    beforeAll(() => {
        mount = createMount();
    });

    afterAll(() => {
        mount.cleanUp();
    });


    beforeEach(() => {
        shallow = createShallow();
    });

    it('render correctly by default',()=>{
        const wrapper = shallow(<SampleNotification store={store}/>);
        expect(wrapper).toMatchSnapshot();
    })

    it('check the content of typography',()=>{
        const wrapper = mount(<SampleNotification store={store}/>);
        expect(wrapper.find(Typography)).toMatchSnapshot();
    })

});