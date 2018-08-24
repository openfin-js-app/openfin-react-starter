import * as React from 'react';
import * as cx from 'classnames';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import HeaderLinks from './HeaderLinks';

import { headerCompStyle as style } from '../../assets/jss/openfin-starter';

const appLogo = require('../../assets/svg/app.svg') as string;

class HeaderComp extends React.Component<any,any>{

    render(){

        const {
            classes, color, windowState,
            handleDrawerToggle,
            onSwitchToLaunchBar, onMinimize, onMaximize, onClose,
        } = this.props;

        function makeBrand(props:any) {
            let name = null;
            props.routes.forEach((prop:any, key:number):any => {
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