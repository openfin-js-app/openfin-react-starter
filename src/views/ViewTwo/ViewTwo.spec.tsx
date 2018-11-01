import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ViewTwo from './ViewTwo';

describe('ViewOne',()=>{


    it ('render correctly',()=>{

        const wrapper = shallow(<ViewTwo/>);
        const spanEle = wrapper.find('span');

        expect(spanEle).toHaveLength(1);
        expect(spanEle.get(0).props).toMatchSnapshot();

    })
});