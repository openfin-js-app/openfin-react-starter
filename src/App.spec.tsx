import * as React from 'react';
import * as enzyme from 'enzyme';

import App from './App';


describe('App Component',()=>{

  it ('render without crashing', ()=>{
    let wrapper:any = enzyme.shallow(<App></App>);
    expect(wrapper).toBeTruthy();
  })
});