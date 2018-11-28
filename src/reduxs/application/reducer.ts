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
} from './actions';

export const defaultState:Partial<IApplicationState>={
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
        [Docking.actions.DOCK_WINDOW_RES]:(state,action)=>{
            const {windowName} = action.payload;
            return {
                ...state,
                docked:window.name === windowName? true: state.docked,
            }
        },
        [Docking.actions.UNDOCK_WINDOW_RES]:(state,action)=>{
            const {windowName} = action.payload;
            return {
                ...state,
                docked:window.name === windowName? false: state.docked,
            }
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
        })
    } as any,initState);
}