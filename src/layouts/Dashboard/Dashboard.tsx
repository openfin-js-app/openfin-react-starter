import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as cx from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';

import { Window } from '@albertli/redux-openfin';

import {
    applicationDrawerToggle, applicationToogleWindowState,
    applicationSetSnackbarStatus, applicationProcessSnackbarQueue,
    applicationCloseSnackbar, applicationLaunchBarToggle,
} from '../../redux';

import { RouteItem, RouteCompItem, RouteRedirectItem } from '../../routes';
import dashboardRoutes from '../../routes/Dashboard';
import { Sidebar, Header, SnackbarContent } from '../../components';

import { dashboardLayoutStyle as style } from '../../assets/jss/openfin-starter';

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop:any,key)=>{
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>

        })}
    </Switch>
);

class DashbardLayout extends React.Component<any,any>{
    render(){

        return(<React.Fragment>
            dashboard works
        </React.Fragment>);
    }
}

export default withStyles(style)(DashbardLayout);