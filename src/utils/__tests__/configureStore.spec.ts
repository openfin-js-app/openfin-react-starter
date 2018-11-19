import { ChannelType } from '@albertli90/redux-openfin/init';
import { BrowserAdapter } from '@albertli90/openfin-browser-adapter';
import configureStore from '../configureStore';

declare const window:any;


jest.mock('../../dexie/db');

describe('ConfigStore util', ()=>{

    beforeAll(()=>{
        window.fin = new BrowserAdapter({silentMode:process.env.REACT_APP_ENV==='test'});
    })

    it('default generator works with devToolsExtension',()=>{

        window.devToolsExtension=()=>((f:any):any => (f));

        const store = configureStore(
            ChannelType.STANDALONE,
            "app-name-test-client-id",
            [],
        );
        expect(store).toBeTruthy();
    });

    it('default generator works without devToolsExtension',()=>{

        delete window.devToolsExtension;

        const store = configureStore(
            ChannelType.STANDALONE,
            "app-name-test-client-id",
            [],
        );
        expect(store).toBeTruthy();
    });

});
