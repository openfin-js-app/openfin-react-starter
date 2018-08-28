import { handleActions, Action } from 'redux-actions';

import {
    CONFIG_RESET, CONFIG_UPDATE_ONE_FIELD,
    CONFIG_UPDATE_GLOBAL_FILTER_STR,

    CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA,
    CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP,
    CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT,
} from './actions';
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
            if(oneField._name && (oneField._defaultValue || oneField._defaultValue==="")){
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
        let paths = name.split('.');
        if (paths.length == 2){
            result[paths[0]]={
                ...result[paths[0]],
                [paths[1]]:value,
            }
        }
        return result;
    },
    [CONFIG_UPDATE_GLOBAL_FILTER_STR]:(state,action)=>{
        const { configGlobalFilterString } = action.payload;
        return{
            ...state,
            configGlobalFilterString,
        };
    },
    [CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA]:(state,action)=>{
        const applicationConfig = state.application;

        return {
            ...state,
            application:{
                ...state.application,
                newWinTop: applicationConfig.newWinTop+ applicationConfig.newWindDeltaHeight,
                newWinLeft: applicationConfig.newWinLeft+ applicationConfig.newWindDeltaLeft,
            }
        };
    },
    [CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP]:(state,action)=>({
        ...state,
        application:{
            ...state.application,
            newWinTop: parseInt(process.env.REACT_APP_NEW_WINDOW_TOP),
        }
    }),
    [CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT]:(state,action)=>({
        ...state,
        application:{
            ...state.application,
            newWinLeft: parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT),
        }
    }),
},defaultState);