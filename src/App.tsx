import * as React from 'react';
import { useContext, useEffect} from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ApplicationContext, ConfigContext, MuiTheme } from 'react-openfin';
import { buildMuiTheme } from 'react-openfin-mat-impl';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import indexRoutes from './routes';

import hist from './utils/history';

const App:React.FunctionComponent<{}> = (
    {
    }
)=>{

    const {
        state:{
            loading,
        },
        actions:{
            onApplicationStart,
            onChildWinStart,
            onNotificationStart,
        }
    } = useContext(ApplicationContext);

    useEffect(()=>{
        console.log("App Entry::init effect");
        // !!!README!!!
        // make sure to start the application/childWindow/Notification at the Entry component to boot react-openfin
        if (window.name === process.env.REACT_APP_FIN_UUID){
            onApplicationStart();
        }else if (window.location && window.location.pathname.toLowerCase().indexOf('notification')>-1){
            onNotificationStart();
        }else{
            onChildWinStart();
        }
    },[]);

    const {
        config:{
            application:{
                theme
            }
        }
    } = useContext(ConfigContext);


    const muiTheme = buildMuiTheme({},theme);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Router history={hist}>
                <MuiThemeProvider theme={muiTheme}>
                    <ThemeProvider theme={muiTheme}>
                        <Switch>
                            {
                                indexRoutes.map((prop:any,key)=>{
                                    if (prop.redirect)
                                        return <Redirect from={prop.path} to={prop.to} key={key}/>;
                                    return <Route path={prop.path} component={prop.component} key={key}/>;

                                })
                            }
                        </Switch>
                    </ThemeProvider>
                </MuiThemeProvider>
            </Router>
        </React.Fragment>
    );
}


export default App;

