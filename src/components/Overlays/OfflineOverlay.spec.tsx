import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import OfflineOverlay from './OfflineOverlay';

describe('OfflineOverlay comp',()=>{

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

    it('renders correctly',()=>{

        const wrapper = shallow(<OfflineOverlay
            onClose={jest.fn()}
        />);

        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();

    })

})