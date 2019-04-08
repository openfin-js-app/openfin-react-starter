import * as React from 'react';
import {Provider} from 'react-redux';
import { InitializeReactOpenfin, ReactOpenfin } from 'react-openfin';
import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import { rootDefaultState } from './reduxs'
import i18n from "./i18n";
import hist from "./utils/history";

import App from './App';

const mockStore = configurestore();
const store = mockStore(rootDefaultState);

describe('App entry', ()=>{

    let shallow;
    let mount;
    let render;

    beforeAll(() => {
        InitializeReactOpenfin({
            finUuid: process.env.REACT_APP_FIN_UUID,
            finMockupForceSilentMode:true,
            i18n,
            hist,
            configTabs:[],
            launchBarItems:[],
        });
        mount = createMount();
        render = createRender();
    });

    afterAll(() => {
        mount.cleanUp();
    });


    beforeEach(() => {
        shallow = createShallow();
    });

    it('it renders correctly by default',()=>{
        const wrapper = mount(
            <ReactOpenfin>
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/']}>
                        <App/>
                    </MemoryRouter>
                </Provider>
            </ReactOpenfin>
        )

        expect(store.getActions()).toMatchSnapshot();

        expect(wrapper).toBeTruthy();
    })


})