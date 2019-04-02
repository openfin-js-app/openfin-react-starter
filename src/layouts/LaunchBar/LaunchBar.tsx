import * as React from 'react';
import { useContext } from 'react';
import { ApplicationContext } from "react-openfin";

import cx from 'classnames';

import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles } from '@material-ui/styles';

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

import { launchBarItems } from '../../constants/launchBarItems';

const useStyles = makeStyles(style);

const LaunchBarComp:React.FunctionComponent<{}> = (
    {}
)=>{

    const classes = useStyles();

    const {
        state:{
            docked, launchBarCollapse,
        },
        actions:{
            onUndock, launchNewWin, onLaunchBarToggle, onLaunchBarToggleCollapse, onMinimize, onLaunchBarClose,
        }
    } = useContext(ApplicationContext);

    const collapse = launchBarCollapse;

    // const _launchBarItems = launchBarItems;

    const buttonContainerWidth = launchBarItems.length<10?launchBarItems.length*64:576;

    const handleLaunchBarItemBtnClick = (item) => ()=> {
        launchNewWin(item.appJson);
    };

    return (
        <span>
                <AppBar position={"static"}>
                    <Toolbar className={classes.toolBar}>
                        <img src={appLogo} className={classes.appLogoImg}/>
                        {
                            docked && onUndock ?
                                <Fab
                                    className={cx(
                                        classes.undockCtrlBtn,
                                        classes.controlBtn,
                                        classes.controlBtnRose
                                    )}
                                    color='inherit' aria-label={'undock'}
                                    onClick={onUndock}
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
                                                       onClick={handleLaunchBarItemBtnClick(item)}
                                    >
                                        {React.createElement(item.icon)}
                                    </IconButton>
                                }else{
                                    return <IconButton key={index}
                                                       className={classes.svgButton}
                                                       disabled={item.disabled}
                                                       onClick={handleLaunchBarItemBtnClick(item)}
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
                                onClick={onLaunchBarToggleCollapse}
                            >
                                {collapse?
                                    <ArrowForwardIcon/>:
                                    <ArrowBackIcon/>
                                }
                            </Fab>
                            <Fab
                                className={cx(classes.controlBtn, classes.controlBtnSuccess)}
                                color='secondary' aria-label={'minimize'}
                                onClick={onMinimize}
                            >
                                <RemoveIcon/>
                            </Fab>
                            <Fab
                                className={cx(classes.controlBtn, classes.controlBtnWarning)}
                                color='secondary' aria-label={'expand'}
                                onClick={onLaunchBarToggle}
                            >
                                <ZoomOutMapIcon/>
                            </Fab>
                            <Fab
                                className={cx(classes.controlBtn, classes.controlBtnDanger)}
                                color='secondary' aria-label={'close'}
                                onClick={onLaunchBarClose}
                            >
                                <ClearIcon/>
                            </Fab>
                        </div>
                    </Toolbar>
                </AppBar>
            </span>
    );
}

export default LaunchBarComp;