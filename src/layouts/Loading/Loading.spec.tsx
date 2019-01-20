import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import Loading from './Loading';
import { LoadingBar } from './Loading';

const mockStore = configurestore();
const initialState = {
    application:{
        loading:true,
    }
};

const store = mockStore(initialState);

describe('LoadingLayout',()=>{

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

    it('render correctly',()=>{
        const wrapper = shallow(<Loading store={store}/>);
        expect(wrapper).toBeTruthy();
    });


    it('Loading bar render correctly after a lone time',()=>{
        jest.useFakeTimers();
        const wrapper = mount(<LoadingBar/>);
        expect(wrapper).toBeTruthy();
        jest.advanceTimersByTime(10*60*1000);
        expect(wrapper).toBeTruthy();
    });

});