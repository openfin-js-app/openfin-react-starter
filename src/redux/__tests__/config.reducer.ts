import * as Actions from '../config/actions';
import reducer from '../config/reducer';

describe('Config reducer',()=>{

    it('CONFIG_RESET reduced correctly - all',()=>{
        const action:any = Actions.configReset({});
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('CONFIG_RESET reduced correctly - application',()=>{
        const action:any = Actions.configReset({
            tabName:'application',
        });
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('CONFIG_UPDATE_ONE_FIELD reduced correctly - valid',()=>{
        const action:any = Actions.configUpdateOneField({
            name:'sample.name',
            value:'sampleVal',
        });
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('CONFIG_UPDATE_ONE_FIELD reduced correctly - invalid',()=>{
        const action:any = Actions.configUpdateOneField({
            name:'sample_name',
            value:'sampleVal',
        });
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('CONFIG_UPDATE_GLOBAL_FILTER_STR reduced correctly',()=>{
        const action:any = Actions.configUpdateGlobalFilterStr({
            configGlobalFilterString:'configGlobalFilterString',
        });
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA reduced correctly',()=>{
        const action:any = Actions.configUpdateNewWindowPositionAddDelta();
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP reduced correctly',()=>{
        const action:any = Actions.configUpdateNewWindowPositionResetTop();
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

    it('CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT reduced correctly',()=>{
        const action:any = Actions.configUpdateNewWindowPositionResetLeft();
        expect(reducer(undefined,action)).toMatchSnapshot();
    });

});