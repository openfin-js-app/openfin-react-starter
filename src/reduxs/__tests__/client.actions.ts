import * as Actions from '../client/actions';

describe('Client actions',()=>{

    it('clientSetValue action',()=>{
        expect(Actions.clientSetValue({count:1})).toMatchSnapshot();
    })

})