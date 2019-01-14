import * as React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import { WithStyles, withStyles } from '@material-ui/core/styles';

import { Window } from '@albertli90/redux-openfin';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import AllOutIcon from '@material-ui/icons/AllOut';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import { launchBarLayoutStyle as style } from '../../assets/jss/openfin-starter';

import appLogo from '../../assets/svg/app.svg';

import {
    // actions
    applicationLaunchBarToggle, applicationLaunchBarToggleCollapse, applicationLaunchNewWindow, applicationLaunchBarClose,
    // types
    IRootState,
} from '../../reduxs';

import { launchBarItems } from './LaunchBarData';

interface IProps extends WithStyles<typeof style>{
    docked:boolean,
    launchBarCollapse:boolean,
    actions:{
        handleUndock: ()=> void,
        handleLaunchBarItemBtnClick: (appJson:any)=>()=>void,
        handleSwitchToMainWindow: ()=>void,
        handleToggleCollapse: ()=>void,
        handleMinimize: ()=>void,
        handleClose: ()=>void,
    }
}

class LaunchBarComp extends React.Component<IProps,{}>{
    render(){

        const {
            classes,
            docked, launchBarCollapse,
            actions:{
                handleUndock,
                handleLaunchBarItemBtnClick,
                handleToggleCollapse,
                handleSwitchToMainWindow,
                handleMinimize,
                handleClose,
            }
        } = this.props;

        const collapse = launchBarCollapse;

        // const _launchBarItems = launchBarItems;

        const buttonContainerWidth = launchBarItems.length<10?launchBarItems.length*64:576;

        return (
            <span>
                <AppBar position={"static"}>
                    <Toolbar className={classes.toolBar}>
                        <img src={appLogo} className={classes.appLogoImg}/>
                        {
                            docked && handleUndock ?
                                <Fab
                                    className={cx(
                                        classes.undockCtrlBtn,
                                        classes.controlBtn,
                                        classes.controlBtnRose
                                    )}
                                    color='inherit' aria-label={'undock'}
                                    onClick={handleUndock}
                                >
                                    <AllOutIcon/>
                                </Fab>
                                :null
                        }
                        <Scrollbars
                            className={cx(
                                classes.buttonContainer,
                                {
                                    [classes.buttonContainerCollapse]:collapse,
                                }
                            )}
                            style={{
                                width:`${buttonContainerWidth}px`,
                            }}
                        >
                            {launchBarItems.map((item,index)=>{
                                if (item.icon){
                                    return <IconButton key={index}
                                       className={classes.baseButton}
                                       disabled={item.disabled}
                                       onClick={handleLaunchBarItemBtnClick(item.appJson)}
                                    >
                                            {React.createElement(item.icon)}
                                    </IconButton>
                                }else{
                                    return <IconButton key={index}
                                       className={classes.svgButton}
                                       disabled={item.disabled}
                                       onClick={handleLaunchBarItemBtnClick(item.appJson)}
                                    >
                                        <img src={item.svg}/>
                                    </IconButton>
                                }
                            })}
                        </Scrollbars>
                        <div className={classes.controlPanelContainer}>
                            <Fab
                                className={cx(classes.controlBtn, classes.controlBtnInfo)}
                                color='secondary' aria-label={'collapse'}
                                onClick={handleToggleCollapse}
                            >
                                {collapse?
                                    <ArrowForwardIcon/>:
                                    <ArrowBackIcon/>
                                }
                            </Fab>
                            <Fab
                                className={cx(classes.controlBtn, classes.controlBtnSuccess)}
                                color='secondary' aria-label={'minimize'}
                                onClick={handleMinimize}
                            >
                                <RemoveIcon/>
                            </Fab>
                            <Fab
                                className={cx(classes.controlBtn, classes.controlBtnWarning)}
                                color='secondary' aria-label={'expand'}
                                onClick={handleSwitchToMainWindow}
                            >
                                <ZoomOutMapIcon/>
                            </Fab>
                            <Fab
                                className={cx(classes.controlBtn, classes.controlBtnDanger)}
                                color='secondary' aria-label={'close'}
                                onClick={handleClose}
                            >
                                <ClearIcon/>
                            </Fab>
                        </div>
                    </Toolbar>
                </AppBar>
            </span>
        );
    }
}

export default connect(
    (state:IRootState)=>({
        docked:state.application.docked,
        launchBarCollapse:state.application.launchBarCollapse,
    }),
    dispatch => ({
        actions:{
            handleUndock : () => {dispatch(Window.actions.leaveGroup({}))},
            handleLaunchBarItemBtnClick:(appJson)=>()=>{dispatch(applicationLaunchNewWindow(appJson))},
            handleSwitchToMainWindow:()=>{dispatch(applicationLaunchBarToggle())},
            handleToggleCollapse:()=>{dispatch(applicationLaunchBarToggleCollapse())},
            handleMinimize:()=>{dispatch(Window.actions.minimize({}))},
            handleClose:()=>{dispatch(applicationLaunchBarClose())},
        }
    })
)(withStyles(style)(LaunchBarComp));