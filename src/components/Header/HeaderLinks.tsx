import * as React from 'react';
import * as cx from 'classnames';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Remove from '@material-ui/icons/Remove';
import CropDin from '@material-ui/icons/CropDin';
import Clear from '@material-ui/icons/Clear';
import AspectRatio from '@material-ui/icons/AspectRatio';
import OpenInNew from '@material-ui/icons/OpenInNew';

import { headerLinksCompStyle as style } from '../../assets/jss/openfin-starter'


class HeaderLinksComp extends React.Component<any,any>{

    render(){

        const {
            classes, windowState,
            onSwitchToLaunchBar,
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
                {windowState==='normal'?<CropDin/>:<AspectRatio/>}
            </Button>
            <Button className={cx(classes.menuBtn,classes.danger)}
                    variant="fab"
                    mini
                    color="inherit"
                    aria-label="Close"
                    onClick={onClose}
            >
                <Remove/>
            </Button>
        </React.Fragment>);
    }

}

export default withStyles(style)(HeaderLinksComp);