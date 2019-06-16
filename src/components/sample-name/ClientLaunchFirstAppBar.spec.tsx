import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import toJson from 'enzyme-to-json';

import ClientLaunchFirstAppBar from './ClientLaunchFirstAppBar'

describe('ClientLaunchFirstAppBar',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        shallow = createShallow();
        mount = createMount();
    });

    afterEach(()=>{
        mount.cleanUp();
    })

    it('render correctly by default',()=>{
        const wrapper = shallow(
            <ClientLaunchFirstAppBar/>
        )

        expect(toJson(wrapper)).toMatchSnapshot();
    })

})