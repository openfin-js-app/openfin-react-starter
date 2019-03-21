import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import MySnackbarContent from './MySnackbarContent';

describe('MySnackbarContent comp',()=>{

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

        const onClose = jest.fn()

        const wrapper = shallow(<MySnackbarContent
            message={'message'}
            onClose={onClose}
            variant={'primary'}
        />);

        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();

    })

});