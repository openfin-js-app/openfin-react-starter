import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configTabs, { MyConfigView } from './configTabs';
import launchBarItems from './launchBarItems';

describe('global constants',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        shallow = createShallow();
        mount = createMount();
    });

    afterEach(()=>{
        mount.cleanUp();
    })

    it('config tabs',()=>{
        expect(configTabs).toMatchSnapshot();
    })

    it('MyConfigView',()=>{
        const wrapper = shallow(<MyConfigView/>)
        expect(wrapper).toBeTruthy();
    })

    it('launchbar items',()=>{
        expect(launchBarItems).toMatchSnapshot();
    })

})