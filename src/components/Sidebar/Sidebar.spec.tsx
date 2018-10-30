import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import Sidebar from './Sidebar';

describe('Sidebar comp',()=>{

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

    it('renders correctly by default',()=>{

        const wrapper = shallow(<Sidebar
            open={true}
            routes={[]}
            color = {'primary'}
            image = {undefined}
        />);

        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();

    })

});