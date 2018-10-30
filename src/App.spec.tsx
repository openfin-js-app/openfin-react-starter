import * as React from 'react';
import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';

import { rootDefaultState } from './redux';

import App from './App';

const mockStore = configurestore();
const store = mockStore(rootDefaultState);

describe('App entry',()=>{

    let shallow;
    let mount;
    let render;

    beforeAll(() => {
        mount = createMount();
        render = createRender();
    });

    afterAll(() => {
        mount.cleanUp();
    });


    beforeEach(() => {
        shallow = createShallow();
    });

    it('it renders correctly by default',()=>{
        const wrapper = render(
            <MemoryRouter initialEntries={['/']}>
                <App store={store} location={{pathname:'/'}}
                />
            </MemoryRouter>
        )
        expect(wrapper).toBeTruthy();
    })

});