import * as React from 'react';
import { MouseEventHandler } from "react";
import cx from 'classnames';

import { WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import AllOutIcon from '@material-ui/icons/AllOut';
import Remove from '@material-ui/icons/Remove';
import CropDin from '@material-ui/icons/CropDin';
import Clear from '@material-ui/icons/Clear';
import AspectRatio from '@material-ui/icons/AspectRatio';
import OpenInNew from '@material-ui/icons/OpenInNew';

import { headerLinksCompStyle as style } from '../../assets/jss/openfin-starter'

interface IProps extends WithStyles<typeof style> {
    windowsState:string,
    docked?:boolean,
    onUndock?:MouseEventHandler<any>,
    onSwitchToLaunchBar?:MouseEventHandler<any>,
    onMinimize:MouseEventHandler<any>,
    onMaximize:MouseEventHandler<any>,
    onClose:MouseEventHandler<any>,
}

class HeaderLinksComp extends React.Component<IProps,{}>{

    render(){

        const {
            classes, windowsState, docked,
            onSwitchToLaunchBar,
            onUndock,
            onMinimize, onMaximize, onClose
        } = this.props;

        return (<React.Fragment>
            {
                onSwitchToLaunchBar?
                    <Button className={cx(classes.menuBtn,classes.info)}
                            variant="fab"
                            mini
                            color="inherit"
                            aria-label="Switch to launch bar"
                            onClick={onSwitchToLaunchBar}
                    >
                        <OpenInNew/>
                    </Button>:null
            }
            {
                docked && onUndock ?
                    <Button className={cx(classes.menuBtn,classes.rose)}
                            variant="fab"
                            mini
                            color="inherit"
                            aria-label="Undock from the group"
                            onClick={onUndock}
                    >
                        <AllOutIcon/>
                    </Button>:null
            }
            <Button className={cx(classes.menuBtn,classes.success)}
                    variant="fab"
                    mini
                    color="inherit"
                    aria-label="Minimize"
                    onClick={onMinimize}
            >
                <Remove/>
            </Button>
            <Button className={cx(classes.menuBtn,classes.warning)}
                    variant="fab"
                    mini
                    color="inherit"
                    aria-label="Maximize"
                    onClick={onMaximize}
            >
                {windowsState==='normal'?<CropDin/>:<AspectRatio/>}
            </Button>
            <Button className={cx(classes.menuBtn,classes.danger)}
                    variant="fab"
                    mini
                    color="inherit"
                    aria-label="Close"
                    onClick={onClose}
            >
                <Clear/>
            </Button>
        </React.Fragment>);
    }

}

export default withStyles(style)(HeaderLinksComp);