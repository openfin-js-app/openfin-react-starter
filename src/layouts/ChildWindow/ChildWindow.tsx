import * as React from 'react';
import { useContext, useEffect } from 'react';
import { ApplicationContext, ConfigContext, MuiTheme } from 'react-openfin';
import { Switch, Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/styles';
import childWindowRoutes from '../../routes/ChildWindow';

import { Header,SnackbarContent } from '../../components';

import { dashboardLayoutStyle as style } from '../../assets/jss/openfin-starter';

const switchRoutes = (
    <Switch>
        {childWindowRoutes.map((prop:any,key)=>{
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

const ChildWindowLayout:React.FunctionComponent<IProps> = (
    {
        ...rest
    }
) => {

    const classes = useStyles();

    const {
        state:{
            docked,
            snackBarOpen, snackBarMsgInfo, windowsState,
        },
        actions:{
            onSetAsForeground,
            onSnackBarClose, onSnackBarCloseBtnClick, onSnackBarExited,
            onUndock, onMinimize, onToggleWinState, onWinClose
        }
    } = useContext(ApplicationContext);

    const {
        config:{
            application:{
                theme
            }

        }
    } = useContext(ConfigContext);

    useEffect(()=>{
        onSetAsForeground();
        // return ()=>{
        //
        // }
    });

    return(
        <React.Fragment>
            <Header
                routes={childWindowRoutes}
                windowsState={windowsState}
                color={'info'}
                docked={docked}
                onUndock = {onUndock}
                onMinimize={onMinimize}
                onMaximize={onToggleWinState}
                onClose = {onWinClose}
                {...rest}
            />
            <div className={cx(classes.wrapper, classes.wrapperInfo)}>
                <div className={cx(
                    classes.mainPanel,classes.mainPanelShift
                )}
                >
                    <div className={classes.container}>
                        <div className={
                            cx(
                                classes.content,
                                {
                                    [classes.lightBoxShaddow]: theme === MuiTheme.LIGHT
                                }
                            )
                        }>
                            {switchRoutes}
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                key={snackBarMsgInfo.key}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'center'
                }}
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={onSnackBarClose}
                onExited={onSnackBarExited}
            >
                <SnackbarContent
                    onClose={onSnackBarCloseBtnClick}
                    variant={snackBarMsgInfo.variant}
                    message={snackBarMsgInfo.message}
                />
            </Snackbar>
        </React.Fragment>
    );
}

export default ChildWindowLayout;