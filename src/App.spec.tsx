import * as React from 'react';
import { Provider } from 'react-redux';

import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import GlobalContext from './GlobalContext';

import {I18Language, rootDefaultState} from './reduxs';

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
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App location={{pathname:'/'}}
                    />
                </MemoryRouter>
            </Provider>
        )

        const gCtx = wrapper.find(GlobalContext);

        expect(gCtx).toHaveLength(1);
        gCtx.at(0).props().onToggleThemeField();
        gCtx.at(0).props().onUpdateLangField(I18Language.en_US);

        expect(store.getActions()).toMatchSnapshot();

        expect(wrapper).toBeTruthy();
    })

});