import puppeteer, {Browser} from 'puppeteer-core';

describe('Application E2E test',()=>{

    let browser:Browser;

    beforeAll(async ()=>{
        browser = await puppeteer.connect({
            browserUrl:'http://localhost:9022/',
            ignoreHTTPSErrors:true,
        } as any)

        console.log(browser.version());

    })

    it('App started',async ()=>{
        const pages = await browser.pages();
        expect(pages).toBeTruthy();
    })

});