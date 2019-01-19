import * as React from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, Switch} from "react-router";
import { WithStyles, withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import { Notification } from '@albertli90/redux-openfin';

import cx from "classnames";

import { notificationStyle as style } from '../../assets/jss/openfin-starter';
import { IRootState } from '../../reduxs';
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
    actions:{
        handleSelfClose:()=>void,
    }
}


class NotificationLayout extends React.Component<IProps,{}>{
    render(){

        const {
            classes,
            actions:{
                handleSelfClose
            }
        } = this.props;

        return (
            <div className={classes.container}>
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

