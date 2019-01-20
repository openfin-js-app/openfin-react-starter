import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import TextField from '@material-ui/core/TextField';

import { FieldType } from '../../reduxs/config/types';

import ConfigField from './ConfigField';

describe('ConfigField comp',()=>{

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

    it('TITLE field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.TITLE}
            _label={'label'}
            value={''}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();
    })

    it('SUBHEADING field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.SUBHEADING}
            _label={'label'}
            value={''}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();
    })

    it('CUSTOM_FIELD field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.CUSTOM_FIELD}
            _label={'label'}
            value={''}
            _custom={<span>Custom field</span>}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();
    })

    it('CURRENCY field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.CURRENCY}
            _label={'label'}
            value={1}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        const comp = toJson(component);
        if (comp.props.id){
            comp.props.id = 'config_field_id';
        }
        expect(comp).toMatchSnapshot();
    })


    it('CURRENCY field fires onChange correctly',()=>{
        const onChange = jest.fn();
        const wrapper = mount(<ConfigField
            _type={FieldType.CURRENCY}
            _label={'label'}
            value={1}
            onChange={onChange}
        />);
        expect(wrapper.find(TextField)).toHaveLength(1);
        wrapper.find(TextField).props().onChange({target:{value:'2.345'}});
        expect(onChange).toHaveBeenCalled();
    })

    it('STRING field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.STRING}
            _label={'label'}
            value={'string'}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        const comp = toJson(component);
        if (comp.props.id){
            comp.props.id = 'config_field_id';
        }
        expect(comp).toMatchSnapshot();
    })


    it('STRING field fires onChange correctly',()=>{
        const onChange = jest.fn();
        const wrapper = mount(<ConfigField
            _type={FieldType.STRING}
            _label={'label'}
            value={'str1'}
            onChange={onChange}
        />);
        expect(wrapper.find(TextField)).toHaveLength(1);
        wrapper.find(TextField).props().onChange({target:{value:'str2'}});
        expect(onChange).toHaveBeenCalled();
    })

    it('NUMBER field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.NUMBER}
            _label={'label'}
            value={1}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        const comp = toJson(component);
        if (comp.props.id){
            comp.props.id = 'config_field_id';
        }
        expect(comp).toMatchSnapshot();
    })


    it('NUMBER field fires onChange correctly',()=>{
        const onChange = jest.fn();
        const wrapper = mount(<ConfigField
            _type={FieldType.NUMBER}
            _label={'label'}
            value={1}
            onChange={onChange}
        />);
        expect(wrapper.find(TextField)).toHaveLength(1);
        wrapper.find(TextField).props().onChange({target:{value:'2'}});
        expect(onChange).toHaveBeenCalled();
    })

    it('DATE field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.DATE}
            _label={'label'}
            value={'01/01/1990'}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        const comp = toJson(component);
        if (comp.props.id){
            comp.props.id = 'config_field_id';
        }
        expect(comp).toMatchSnapshot();
    })

    it('TIME field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.TIME}
            _label={'label'}
            value={new Date('1990-12-17T03:24:00')}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        const comp = toJson(component);
        if (comp.props.id){
            comp.props.id = 'config_field_id';
        }
        expect(comp).toMatchSnapshot();
    })

    it('DATETIME field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.DATETIME}
            _label={'label'}
            value={new Date('1990-12-17T03:24:00')}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        const comp = toJson(component);
        if (comp.props.id){
            comp.props.id = 'config_field_id';
        }
        expect(comp).toMatchSnapshot();
    })

    it('DATETIME field fires onChange correctly',()=>{
        const onChange = jest.fn();
        const wrapper = mount(<ConfigField
            _type={FieldType.DATETIME}
            _label={'label'}
            value={new Date('1990-12-17T03:24:00')}
            onChange={onChange}
        />);
        expect(wrapper.find(DateTimePicker)).toHaveLength(1);
        wrapper.find(DateTimePicker).props().onChange({_d:new Date('1991-12-17T03:24:00')});
        expect(onChange).toHaveBeenCalled();
    })

    it('BODY1 field renders correctly',()=>{
        const onChange = jest.fn();
        const wrapper = shallow(<ConfigField
            _type={FieldType.BODY1}
            _label={'label'}
            value={''}
            onChange={onChange}
        />);
        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();
    })

});