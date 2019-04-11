import { compose } from 'redux';
import { BrowserAdapter } from 'openfin-browser-adapter';

import configureStore from '../configureStore';
declare const window:any;

describe('ConfigStore util', ()=>{

    beforeAll(()=>{
        window.fin = new BrowserAdapter({
            finUuid:process.env.REACT_APP_FIN_UUID,
            silentMode:process.env.REACT_APP_ENV==='test'
        });
    })

    it('default generator works with devToolsExtension',()=>{

        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__= compose;

        const store = configureStore(
            [],
        );
        expect(store).toBeTruthy();
    });

    it('default generator works without devToolsExtension',()=>{

        delete window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

        const store = configureStore(
            [],
        );
        expect(store).toBeTruthy();
    });

});
