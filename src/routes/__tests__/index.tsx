import * as React from 'react';
import { InitializeReactOpenfin, ReactOpenfin } from 'react-openfin';

import { createShallow, createMount } from '@material-ui/core/test-utils';

import routes, {
    Dashboard, ChildWindow, Notification, LaunchBar,
} from '../index';
import i18n from "../../i18n";
import hist from "../../utils/history";


describe('Global routes',()=>{

    let shallow;
    let mount;

    beforeAll(()=>{
        InitializeReactOpenfin({
            finUuid: process.env.REACT_APP_FIN_UUID,
            finMockupForceSilentMode:true,
            i18n,
            hist,
            configTabs:[],
            launchBarItems:[],
        });
    })

    beforeEach(() => {
        shallow = createShallow();
        mount = createMount();
    });

    afterEach(()=>{
        mount.cleanUp();
    })

    it('default routes',()=>{
        expect(routes).toMatchSnapshot();
    })

    it('Dashboard',()=>{
        const wrapper = shallow(
            <ReactOpenfin>
                <Dashboard/>
            </ReactOpenfin>
        )
        expect(wrapper).toBeTruthy();
    })
    it('ChildWindow',()=>{
        const wrapper = shallow(
            <ChildWindow/>
        )
        expect(wrapper).toBeTruthy();
    })
    it('Notification',()=>{
        const wrapper = shallow(
            <Notification/>
        )
        expect(wrapper).toBeTruthy();
    })
    it('LaunchBar',()=>{
        const wrapper = shallow(
            <LaunchBar/>
        )
        expect(wrapper).toBeTruthy();
    })


})