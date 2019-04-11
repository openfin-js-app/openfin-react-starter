import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import {Provider} from 'react-redux';
import { InitializeReactOpenfin, ReactOpenfin } from 'react-openfin';
import configurestore from 'redux-mock-store';

import Accessibility from './Accessibility';
import i18n from "../../i18n";
import hist from "../../utils/history";

const mockStore = configurestore();
const initialState = {};

const store = mockStore(initialState);

describe('AccessibilityView',()=>{

    let shallow;
    let mount;

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
    });

    afterAll(() => {
        mount.cleanUp();
    });


    beforeEach(() => {
        shallow = createShallow();
    });

    it('render and fire 8 actions when 8 btn clicked',()=>{
        const wrapper = mount(
            <ReactOpenfin>
                <Provider store = {store}>
                    <Accessibility/>
                </Provider>
            </ReactOpenfin>
        );
        expect(wrapper.find(Button)).toHaveLength(9);
        wrapper.find(Button).forEach((button)=>{
            const props = button.props();
            if ( typeof props.onClick === 'function'){
                props.onClick();
            }
        });
        expect(store.getActions()).toHaveLength(0);
    })
});
