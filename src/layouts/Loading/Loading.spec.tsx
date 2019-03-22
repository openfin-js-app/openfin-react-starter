import * as React from 'react';
import { Provider } from 'react-redux';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import Loading from './Loading';
import { LoadingBarComponent } from './Loading';

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
        const wrapper = shallow(
            <Provider store={store}>
                <Loading/>
            </Provider>
        );
        expect(wrapper).toBeTruthy();
    });


    it('Loading bar render correctly after a lone time',()=>{
        jest.useFakeTimers();
        const wrapper = mount(<LoadingBarComponent/>);
        expect(wrapper).toBeTruthy();
        jest.advanceTimersByTime(10*60*1000);
        expect(wrapper).toBeTruthy();
    });

});