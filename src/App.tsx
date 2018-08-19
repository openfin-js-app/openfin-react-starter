import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import indexRoutes, {RouteCompItem, RouteItem } from './routes/index';

import hist from './utils/history';
import dashboardRoutes from "./routes/Dashboard";

const appLog = require('./assets/svg/app.svg') as string;

const theme = createMuiTheme({
    typography:{
        htmlFontSize: 10,
        fontSize: 8,
    }
});

class App extends React.Component<any,any>{
    render(){
        return (
            <React.Fragment>
                <CssBaseline/>
                <Router history={hist}>
                    <MuiThemeProvider theme={theme}>
                        <Switch>
                            {
                                indexRoutes.map((prop:any,key)=>{
                                    if (prop.redirect)
                                        return <Redirect from={prop.path} to={prop.to} key={key}/>;
                                    return <Route path={prop.path} component={prop.component} key={key}/>;

                                })
                            }
                        </Switch>
                    </MuiThemeProvider>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
