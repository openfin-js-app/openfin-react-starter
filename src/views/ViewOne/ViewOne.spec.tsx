import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import ViewOne from './ViewOne';

describe('ViewOne',()=>{

    let shallow;

    beforeAll(() => {
        shallow = createShallow();
    });

    it ('render correctly',()=>{

        const wrapper = shallow(<ViewOne/>);
        const spanEle = wrapper.find('span');

        expect(spanEle).toHaveLength(1);

        expect(spanEle.get(0).props).toMatchSnapshot();

    })
});