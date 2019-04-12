import routes from '../ChildWindow';

describe('ChildWindow routes',()=>{

    it('default routes',()=>{
        expect(routes).toMatchSnapshot();
    })

})