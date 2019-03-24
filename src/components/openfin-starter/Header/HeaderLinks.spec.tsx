import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import HeaderLinks from './HeaderLinks';

const muiTheme = createMuiTheme({});

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

        const wrapper = shallow(
            <ThemeProvider theme={muiTheme}>
                <HeaderLinks
                    windowsState={'normal'}
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