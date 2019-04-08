import routes from '../notification';

describe('notification routes',()=>{

    it('default routes',()=>{
        expect(routes).toMatchSnapshot();
    })

})