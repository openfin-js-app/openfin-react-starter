import { handleActions, Action } from 'redux-actions';
import { Docking, System, Window, Event } from '@albertli90/redux-openfin';

import {
    IApplicationNewSnackbarOption,
    IApplicationSetSnackbarStatusOption,
    ISnackBarMsg, IApplicationState,
} from './types';

import {
    APPLICATION_READY,
    APPLICATION_DRAWER_TOGGLE,
    APPLICATION_NEW_SNACKBAR,
    APPLICATION_SET_SNACKBAR_STATUS,
    APPLICATION_PROCESS_SNACKBAR_QUEUE,
    APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,
    APPLICATION_NETWORK_ONLINE,
    APPLICATION_NETWORK_OFFLINE,
} from './actions';

export const defaultState:Partial<IApplicationState>={
    offline:false,
    username:'',
    computerName:'',
    machineId:null,
    deviceUserId:null,
    loading:true,
    docked:false,
    winTop:0,
    winLeft:0,
    winWidth:0,
    winHeight:0,
    drawerOpen:true,
    launchBarCollapse:false,
    snackBarOpen:false,
    snackBarMsgInfo:{},
    snackBarMsgQueue:[],
    openfinVersion:'n/a',
    openfinHostSpec:{},
    windowsState:'normal',
};

export default (parentWindowState?:Partial<IApplicationState>)=>{
    let initState:Partial<IApplicationState>;

    if (parentWindowState){
        initState ={
            ...parentWindowState,
            docked:false,
            winTop:0,
            winLeft:0,
            winWidth:0,
            winHeight:0,
            snackBarMsgInfo:{},
            snackBarMsgQueue:[],
            openfinHostSpec:{
                ...parentWindowState.openfinHostSpec,
            },
            windowsState:'normal',
        }

    }else{
        initState = defaultState;
    }

    return handleActions({
        [System.actions.GET_MACHINE_ID_RES]:(state,action)=>{
            const {id} = action.payload as any;
            return {
                ...state,
                machineId:id
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
            if (env.toLowerCase()==='username'){
                return {
                    ...state,
                    username:value,
                }
            }else if ((env.toLowerCase() === 'computername' || env.toLowerCase() === 'hostname') && value){
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
                windowsState:payload.state,
            };

        },
        [Window.actions.GET_BOUNDS_RES]:(state,action)=>{
            const payload = action.payload as any;
            return {
                ...state,
                winTop:payload.top,
                winLeft:payload.left,
                winWidth:payload.width,
                winHeight:payload.height,
            };

        },
        [Event.actionDicts.windowEventDictByName['bounds-changing'].type]:(state,action)=>{
            const payload = action.payload as any;
            return {
                ...state,
                winTop:payload.top,
                winLeft:payload.left,
                winWidth:payload.width,
                winHeight:payload.height,
            };

        },
        [Event.actionDicts.windowEventDictByName['group-changed'].type]:(state,action)=>{
            const {
                sourceWindowName, targetWindowName, memeberOf, reason
            } = action.payload;

            if (reason === Docking.types.GroupEventReason.JOIN && sourceWindowName === window.name){
                return {
                    ...state,
                    docked:true,
                }
            }else if(reason === Docking.types.GroupEventReason.LEAVE && sourceWindowName === window.name){
                return {
                    ...state,
                    docked:false,
                }
            }

            return state;
        },
        [APPLICATION_READY]:(state,action)=>({
            ...state,
            loading:false,
        }),
        [APPLICATION_DRAWER_TOGGLE]:(state,action)=>({
            ...state,
            drawerOpen:!state.drawerOpen
        }),
        [APPLICATION_NEW_SNACKBAR]:(state,action)=>{
            const option:IApplicationNewSnackbarOption = action.payload as IApplicationNewSnackbarOption;
            const newMsgQueue = state.snackBarMsgQueue.concat([{
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
                const newMsg = state.snackBarMsgQueue[0];
                const newMsgQueue = state.snackBarMsgQueue.slice(1);
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
            const option:IApplicationSetSnackbarStatusOption = action.payload as IApplicationSetSnackbarStatusOption;
            return {
                ...state,
                snackBarOpen:option.open,
            };
        },
        [APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE]:(state,action)=>({
            ...state,
            launchBarCollapse:!state.launchBarCollapse,
        }),
        [APPLICATION_NETWORK_ONLINE]:(state,action)=>({
            ...state,
            offline:false,
        }),
        [APPLICATION_NETWORK_OFFLINE]:(state,action)=>({
            ...state,
            offline:true,
        }),
    } as any,initState);
}