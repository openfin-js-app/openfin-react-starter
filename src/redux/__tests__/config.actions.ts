import configureStore from 'redux-mock-store';
import * as Actions from '../config/actions';

const mockStore = configureStore();
const initialState = {};

const store = mockStore(initialState);

describe('Config actions',()=>{

    beforeEach(()=>{
        store.clearActions();
    });

    it('configReset created and dispatched correctly',()=>{
        store.dispatch(Actions.configReset());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('configUpdateOneField created and dispatched correctly',()=>{
        store.dispatch(Actions.configUpdateOneField({
            name:'name', value:'value',
        }));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('configUpdateGlobalFilterStr created and dispatched correctly',()=>{
        store.dispatch(Actions.configUpdateGlobalFilterStr({
            configGlobalFilterString:'configGlobalFilterString',
        }));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('configUpdateNewWindowPosition created and dispatched correctly',()=>{
        store.dispatch(Actions.configUpdateNewWindowPosition());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('configUpdateNewWindowPositionAddDelta created and dispatched correctly',()=>{
        store.dispatch(Actions.configUpdateNewWindowPositionAddDelta());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('configUpdateNewWindowPositionResetTop created and dispatched correctly',()=>{
        store.dispatch(Actions.configUpdateNewWindowPositionResetTop());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('configUpdateNewWindowPositionResetLeft created and dispatched correctly',()=>{
        store.dispatch(Actions.configUpdateNewWindowPositionResetLeft());
        expect(store.getActions()).toMatchSnapshot();
    });

});