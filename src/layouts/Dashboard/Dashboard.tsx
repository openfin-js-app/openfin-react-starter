import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as cx from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';

import { Window } from '@albertli/redux-openfin';

import {
    applicationDrawerToggle, applicationToogleWindowState,
    applicationSetSnackbarStatus, applicationProcessSnackbarQueue,
    applicationCloseSnackbar, applicationLaunchBarToggle,
} from '../../redux';

import { RouteItem, RouteCompItem, RouteRedirectItem } from '../../routes';
import dashboardRoutes from '../../routes/Dashboard';
import { Sidebar, Header, SnackbarContent } from '../../components';

import { dashboardLayoutStyle as style } from '../../assets/jss/openfin-starter';

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop:any,key)=>{
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>

        })}
    </Switch>
);

class DashbardLayout extends React.Component<any,any>{
    render(){

        const {
            classes,
            drawerOpen,
            snackBarOpen, snackBarMsgInfo, windowsState,
            actions:{
                handleDrawerToggle,
                handleSnackbarClose, handleSnackbarCloseBtnClick, handleSnackbarExited,
                handleSwitchToLaunchBar, handleMinimize, handleMaximize, handleClose,
            },
            ...rest
        } = this.props;

        return(<React.Fragment>
            <Header
                routes={dashboardRoutes}
                windowsState={windowsState}
                handleDrawerToggle={handleDrawerToggle}
                open={drawerOpen}
                color={'primary'}
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
                    handleDrawerToggle={handleDrawerToggle}
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
                        <div className={classes.content}>
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
        </React.Fragment>);
    }
}

export default connect(
    (state:any)=>({
        drawerOpen:state.application.drawerOpen,
        snackBarOpen:state.application.snackBarOpen,
        snackBarMsgInfo:state.application.snackBarMsgInfo,
        windowsState:state.application.windowsState,
    }),
    dispatch => ({
        actions:{
            handleDrawerToggle: ()=>(dispatch(applicationDrawerToggle())),
            handleSnackbarClose: (event,reason) => (dispatch(applicationCloseSnackbar({event,reason}))),
            handleSnackbarCloseBtnClick: () => (dispatch(applicationSetSnackbarStatus({open:false}))),
            handleSnackbarExited: () => (dispatch(applicationProcessSnackbarQueue())),
            // openfin
            handleSwitchToLaunchBar:()=>(dispatch(applicationLaunchBarToggle({}))),
            handleMinimize: ()=>{dispatch(Window.actions.minimize({}))},
            handleMaximize: ()=>{dispatch(applicationToogleWindowState())},
            handleClose:()=>{dispatch(Window.actions.close({force:false}))},
        }
    })
)(withStyles(style)(DashbardLayout));