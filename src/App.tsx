import * as React from 'react';

import './app.css';

const appLog = require('./assets/svg/app.svg') as string;

class App extends React.Component<any,any>{
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src={appLog} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
