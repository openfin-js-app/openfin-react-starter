import * as Actions from '../client/actions';

import reducerCreator, { defaultState }  from '../client/reducer';

describe('Client reducer', ()=>{
    describe('With parent state', () => {
        let reducer

        beforeAll(()=>{
            reducer = reducerCreator(defaultState);
        })

        it ('CLIENT_SET_VALUE',()=>{
            const action = Actions.clientSetValue({count:1});
            expect(reducer(undefined,action)).toMatchSnapshot();
        })
    })
    describe('Without parent state', () => {
        let reducer

        beforeAll(()=>{
            reducer = reducerCreator();
        })

        it ('CLIENT_SET_VALUE',()=>{
            const action = Actions.clientSetValue({count:1});
            expect(reducer(undefined,action)).toMatchSnapshot();
        })
    })
})