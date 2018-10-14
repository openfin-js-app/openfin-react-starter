import * as React from 'react';
import { MouseEventHandler, MouseEvent } from "react";
import * as shortid from 'shortid';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import { applicationNewSnackbar, applicationLaunchNewWindow } from '../../redux';

import { buttonStyle } from '../../assets/jss/openfin-starter';

const style = createStyles({
    primary: buttonStyle.primary,
    info: buttonStyle.info,
    success: buttonStyle.success,
    warning: buttonStyle.warning,
    danger: buttonStyle.danger,
    rose: buttonStyle.rose,
    white: buttonStyle.white,
    simple: buttonStyle.simple,
});

interface IProps extends WithStyles<typeof style>{
    actions:{
        onOpenNewSelf:MouseEventHandler<any>,
        onOpenGoogle:MouseEventHandler<any>,
        handleOpenPrimarySnackBar:MouseEventHandler<any>,
        handleOpenSecondarySnackBar:MouseEventHandler<any>,
        handleOpenSnackBar:(name:string)=>MouseEventHandler<any>,
    },
}

class AccessibilityView extends React.Component<IProps, {}>{
    render():any{

        const {
            classes,
            actions:{
                onOpenNewSelf,onOpenGoogle,
                handleOpenSnackBar,
            }
        } = this.props;

        return(
            <React.Fragment>
                <Typography
                    variant={"h5"} gutterBottom
                >
                    Accessibility view works
                </Typography>

                <Button size={"large"} variant={"contained"} color={"primary"} onClick={onOpenNewSelf}
                >Report</Button>
                <Button size={"large"} variant={"contained"} color={"secondary"} onClick={onOpenGoogle}
                >Google</Button>

                <hr/>

                <Button size={"small"} variant={"contained"} className={classes.primary}
                        onClick={handleOpenSnackBar('primary')}
                >Primary</Button>
                <Button size={"small"} variant={"contained"} className={classes.info}
                        onClick={handleOpenSnackBar('info')}
                >Info</Button>
                <Button size={"small"} variant={"contained"} className={classes.success}
                        onClick={handleOpenSnackBar('success')}
                >Success</Button>
                <Button size={"small"} variant={"contained"} className={classes.warning}
                        onClick={handleOpenSnackBar('warning')}
                >Warning</Button>
                <Button size={"small"} variant={"contained"} className={classes.danger}
                        onClick={handleOpenSnackBar('error')}
                >Danger</Button>
                <Button size={"small"} variant={"contained"} className={classes.rose}
                        onClick={handleOpenSnackBar('rose')}
                >Rose</Button>

            </React.Fragment>
        )
    }
}

export default connect(
    (state:any)=>({

    }),
    dispatch => ({
        actions:{
            onOpenNewSelf:()=>{
                dispatch(applicationLaunchNewWindow({
                    name:`openfin-react-starter-child-accessibility-${shortid.generate()}`,
                    url:'/childWindow/report',
                    frame:false,
                    resizable:true,
                    state:'normal',
                    autoShow:true,
                    callback:(window:any)=>{
                        console.log('onOpenNewSelf::callback', window);
                    }
                }));
            },
            onOpenGoogle:()=>{
                dispatch(applicationLaunchNewWindow({
                    name:`openfin-react-starter-child-google-${shortid.generate()}`,
                    url:'https://www.google.com/',
                    frame:true,
                    resizable:true,
                    state:'normal',
                    autoShow:true,
                    callback:(window:any)=>{
                        console.log('onOpenGoogle::callback', window);
                    }
                }));
            },
            handleOpenSnackBar:(name)=>(event:MouseEvent<any>)=>{
                dispatch(applicationNewSnackbar({
                    message:`Message to ${name} snackbar`,
                    variant:name,
                }))
            },
        }
    })
)(withStyles(style)(AccessibilityView))