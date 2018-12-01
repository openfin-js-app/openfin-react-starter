import * as Actions from '../client/actions';
import reducerCreator, {defaultState} from '../client/reducer';

import {CLIENT_SET_VALUE} from '../client/actions';

describe('Client reducer',()=>{

    describe('With parent state',  () => {

        let reducer

        beforeAll(()=>{
            reducer = reducerCreator(defaultState);
        })


        it('System.actions.GET_MACHINE_ID_RES reduced correctly',()=>{
            const action:any = {type:CLIENT_SET_VALUE, payload:{count:1}};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

    })

    describe('Without parent state',  () => {

        let reducer

        beforeAll(()=>{
            reducer = reducerCreator();
        })


        it('System.actions.GET_MACHINE_ID_RES reduced correctly',()=>{
            const action:any = {type:CLIENT_SET_VALUE, payload:{count:2}};
            expect(reducer(undefined,action)).toMatchSnapshot();
        });

    })

})