import * as React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import { WithStyles, withStyles, StyleRules } from '@material-ui/core/styles';

import { Window } from '@albertli90/redux-openfin';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import { launchBarLayoutStyle as style } from '../../assets/jss/openfin-starter';

import appLogo from '../../assets/svg/app.svg';

import {
    // actions
    applicationLaunchBarToggle, applicationLaunchBarToggleCollapse, applicationLaunchNewWindow,
    // types
    IRootState,
} from '../../redux';

import { launchBarItems } from './LaunchBarData';

interface IProps extends WithStyles<typeof style>{
    launchBarCollapse:boolean,
    actions:{
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
            classes, launchBarCollapse,
            actions:{
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
                            <Button
                                className={cx(classes.controlBtn, classes.controlBtnInfo)}
                                variant={'fab'} mini color={'secondary'} aria-label={'collapse'}
                                onClick={handleToggleCollapse}
                            >
                                {collapse?
                                    <ArrowForwardIcon/>:
                                    <ArrowBackIcon/>
                                }
                            </Button>
                            <Button
                                className={cx(classes.controlBtn, classes.controlBtnSuccess)}
                                variant={'fab'} mini color={'secondary'} aria-label={'minimize'}
                                onClick={handleMinimize}
                            >
                                <RemoveIcon/>
                            </Button>
                            <Button
                                className={cx(classes.controlBtn, classes.controlBtnWarning)}
                                variant={'fab'} mini color={'secondary'} aria-label={'expand'}
                                onClick={handleSwitchToMainWindow}
                            >
                                <ZoomOutMapIcon/>
                            </Button>
                            <Button
                                className={cx(classes.controlBtn, classes.controlBtnDanger)}
                                variant={'fab'} mini color={'secondary'} aria-label={'close'}
                                onClick={handleClose}
                            >
                                <ClearIcon/>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </span>
        );
    }
}

export default connect(
    (state:IRootState)=>({
        launchBarCollapse:state.application.launchBarCollapse,
    }),
    dispatch => ({
        actions:{
            handleLaunchBarItemBtnClick:(appJson)=>()=>{dispatch(applicationLaunchNewWindow(appJson))},
            handleSwitchToMainWindow:()=>{dispatch(applicationLaunchBarToggle())},
            handleToggleCollapse:()=>{dispatch(applicationLaunchBarToggleCollapse())},
            handleMinimize:()=>{dispatch(Window.actions.minimize({}))},
            handleClose:()=>{dispatch(Window.actions.close({force:false}))},
        }
    })
)(withStyles(style)(LaunchBarComp));