import {
    APPLICATION_SET_LOADING_MSG,
    APPLICATION_LAUNCH_NEW_WINDOW,
} from './application/actions';

import {
    CLIENT_SET_VALUE,
} from './client/actions';

const sharedActions:string[]=[
    APPLICATION_SET_LOADING_MSG,
    APPLICATION_LAUNCH_NEW_WINDOW,
    CLIENT_SET_VALUE,
];

export default sharedActions;