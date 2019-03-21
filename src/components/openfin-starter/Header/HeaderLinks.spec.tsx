import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import HeaderLinks from './HeaderLinks';

describe('HeaderLinks comp',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        shallow = createShallow();
        mount = createMount();
    });

    afterEach(()=>{
        mount.cleanUp();
    })

    it('renders correctly by default',()=>{

        const wrapper = shallow(<HeaderLinks
            windowsState={'normal'}
            onSwitchToLaunchBar={jest.fn()}
            onMinimize={jest.fn()}
            onMaximize={jest.fn()}
            onClose={jest.fn()}
        />);

        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();

    })

});