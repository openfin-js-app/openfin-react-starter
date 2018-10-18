import * as React from 'react';
import cx from 'classnames';

import { WithStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import HeaderLinks from './HeaderLinks';

import {MouseEventHandler} from "react";

import { headerCompStyle as style } from '../../assets/jss/openfin-starter';
import {RouteItem} from '../../routes';

const appLogo = require('../../assets/svg/app.svg') as string;

interface IProps extends WithStyles<any> {
    routes:RouteItem[],
    color:string,
    open?:boolean,
    windowState:string,
    handleDrawerToggle:MouseEventHandler<any>,
    onSwitchToLaunchBar:MouseEventHandler<any>,
    onMinimize:MouseEventHandler<any>,
    onMaximize:MouseEventHandler<any>,
    onClose:MouseEventHandler<any>,
    // todo: maybe should use,  import {RouteComponentProps} from "react-router"; but feel like it did not work the moment i tried......
    [key:string]:any,
    [key:number]:any,
}

class HeaderComp extends React.Component<IProps,{}>{

    render(){

        const {
            classes, color, windowState,
            handleDrawerToggle,
            onSwitchToLaunchBar, onMinimize, onMaximize, onClose,
        } = this.props;

        function makeBrand(props:any) {
            let name = null;
            props.routes.forEach((prop:RouteItem):any => {
                if (prop.path === props.location.pathname){
                    name = prop.navbarName;
                }
            });
            return name;
        }

        return(<AppBar className={cx(classes.appBar, classes[color])} draggable = {false}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {handleDrawerToggle?
                        <Button
                            className={classes.menuBtn}
                            variant={"fab"}
                            mini
                            color={"inherit"}
                            aria-label={"open drawer"}
                            onClick={handleDrawerToggle}
                        >
                            {this.props.open?<ChevronLeft/>:<Menu/>}
                    </Button>:null}
                    <img src={appLogo} className={classes.companyLogImg}/>
                    <Button href={"#"} className={classes.title}>
                        {"App name| "+ makeBrand(this.props)}
                    </Button>
                </div>
                <HeaderLinks
                    windowState={windowState}
                    onSwitchToLaunchBar={onSwitchToLaunchBar}
                    onMinimize={onMinimize}
                    onMaximize={onMaximize}
                    onClose={onClose}
                />
            </Toolbar>
        </AppBar>);
    }

}

export default withStyles(style)(HeaderComp);