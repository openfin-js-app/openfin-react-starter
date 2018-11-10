import db from './db';

import { IConfigDexie } from '../redux';


export async function findAll():Promise<IConfigDexie[]>{
    return  db.table('configs').toArray();
}

export async function saveOrUpdateOneByTabNameFieldName(tabName:string, fieldName:string, value:any):Promise<IConfigDexie> {
    let one:IConfigDexie = null;
    const configs = db.table('configs');
    await db.transaction('rw',configs,async()=>{
        const founds:IConfigDexie[] = await configs
            .where({tabName,fieldName})
            .toArray();
        console.log('configDao::saveOrUpdateOneByTabNameFieldName',founds.length,founds,tabName,fieldName,value);
        if (founds.length === 0){
            one = {tabName,fieldName,value};
            const id = await configs.put(one);
            one = await configs.get(id);
        }else if (founds.length === 1){
            one = founds[0];
            await configs.update(one.id,{value});
            one = await configs.get(one.id);
        }else{
            await configs.bulkDelete(founds.map(one => one.id));
            one = {tabName,fieldName,value};
            const id = await configs.put(one);
            one = await configs.get(id);
        }
    });
    return one;
}