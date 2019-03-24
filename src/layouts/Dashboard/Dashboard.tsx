import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import cx from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';

import { makeStyles } from '@material-ui/styles';

import {Window} from 'redux-openfin';

import {
    applicationCloseSnackbar,
    applicationDrawerToggle,
    applicationLaunchBarToggle,
    applicationProcessSnackbarQueue,
    applicationSetSnackbarStatus,
    applicationToogleWindowState,
    IRootState,
    ISnackBarMsg,
    MuiTheme,
} from '../../reduxs';

import dashboardRoutes from '../../routes/Dashboard';
import {Header, OfflineOverlay, Sidebar, SnackbarContent} from '../../components';

import {dashboardLayoutStyle as style} from '../../assets/jss/openfin-starter';

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop:any,key)=>{
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>

        })}
    </Switch>
);

interface IProps {
    offline:boolean,
    drawerOpen:boolean,
    snackBarOpen:boolean,
    snackBarMsgInfo:Partial<ISnackBarMsg>,
    windowsState:string,
    theme:MuiTheme,
    actions:{
        handleDrawerToggle: ()=> void,
        handleSnackbarClose: (event:any,reason:string)=> void,
        handleSnackbarCloseBtnClick: ()=> void,
        handleSnackbarExited: ()=> void,
        handleSwitchToLaunchBar: ()=> void,
        handleMinimize: ()=> void,
        handleMaximize: ()=> void,
        handleClose: ()=> void,
        handleDirectClose: ()=> void,
    }
    // for testing
    location?:any,
}

const useStyles = makeStyles(style);

const DashbardLayout:React.FunctionComponent<IProps> = (
    {
        offline,drawerOpen, theme,
        snackBarOpen, snackBarMsgInfo, windowsState,
        actions:{
            handleDrawerToggle,
            handleSnackbarClose, handleSnackbarCloseBtnClick, handleSnackbarExited,
            handleSwitchToLaunchBar, handleMinimize, handleMaximize, handleClose, handleDirectClose,
        },
        ...rest
    }
)=>{

    const classes = useStyles();

    return(<React.Fragment>
        <Header
            routes={dashboardRoutes}
            windowsState={windowsState}
            handleDrawerToggle={handleDrawerToggle}
            open={drawerOpen}
            color={'primary'}
            docked={false}
            onSwitchToLaunchBar={handleSwitchToLaunchBar}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose = {handleClose}
            {...rest}
        />
        <div className={cx(classes.wrapper, classes.wrapperPrimary)}>
            <Sidebar
                routes={dashboardRoutes}
                open={drawerOpen}
                color={"primary"}
                image={'/img/sidebar-1.jpg'}
                {...rest}
            />
            <div className={cx(
                classes.mainPanel,
                {
                    [classes.mainPanelShift]:!drawerOpen
                }
            )}
            >
                <div className={classes.container}>
                    <div className={
                        cx(
                            classes.content,
                            {
                                [classes.lightBoxShaddow]: theme === MuiTheme.LIGHT
                            }
                        )
                    }>
                        {switchRoutes}
                    </div>
                </div>
            </div>
        </div>
        {/*snackbar*/}
        <Snackbar
            key={snackBarMsgInfo.key}
            anchorOrigin={{
                vertical:'bottom',
                horizontal:'center'
            }}
            open={snackBarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            onExited={handleSnackbarExited}
        >
            <SnackbarContent
                onClose={handleSnackbarCloseBtnClick}
                variant={snackBarMsgInfo.variant}
                message={snackBarMsgInfo.message}
            />
        </Snackbar>
        {
            offline?
                <OfflineOverlay
                    onClose={handleDirectClose}
                />
                :null
        }
    </React.Fragment>);
}

export default connect(
    (state:IRootState)=>({
        offline:state.application.offline,
        drawerOpen:state.application.drawerOpen,
        snackBarOpen:state.application.snackBarOpen,
        snackBarMsgInfo:state.application.snackBarMsgInfo,
        windowsState:state.application.windowsState,
        theme:state.config.application.theme,
    }),
    dispatch => ({
        actions:{
            handleDrawerToggle: ()=> {dispatch(applicationDrawerToggle());},
            handleSnackbarClose: (event,reason) => {dispatch(applicationCloseSnackbar({event,reason}))},
            handleSnackbarCloseBtnClick: () => {dispatch(applicationSetSnackbarStatus({open:false}))},
            handleSnackbarExited: () => {dispatch(applicationProcessSnackbarQueue())},
            // openfin
            handleSwitchToLaunchBar:()=>{dispatch(applicationLaunchBarToggle())},
            handleMinimize: ()=>{dispatch(Window.actions.minimize({}))},
            handleMaximize: ()=>{dispatch(applicationToogleWindowState())},
            handleClose:()=>{dispatch(Window.actions.close({force:false}))},
            handleDirectClose:()=>{dispatch(Window.actions.close({force:true}))},
        }
    })
)(DashbardLayout);