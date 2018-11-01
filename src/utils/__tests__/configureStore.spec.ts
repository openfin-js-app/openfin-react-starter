import { BrowserAdapter } from '@albertli/openfin-browser-adapter';
import configureStore from '../configureStore';

declare const window:any;


describe('ConfigStore util', ()=>{

    beforeAll(()=>{
        window.fin = new BrowserAdapter({userSocket:false});
    })

    it('default generator works with devToolsExtension',()=>{

        window.devToolsExtension=()=>((f:any):any => (f));

        const store = configureStore();
        expect(store).toBeTruthy();
    });

    it('default generator works without devToolsExtension',()=>{

        delete window.devToolsExtension;

        const store = configureStore();
        expect(store).toBeTruthy();
    });

});
