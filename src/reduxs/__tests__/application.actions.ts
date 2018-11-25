import configureStore from 'redux-mock-store';
import * as Actions from '../application/actions';

const mockStore = configureStore();
const initialState = {};

const store = mockStore(initialState);

describe('Application actions',()=>{

    beforeEach(()=>{
        store.clearActions();
    });

    it('applicationStarted created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationStarted());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationChildStarted created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationChildStarted());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationReady created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationReady());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationDrawerToggle created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationDrawerToggle());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationToogleWindowState created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationToogleWindowState());
        expect(store.getActions()).toMatchSnapshot();
    });

    // snackbar

    it('applicationNewSnackbar created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationNewSnackbar({
            message:'Snackbar message',
            variant:'primary',
        }));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationSetSnackbarStatus created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationSetSnackbarStatus({
            open:false,
        }));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationProcessSnackbarQueue created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationProcessSnackbarQueue());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationCloseSnackbar created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationCloseSnackbar({
            event:{type:'sample event obj'},
            reason:'reason',
        }));
        expect(store.getActions()).toMatchSnapshot();
    });

    // launch bar

    it('applicationLaunchBarToggle created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationLaunchBarToggle());
        expect(store.getActions()).toMatchSnapshot();
    });


    it('applicationLaunchBarToggleCollapse created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationLaunchBarToggleCollapse());
        expect(store.getActions()).toMatchSnapshot();
    });

    it('applicationLaunchNewWindow created and dispatched correctly',()=>{
        store.dispatch(Actions.applicationLaunchNewWindow({
            type: 'mock up app json obj'
        }));
        expect(store.getActions()).toMatchSnapshot();
    });

});