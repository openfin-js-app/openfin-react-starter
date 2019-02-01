import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import GlobalContext from './GlobalContext';

import { primaryColor, infoColor, dangerColor} from './assets/jss/openfin-starter-constant';

import indexRoutes from './routes/index';

import hist from './utils/history';

import {MuiTheme, I18Language, IRootState, IConfigRuntimeState, configUpdateOneField} from './reduxs'

interface IProps{
    loading:boolean,
    config:IConfigRuntimeState,
    theme:MuiTheme,
    actions:{
        handleUpdateThemeField:(value:MuiTheme)=>void,
        handleToggleThemeField:()=>void,
        handleUpdateLangField:(lang:I18Language)=>void,
    },
    [key:number]:any,
    [key:string]:any,
}

interface IState {
    [key:number]:any,
    [key:string]:any,
}


class App extends React.Component<IProps,IState>{

    createMuiTheme = ()=>{
        const { theme } = this.props;
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
    }

    render(){

        const {
            config,
            actions:{
                handleToggleThemeField, handleUpdateLangField
            }
        } = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                    <Router history={hist}>
                        <MuiThemeProvider theme={this.createMuiTheme()}>
                            <GlobalContext
                                config={config}
                                onToggleThemeField={handleToggleThemeField}
                                onUpdateLangField={handleUpdateLangField}
                            >
                                <Switch>
                                    {
                                        indexRoutes.map((prop:any,key)=>{
                                            if (prop.redirect)
                                                return <Redirect from={prop.path} to={prop.to} key={key}/>;
                                            return <Route path={prop.path} component={prop.component} key={key}/>;

                                        })
                                    }
                                </Switch>
                            </GlobalContext>
                        </MuiThemeProvider>
                    </Router>
            </React.Fragment>
        );
    }
}

export default connect(
    (state:IRootState)=>({
        loading:state.application.loading,
        config:state.config,
        theme:state.config.application.theme
    }),
    dispatch => ({
        actions:{
            handleUpdateThemeField: (value:MuiTheme)=>{
                dispatch(configUpdateOneField({
                    name:'application.theme',
                    value,
                }))
            },
            handleUpdateLangField: (value:I18Language)=>{
                dispatch(configUpdateOneField({
                    name:'application.language',
                    value,
                }))
            }
        }
    }),
    (stateProps,actionProps)=>({
        ...stateProps,
        actions:{
            ...actionProps.actions,
            handleToggleThemeField: ()=>{
                actionProps.actions.handleUpdateThemeField(
                    stateProps.theme === MuiTheme.DARK ?MuiTheme.LIGHT:MuiTheme.DARK
                )
            }
        }

    })
)(App);
