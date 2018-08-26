import { handleActions, Action } from 'redux-actions';

import { CONFIG_RESET, CONFIG_UPDATE_ONE_FIELD } from './actions';
import { ConfigTab, ConfigField, FieldType, ConfigState } from './types';
import configTabs from './constant';

function buildDefaultState(configTabs: ConfigTab[]):ConfigState{
    let result:ConfigState = {
        configGlobalFilterString:'',
        _tabs:configTabs,
    };
    configTabs.forEach(oneTab =>{
        oneTab._fieldLabels='';
        result[oneTab._name]={};
        oneTab._fields.forEach(oneField =>{
            oneTab._fieldLabels = oneTab._fieldLabels+oneField._label;
            if(oneField._name && oneField._defaultValue){
                result[oneTab._name][oneField._name]=oneField._defaultValue;
            }
        })
    });
    return result;
}

const defaultState:ConfigState = buildDefaultState(configTabs);

export default handleActions({
    [CONFIG_RESET]:(state,action)=>{
      const {tabName} = action.payload;
      if(tabName){
          return {
              ...state,
              tabName:defaultState[tabName],
          }
      }else{
          return defaultState;
      }
    },
    [CONFIG_UPDATE_ONE_FIELD]:(state,action)=>{
        const {name,value} = action.payload;
        let result = {...state};
        let paths = name.splite('.');
        if (paths.length == 2){
            result[paths[0]][paths[1]] = value;
        }
        return result;
    }
},defaultState);