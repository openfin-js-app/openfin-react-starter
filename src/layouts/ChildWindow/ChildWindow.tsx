import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';

import { WithStyles ,withStyles} from '@material-ui/core/styles';

import {
    // acitons
    applicationToogleWindowState,
    applicationSetSnackbarStatus, applicationProcessSnackbarQueue,
    applicationCloseSnackbar,
    // types
    IRootState,ISnackBarMsg,
} from '../../reduxs';


import childWindowRoutes from '../../routes/ChildWindow';

import { Header,SnackbarContent } from '../../components';

import { dashboardLayoutStyle as style } from '../../assets/jss/openfin-starter';
import {Window} from "redux-openfin";

declare const window:any;

const switchRoutes = (
    <Switch>
        {childWindowRoutes.map((prop:any,key)=>{
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>

        })}
    </Switch>
);

interface IProps extends WithStyles<typeof style>{
    docked:boolean,
    snackBarOpen:boolean,
    snackBarMsgInfo:Partial<ISnackBarMsg>,
    windowsState:string,
    actions:{
        handleSetAsForeground: ()=> void,
        handleSnackbarClose: (event:any,reason:string)=> void,
        handleSnackbarCloseBtnClick: ()=> void,
        handleSnackbarExited: ()=> void,
        handleUndock: ()=> void,
        handleMinimize: ()=> void,
        handleMaximize: ()=> void,
        handleClose: ()=> void,
    }
}

class ChildWindowLayout extends React.Component<IProps,{}>{

    componentDidMount(){
        this.props.actions.handleSetAsForeground();
    }

    render(){
        const {
            classes,
            docked,snackBarOpen, snackBarMsgInfo, windowsState,
            actions:{
                handleSetAsForeground,
                handleSnackbarClose, handleSnackbarCloseBtnClick, handleSnackbarExited,
                handleUndock, handleMinimize, handleMaximize, handleClose,
            },
            ...rest
        } = this.props;

        return(
            <React.Fragment>
                <Header
                    routes={childWindowRoutes}
                    windowsState={windowsState}
                    color={'info'}
                    docked={docked}
                    onUndock = {handleUndock}
                    onMinimize={handleMinimize}
                    onMaximize={handleMaximize}
                    onClose = {handleClose}
                    {...rest}
                />
                <div className={cx(classes.wrapper, classes.wrapperInfo)}>
                    <div className={cx(
                        classes.mainPanel,classes.mainPanelShift
                    )}
                    >
                        <div className={classes.container}>
                            <div className={classes.content}>
                                {switchRoutes}
                            </div>
                        </div>
                    </div>
                </div>
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
            </React.Fragment>
        );
    }

}

export default connect(
    (state:IRootState) => ({
        docked:state.application.docked,
        snackBarOpen:state.application.snackBarOpen,
        snackBarMsgInfo:state.application.snackBarMsgInfo,
        windowsState:state.application.windowsState,
    }),
    dispatch => ({
        actions:{
            handleSetAsForeground: () => {dispatch(Window.actions.setAsForeground({}))},
            handleSnackbarClose: (event,reason) => {dispatch(applicationCloseSnackbar({event,reason}))},
            handleSnackbarCloseBtnClick: () => {dispatch(applicationSetSnackbarStatus({open:false}))},
            handleSnackbarExited: () => {dispatch(applicationProcessSnackbarQueue())},
            // openfin
            handleUndock : () => {dispatch(Window.actions.leaveGroup({}))},
            handleMinimize: ()=>{dispatch(Window.actions.minimize({}))},
            handleMaximize: ()=>{dispatch(applicationToogleWindowState())},
            handleClose:()=>{dispatch(Window.actions.close({force:false}))},
        }
    })
)(withStyles(style)(ChildWindowLayout));