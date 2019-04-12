import sharedActions from '../sharedActions';

describe('shared actions',()=>{

    it('all shared actions', ()=>{
        expect(sharedActions).toMatchSnapshot();
    })

})
