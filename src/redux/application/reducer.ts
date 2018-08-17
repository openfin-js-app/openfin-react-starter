import { handleActions, Action } from 'redux-actions';
import { System, Window } from '@albertli/redux-openfin';

import {
    ApplicationNewSnackbarOption,
    ApplicationSetSnackbarStatusOption,
    SnackBarMsg, ApplicationState,
} from './types';

import {
    APPLICATION_READY,
    APPLICATION_DRAWER_TOGGLE,
    APPLICATION_NEW_SNACKBAR,
    APPLICATION_SET_SNACKBAR_STATUS,
    APPLICATION_PROCESS_SNACKBAR_QUEUE,
    APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,
} from './actions';

const defaultState:Partial<ApplicationState>={
    username:'',
    computerName:'',
    deviceId:null,
    deviceUserId:null,
    loading:true,
    drawerOpen:true,
    launchBarCollapse:false,
    snackBarOpen:false,
    snackBarMsgInfo:{},
    snackBarMsgQueue:[],
    openfinVersion:'n/a',
    openfinHostSpec:{},
    windowsState:'normal',
};

export default handleActions({
    [System.actions.GET_DEVICE_ID_RES]:(state,action)=>{
        const {id} = action.payload as any;
        return {
            ...state,
            deviceId:id
        };
    },
    [System.actions.GET_DEVICE_USER_ID_RES]:(state,action)=>{
        const {id} = action.payload as any;
        return {
            ...state,
            deviceUserId:id
        };
    },
    [System.actions.GET_ENVIRONMENT_VARIABLE_RES]:(state,action)=>{
        const {env,value} = action.payload as any;
        if (env==='username'){
            return {
                ...state,
                username:value,
            }
        }else if (env === 'computername'){
            return {
                ...state,
                computerName:value,
            }
        }else{
            return state;
        }
    },
    [System.actions.GET_VERSION_RES]:(state,action)=>{
        const {version} = action.payload as any;
        return {
            ...state,
            openfinVersion:version,
        };

    },
    [System.actions.GET_HOST_SPECS_RES]:(state,action)=>{
        const openfinHostSpec = action.payload as any;
        return {
            ...state,
            openfinHostSpec
        };

    },
    [Window.actions.GET_STATE_RES]:(state,action)=>{
        const payload = action.payload as any;
        return {
            ...state,
            windowState:payload.state,
        };

    },
    [APPLICATION_READY]:(state,action)=>({
        ...state,
        loading:false,
    }),
    [APPLICATION_DRAWER_TOGGLE]:(state,action)=>({
        ...state,
        drawOpen:!state.drawerOpen
    }),
    [APPLICATION_NEW_SNACKBAR]:(state,action)=>{
        let option:ApplicationNewSnackbarOption = action.payload as ApplicationNewSnackbarOption;
        let newMsgQueue = state.snackBarMsgQueue.concat([{
            message:option.message,
            key: new Date().getTime(),
            variant:option.variant,
        }]);
        return{
            ...state,
            snackBarMsgQueue:newMsgQueue,
        }
    },
    [APPLICATION_PROCESS_SNACKBAR_QUEUE]:(state,action)=>{
        if (state.snackBarMsgQueue.length > 0){
            let newMsg = state.snackBarMsgQueue[0];
            let newMsgQueue = state.snackBarMsgQueue.slice(1);
            return {
                ...state,
                snackBarOpen:true,
                snackBarMsgInfo: newMsg,
                snackBarMsgQueue: newMsgQueue,
            }
        }else{
            return state;
        }
    },
    [APPLICATION_SET_SNACKBAR_STATUS]:(state,action)=>{
        let option:ApplicationSetSnackbarStatusOption = action.payload as ApplicationSetSnackbarStatusOption;
        return {
            ...state,
            snackBarOpen:option.open,
        };
    },
    [APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE]:(state,action)=>({
        ...state,
        launchBarCollapse:!state.launchBarCollapse,
    })
},defaultState);