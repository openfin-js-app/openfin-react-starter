import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as cx from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import {withStyles} from '@material-ui/core/styles';

import { Window } from '@albertli/redux-openfin';

import { RouteItem, RouteCompItem, RouteRedirectItem } from '../../routes';
import childWindowRoutes from '../../routes/ChildWindow';

import {Header} from '../../components';

import { dashboardLayoutStyle as style } from '../../assets/jss/openfin-starter';
import dashboardRoutes from "../../routes/Dashboard";

declare const window:any;

const switchRoutes = (
    <Switch>
        {childWindowRoutes.map((prop:any,key)=>{
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>

        })}
    </Switch>
);

class ChildWindowLayout extends React.Component<any,any>{

    state={
        windowState:'normal',
    };

    componentDidMount(){
        this.getCurrentWindow().setAsForeground();
    }

    getCurrentWindow= ()=>{
        return window.fin.desktop.Window.getCurrent();
    };

    updateWindowState = ()=>{
        this.getCurrentWindow().getState(
            (state)=>{
                this.setState({windowState:state});
            }
        );
    };

    handleMinimize = ()=>{
        this.getCurrentWindow().minimize();
        this.updateWindowState();
    };

    handleMaximize = ()=>{
        const { windowState } = this.state;
        if (windowState === 'maximized'){
            this.getCurrentWindow().restore();
        }else if (windowState === 'normal'){
            this.getCurrentWindow().maximize();
        }
        this.updateWindowState();
    };

    handleClose = () =>{
        this.getCurrentWindow().close();
    };

    render(){
        const {
            classes,
            actions:{

            },
            ...rest
        } = this.props;

        const {windowState} = this.state;

        this.updateWindowState();

        return(
            <React.Fragment>
                <Header
                    routes={childWindowRoutes}
                    windowsState={windowState}
                    color={'info'}
                    onMinimize={this.handleMinimize}
                    onMaximize={this.handleMaximize}
                    onClose = {this.handleClose}
                    {...rest}
                />
                <div className={cx(classes.wrapper, classes.wrapperPrimary)}>
                    <div className={cx(
                        classes.mainPanel,classes.mainPanelShift
                    )}
                    >
                        <div className={classes.container}>
                            <div className={classes.content}>
                                {switchRoutes}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default connect(
    (state:any) => ({

    }),
    dispatch => ({
        actions:{

        }
    })
)(withStyles(style)(ChildWindowLayout));