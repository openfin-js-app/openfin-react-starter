import * as React from 'react';
import { useContext } from 'react';
import {Redirect, Route, Switch} from "react-router";
import { ApplicationContext, ConfigContext, MuiTheme } from 'react-openfin';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import cx from "classnames";

import { notificationStyle as style } from '../../assets/jss/openfin-starter';
import notificationRoutes from "../../routes/notification";
const switchRoutes = (
    <Switch>
        {notificationRoutes.map((prop:any,key)=>{
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>

        })}
    </Switch>
);

interface IProps {
    // for testing
    location?:any,
}

const useStyles = makeStyles(style);

const NotificationLayout:React.FunctionComponent<IProps> = (
    {}
)=>{

    const classes = useStyles();

    const {
        actions:{
            onNotificationClose,
        }
    } = useContext(ApplicationContext);

    const {
        config:{
            application:{
                theme
            }
        }
    } = useContext(ConfigContext);

    return (
        <div className={
            cx(
                classes.container,
                {
                    [classes.lightBoxShaddow]: theme === MuiTheme.LIGHT
                }
            )
        }>
            <IconButton className={classes.closeBtn}
                        onClick={onNotificationClose}
            >
                <CloseIcon fontSize='small'/>
            </IconButton>
            {switchRoutes}
        </div>
    )
}

export default NotificationLayout;

