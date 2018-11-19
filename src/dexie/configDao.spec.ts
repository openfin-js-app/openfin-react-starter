import { findAll, saveOrUpdateOneByTabNameFieldName } from './configDao';
import db from './db';

jest.mock('./db');

describe('ConfigDao',()=>{

    it('findAll async',async ()=>{
        const founds = await findAll();
        expect(founds).toMatchSnapshot();
    })


    it('saveOrUpdateOneByTabNameFieldName async',async ()=>{
        const saved = await saveOrUpdateOneByTabNameFieldName(
            'tabName', 'fieldName', 'value'
        );
        expect(saved).toMatchSnapshot();
    })

    describe('with preset',()=>{
        beforeAll(()=>{
            const configs = db.table('configs');
            configs.put({
                tabName:'tabName', fieldName:'fieldName', value:'value',
            });
            configs.put({
                tabName:'tabName', fieldName:'fieldName', value:'value',
            });
        })

        it('saveOrUpdateOneByTabNameFieldName async with preset',async ()=>{
            const saved = await saveOrUpdateOneByTabNameFieldName(
                'tabName', 'fieldName', 'value'
            );
            expect(saved).toMatchSnapshot();
        })


        it('saveOrUpdateOneByTabNameFieldName async update',async ()=>{
            const saved = await saveOrUpdateOneByTabNameFieldName(
                'tabName', 'fieldName', 'value2'
            );
            expect(saved).toMatchSnapshot();
        })

    })

});