import * as React from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Switch} from "react-router";
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import { Notification } from 'redux-openfin';

import cx from "classnames";

import { notificationStyle as style } from '../../assets/jss/openfin-starter';
import {IRootState, MuiTheme} from '../../reduxs';
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
    theme:MuiTheme,
    actions:{
        handleSelfClose:()=>void,
    }
    // for testing
    location?:any,
}

const useStyles = makeStyles(style);

const NotificationLayout:React.FunctionComponent<IProps> = (
    {
        theme,
        actions:{
            handleSelfClose
        }
    }
)=>{

    const classes = useStyles();

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
                        onClick={handleSelfClose}
            >
                <CloseIcon fontSize='small'/>
            </IconButton>
            {switchRoutes}
        </div>
    )
}

export default connect(
    (state:IRootState)=>({
        theme:state.config.application.theme,
    }),
    dispatch => ({
        actions:{
            handleSelfClose:()=>{
                dispatch(Notification.actions.close({}));
            }
        }
    })

    )(
    NotificationLayout
);

