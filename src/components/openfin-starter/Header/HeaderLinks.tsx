import * as React from 'react';
import { MouseEventHandler } from "react";
import cx from 'classnames';

import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';

import AllOutIcon from '@material-ui/icons/AllOut';
import Remove from '@material-ui/icons/Remove';
import CropDin from '@material-ui/icons/CropDin';
import Clear from '@material-ui/icons/Clear';
import AspectRatio from '@material-ui/icons/AspectRatio';
import OpenInNew from '@material-ui/icons/OpenInNew';

import { headerLinksCompStyle as style } from '../../../assets/jss/openfin-starter'

interface IProps {
    windowsState:string,
    docked?:boolean,
    onUndock?:MouseEventHandler<any>,
    onSwitchToLaunchBar?:MouseEventHandler<any>,
    onMinimize:MouseEventHandler<any>,
    onMaximize:MouseEventHandler<any>,
    onClose:MouseEventHandler<any>,
}

const useStyles = makeStyles(style);

const HeaderLinksComp:React.FunctionComponent<IProps> = (
    {
        windowsState, docked,
        onSwitchToLaunchBar,
        onUndock,
        onMinimize, onMaximize, onClose
    }
)=>{

    const classes = useStyles();

    return (<React.Fragment>
        {
            onSwitchToLaunchBar?
                <Fab className={cx(classes.menuBtn,classes.info)}
                     color="inherit"
                     aria-label="Switch to launch bar"
                     onClick={onSwitchToLaunchBar}
                >
                    <OpenInNew/>
                </Fab>:null
        }
        {
            docked && onUndock ?
                <Fab className={cx(classes.menuBtn,classes.rose)}
                     color="inherit"
                     aria-label="Undock from the group"
                     onClick={onUndock}
                >
                    <AllOutIcon/>
                </Fab>:null
        }
        <Fab className={cx(classes.menuBtn,classes.success)}
             color="inherit"
             aria-label="Minimize"
             onClick={onMinimize}
        >
            <Remove/>
        </Fab>
        <Fab className={cx(classes.menuBtn,classes.warning)}
             color="inherit"
             aria-label="Maximize"
             onClick={onMaximize}
        >
            {windowsState==='normal'?<CropDin/>:<AspectRatio/>}
        </Fab>
        <Fab className={cx(classes.menuBtn,classes.danger)}
             color="inherit"
             aria-label="Close"
             onClick={onClose}
        >
            <Clear/>
        </Fab>
    </React.Fragment>);

}

export default HeaderLinksComp;