import { ChannelType } from 'redux-openfin/init';
import { BrowserAdapter } from 'openfin-browser-adapter';
import configureStore from '../configureStore';

declare const window:any;


jest.mock('../../dexie/db');

describe('ConfigStore util', ()=>{

    beforeAll(()=>{
        window.fin = new BrowserAdapter({
            finUuid:process.env.REACT_APP_FIN_UUID,
            silentMode:process.env.REACT_APP_ENV==='test'
        });
    })

    it('default generator works with devToolsExtension',()=>{

        window.devToolsExtension=()=>((f:any):any => (f));

        const store = configureStore(
            [],
        );
        expect(store).toBeTruthy();
    });

    it('default generator works without devToolsExtension',()=>{

        delete window.devToolsExtension;

        const store = configureStore(
            [],
        );
        expect(store).toBeTruthy();
    });

});
