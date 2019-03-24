import * as React from 'react';
import toJson from 'enzyme-to-json';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';

import MySnackbarContent from './MySnackbarContent';

const muiTheme = createMuiTheme({});

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

        const wrapper = shallow(
            <ThemeProvider theme={muiTheme}>
                <MySnackbarContent
                    message={'message'}
                    onClose={onClose}
                    variant={'primary'}
                />
            </ThemeProvider>
        );

        // const component = wrapper.dive();
        expect(toJson(wrapper)).toMatchSnapshot();

    })

});