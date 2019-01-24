import * as React from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Switch} from "react-router";
import { WithStyles, withStyles } from '@material-ui/core/styles';

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

interface IProps extends WithStyles<typeof style>{
    theme:MuiTheme,
    actions:{
        handleSelfClose:()=>void,
    }
}


class NotificationLayout extends React.Component<IProps,{}>{
    render(){

        const {
            classes,
            theme,
            actions:{
                handleSelfClose
            }
        } = this.props;

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
    withStyles(style)(NotificationLayout)
);

