import routes from '../Dashboard';

describe('Dashboard routes',()=>{

    it('default routes',()=>{
        expect(routes).toMatchSnapshot();
    })

})