import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import indexRoutes from './routes/index';

import hist from './utils/history';

const theme = createMuiTheme({
    typography:{
        useNextVariants:true,
        fontSize: 8,
        htmlFontSize: 10,
    },
    palette:{
        type:'dark',
        background:{
            default:'#303030'
        },
        primary:{
            main:'#23a4fb',
        },
        secondary:{
            main:'#b2b9c2',
        },
        error:{
            main:'#ff2e58',
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
        MuiInputAdornment:{
            positionEnd:{
                "& $p":{
                    fontSize:'0.6rem',
                },
            },
        },
        MuiListItem:{
            gutters:{
                paddingTop:'2px',
                paddingBottom:'2px',
                "& $img":{
                    height:'20px',
                    width:'20px',
                    marginRight:'16px',
                    userSelect:'none',
                }
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
