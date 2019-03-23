import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import Header from './Header';

const muiTheme = createMuiTheme({});

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

    it('renders correctly when sidebar opened',()=>{

        const wrapper = shallow(
            <ThemeProvider theme={muiTheme}>
                <Header
                    routes={[]}
                    color = {'primary'}
                    open = {true}
                    windowsState = {'normal'}
                    onSwitchToLaunchBar={jest.fn()}
                    onMinimize={jest.fn()}
                    onMaximize={jest.fn()}
                    onClose={jest.fn()}
                />
            </ThemeProvider>
        );

        // const component = wrapper.dive();
        expect(toJson(wrapper)).toMatchSnapshot();

    })

    it('renders correctly when sidebar closed',()=>{

        const wrapper = shallow(
            <ThemeProvider theme={muiTheme}>
                <Header
                    routes={[]}
                    color = {'primary'}
                    open = {false}
                    windowsState = {'normal'}
                    onSwitchToLaunchBar={jest.fn()}
                    onMinimize={jest.fn()}
                    onMaximize={jest.fn()}
                    onClose={jest.fn()}
                />
            </ThemeProvider>
        );

        // const component = wrapper.dive();
        expect(toJson(wrapper)).toMatchSnapshot();

    })

});