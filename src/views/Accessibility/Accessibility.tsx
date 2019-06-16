import * as React from 'react';
import { useContext } from "react";
import * as shortid from 'shortid';
import { ApplicationContext } from 'react-openfin';

import { buttonStyle } from 'react-openfin-mat-impl/assets/jss';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import { createStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles(style);

const AccessibilityView:React.FunctionComponent<{}> = (
    {}
)=>{

    const classes = useStyles({});

    const {
        actions:{
            launchNewWin,
            launchNewNotification,
            onNewSnackBar,
        }
    } = useContext(ApplicationContext);

    const handleLaunchNewSelf = ()=>{
        launchNewWin({
            name:`${process.env.REACT_APP_FIN_UUID}-child-accessibility-${shortid.generate()}`,
            url:'/childWindow/report',
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true
        })
    }

    const handleLaunchGoogle = ()=>{
        launchNewWin({
            name:`${process.env.REACT_APP_FIN_UUID}-child-google-${shortid.generate()}`,
            url:'https://www.google.com/',
            frame:true,
            resizable:true,
            state:'normal',
            autoShow:true
        })
    }

    const handleOpenSnackBar = (name:'primary' | 'success' | 'warning' | 'error' | 'info' | 'rose')=>()=>{
        onNewSnackBar({
            message:`Message to ${name} snackbar`,
            variant:name,
        });
    }

    const handleLaunchNotification = ()=>{
        launchNewNotification({
            ignoreMouseOver:false,
            url:'/notification/sample',
            message:'my first notification msg',
            timeout: 10000,
            opacity: 1,
        })

    }

    return(
        <React.Fragment>
            <Typography
                variant={"h5"} gutterBottom
            >
                Accessibility view works
            </Typography>

            <Button size={"large"} variant={"contained"} color={"primary"} onClick={handleLaunchNewSelf}
            >Report</Button>
            <Button size={"large"} variant={"contained"} color={"secondary"} onClick={handleLaunchGoogle}
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

            <hr/>

            <Button variant="outlined" color="primary"
                    onClick = {handleLaunchNotification}
            >
                Notification
            </Button>

        </React.Fragment>
    )
}

export default AccessibilityView;