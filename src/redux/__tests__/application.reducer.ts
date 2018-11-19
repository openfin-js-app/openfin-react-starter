import { System, Window } from '@albertli90/redux-openfin';
import * as Actions from '../application/actions';
import reducerCreater from '../application/reducer';

const reducer = reducerCreater();

describe('Application reducer',()=>{

    it('System.actions.GET_MACHINE_ID_RES reduced correctly',()=>{
        const action:any = {type:System.actions.GET_MACHINE_ID_RES, payload:{id:'id'}};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });


    it('System.actions.GET_DEVICE_USER_ID_RES reduced correctly',()=>{
        const action:any = {type:System.actions.GET_DEVICE_USER_ID_RES, payload:{id:'id'}};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });


    it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - username',()=>{
        const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
            env:'username', value:'usernameVal'
            }};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - computername',()=>{
        const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
                env:'computername', value:'computernameVal'
            }};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('System.actions.GET_ENVIRONMENT_VARIABLE_RES reduced correctly - unmatched',()=>{
        const action:any = {type:System.actions.GET_ENVIRONMENT_VARIABLE_RES, payload:{
                env:'someEnv', value:'someVal'
            }};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('System.actions.GET_VERSION_RES reduced correctly',()=>{
        const action:any = {type:System.actions.GET_VERSION_RES, payload:{
            version:'versionStr'
            }};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('System.actions.GET_HOST_SPECS_RES reduced correctly',()=>{
        const action:any = {type:System.actions.GET_HOST_SPECS_RES, payload:{
                type: 'GET_HOST_SPECS_RES'
            }};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('Window.actions.GET_STATE_RES reduced correctly',()=>{
        const action:any = {type:Window.actions.GET_STATE_RES, payload:{
                state:'windowState'
            }};
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('APPLICATION_READY reduced correctly',()=>{
        const action:any = Actions.applicationReady();
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('APPLICATION_DRAWER_TOGGLE reduced correctly',()=>{
        const action:any = Actions.applicationDrawerToggle();
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('APPLICATION_NEW_SNACKBAR reduced correctly',()=>{
        const action:any = Actions.applicationNewSnackbar({
            message:'Snackbar message',
            variant:'primary',
        });
        const resultState = reducer(undefined,action);
        delete resultState.snackBarMsgQueue[0].key;
        expect(resultState).toMatchSnapshot();
    });

    it('APPLICATION_PROCESS_SNACKBAR_QUEUE reduced correctly - nonempty',()=>{
        const action:any = Actions.applicationProcessSnackbarQueue();
        expect(reducer({
            snackBarOpen:false,
            snackBarMsgInfo:{},
            snackBarMsgQueue:[{
                message:'Snackbar message',
                variant:'primary',
            }]
        },action)).toMatchSnapshot();
    });

    it('APPLICATION_PROCESS_SNACKBAR_QUEUE reduced correctly - empty',()=>{
        const action:any = Actions.applicationProcessSnackbarQueue();
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('APPLICATION_SET_SNACKBAR_STATUS reduced correctly - empty',()=>{
        const action:any = Actions.applicationSetSnackbarStatus({
            open:true,
        });
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE reduced correctly - empty',()=>{
        const action:any = Actions.applicationLaunchBarToggleCollapse();
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

});