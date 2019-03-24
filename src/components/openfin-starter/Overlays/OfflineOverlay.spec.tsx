import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import OfflineOverlay from './OfflineOverlay';

const muiTheme = createMuiTheme({});

describe('OfflineOverlay comp',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        shallow = createShallow();
        mount = createMount();
    });

    afterEach(()=>{
        mount.cleanUp();
    })

    it('renders correctly',()=>{

        const wrapper = shallow(
            <ThemeProvider theme={muiTheme}>
                <OfflineOverlay
                    onClose={jest.fn()}
                />
            </ThemeProvider>
        );

        // const component = wrapper.dive();
        expect(toJson(wrapper)).toMatchSnapshot();

    })

})