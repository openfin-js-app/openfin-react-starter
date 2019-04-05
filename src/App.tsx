import * as React from 'react';
import { useContext, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ApplicationContext, ConfigContext, MuiTheme } from 'react-openfin';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


import { primaryColor, infoColor, dangerColor} from './assets/jss/openfin-starter-constant';

import indexRoutes from './routes';

import hist from './utils/history';

const buildMuiTheme = (theme:MuiTheme)=>{
    return createMuiTheme({
        typography:{
            useNextVariants:true,
            fontSize: 8,
            htmlFontSize: 10,
        },
        palette:{
            type:theme,
            primary:{
                main:primaryColor,
            },
            secondary:{
                main:infoColor,
            },
            error:{
                main:dangerColor,
            },
        },
        overrides:{
            MuiButton:{
                root:{
                    color:'white',
                },
                contained:{
                    padding:'0px 5px',
                    minWidth:'50px',
                    minHeight:'20px',
                    color:'white',
                },
                containedPrimary:{
                    color:'white',
                },
                containedSecondary:{
                    color:'white',
                },
                sizeSmall:{
                    padding:'0px 5px',
                    minWidth:'40px',
                    minHeight:'16px',
                },
                sizeLarge:{
                    padding:'0px 5px',
                    minWidth:'60px',
                    minHeight:'25px',
                },
            },
            MuiChip:{
                root:{
                    height:'20px',
                },
                avatar:{
                    width:'20px',
                    height:'20px',
                    fontSize:'0.5rem',
                },
            },
            MuiFab:{
                root:{
                    padding: '0px 0px',
                    width:'40px',
                    height:'40px',
                }
            },
            MuiIconButton:{
                root:{
                    padding: '0px 0px',
                }
            },
            MuiListItem:{
                gutters:{
                    paddingTop:'2px',
                    paddingBottom:'2px',
                }
            },
            MuiSnackbarContent:{
                root:{
                    color:'white',
                }
            },
            MuiTabs:{
                root:{
                    minHeight:'24px',
                }
            },
            MuiTab:{
                root:{
                    minHeight:'24px',
                },
                labelContainer:{
                    paddingTop:'0px',
                    paddingBottom:'0px',
                }
            },
        }
    })
};


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
        console.log("App Entry::initCb");
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


    const muiTheme = buildMuiTheme(theme);

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

