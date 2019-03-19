import * as React from 'react';
import cx from 'classnames';

import { WithStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import Menu from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import { withTranslation, WithTranslation } from 'react-i18next';

import HeaderLinks from './HeaderLinks';
import HeaderThemeSwitcher from './HeaderThemeSwitcher';

import {MouseEventHandler} from "react";

import { headerCompStyle as style } from '../../../assets/jss/openfin-starter';
import {RouteItem} from '../../../routes';

import appLogo from '../../../assets/svg/app.svg';

interface IProps extends WithStyles<any>, WithTranslation {
    routes:RouteItem[],
    color:string,
    open?:boolean,
    windowsState:string,
    docked?:boolean,
    handleDrawerToggle?:MouseEventHandler<any>,
    onSwitchToLaunchBar?:MouseEventHandler<any>,
    onUndock?:MouseEventHandler<any>,
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
            classes, t, color, windowsState,
            handleDrawerToggle, docked,
            onSwitchToLaunchBar, onUndock, onMinimize, onMaximize, onClose,
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
                <div className={classes.preFlex}>
                    <HeaderThemeSwitcher/>
                    {handleDrawerToggle?
                        <Fab
                            className={classes.menuBtn}
                            color={"inherit"}
                            aria-label={"open drawer"}
                            onClick={handleDrawerToggle}
                        >
                                {this.props.open?<ChevronLeft/>:<Menu/>}
                        </Fab>
                    :null}
                    <img src={appLogo} className={classes.companyLogImg}/>
                    <Button href={"#"} className={classes.title}>
                        {t('appName')+"|"+ t(makeBrand(this.props))}
                    </Button>
                </div>
                <div className={classes.flex}/>
                <div className={classes.postFlex}>
                    <HeaderLinks
                        windowsState={windowsState}
                        docked = {docked}
                        onSwitchToLaunchBar={onSwitchToLaunchBar}
                        onUndock={onUndock}
                        onMinimize={onMinimize}
                        onMaximize={onMaximize}
                        onClose={onClose}
                    />
                </div>
            </Toolbar>
        </AppBar>);
    }

}

export default withStyles(style)(
    withTranslation('menu')(HeaderComp)
);