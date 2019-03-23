import * as React from 'react';
import toJson from 'enzyme-to-json';
import '../../../i18n';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import Button from '@material-ui/core/Button';

import ConfigAboutField from './ConfigAboutField';

const theme = createMuiTheme({});

describe('ConfigAboutField comp',  () => {

    let shallow;
    let mount;

    beforeEach(() => {
        shallow = createShallow();
        mount = createMount();
    });

    afterEach(()=>{
        mount.cleanUp();
    })

    it('renderred correctly',()=>{
        const wrapper = shallow(
            <ThemeProvider theme={theme}>
                <ConfigAboutField/>
            </ThemeProvider>
        );
        // const comp = wrapper.dive();
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('function correctly',()=>{

        const oldLocation = window.location;

        delete window.location;
        window.location = {} as any;

        location.reload = jest.fn();

        window.location.assign = jest.fn((l)=>{
            expect(l).toMatchSnapshot();
        })

        const wrapper = mount(
            <ThemeProvider theme={theme}>
                <ConfigAboutField/>
            </ThemeProvider>
        );
        expect(wrapper.find(Button)).toHaveLength(2);
        wrapper.find(Button).forEach((button)=>{
            const props = button.props();
            if ( typeof props.onClick === 'function'){
                props.onClick();
            }
        });

        expect(location.reload).toHaveBeenCalled();

        window.location = oldLocation;

    })

});