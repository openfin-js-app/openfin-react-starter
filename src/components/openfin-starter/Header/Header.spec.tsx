import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import Header from './Header';

describe('Header comp',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });


    beforeEach(() => {
        shallow = createShallow();
    });

    it('renders correctly when sidebar opened',()=>{

        const wrapper = shallow(<Header
            routes={[]}
            color = {'primary'}
            open = {true}
            windowState = {'normal'}
            onSwitchToLaunchBar={jest.fn()}
            onMinimize={jest.fn()}
            onMaximize={jest.fn()}
            onClose={jest.fn()}
        />);

        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();

    })

    it('renders correctly when sidebar closed',()=>{

        const wrapper = shallow(<Header
            routes={[]}
            color = {'primary'}
            open = {false}
            windowState = {'normal'}
            onSwitchToLaunchBar={jest.fn()}
            onMinimize={jest.fn()}
            onMaximize={jest.fn()}
            onClose={jest.fn()}
        />);

        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();

    })

});