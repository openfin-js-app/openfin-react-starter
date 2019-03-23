import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import Sidebar from './Sidebar';

const muiTheme = createMuiTheme({});

describe('Sidebar comp',()=>{

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
                <Sidebar
                    open={true}
                    routes={[]}
                    color = {'primary'}
                    image = {undefined}
                />
            </ThemeProvider>
        );

        // const component = wrapper.dive();
        expect(toJson(wrapper)).toMatchSnapshot();

    })

});