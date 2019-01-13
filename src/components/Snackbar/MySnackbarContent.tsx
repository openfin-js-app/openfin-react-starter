import * as React from 'react';
import { MouseEventHandler } from "react";
import cx from 'classnames';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import {SnackbarContentProps} from "@material-ui/core/SnackbarContent/SnackbarContent";
import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import FaceIcon from '@material-ui/icons/Face'

import { WithStyles, withStyles} from '@material-ui/core/styles';
import { snackbarContentCompStyle as style } from '../../assets/jss/openfin-starter';

const variantIcon ={
    primary: DesktopMacIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
    rose: FaceIcon,
};

interface IMySnackbarContentProps{
    classes?:any,
    className?:string,
    message:string,
    onClose:MouseEventHandler<any>,
    variant:string,
}

type Props = IMySnackbarContentProps & WithStyles<typeof style> & SnackbarContentProps

class MySnackbarContentComp extends React.Component<Props,{}>{
    render(){

        const {
            classes, className, message, onClose, variant, ...other
        } = this.props;

        const Icon = variantIcon[variant];

        return(
            <SnackbarContent
                className={cx( classes.outmostContent, classes[variant],className)}
                aria-describedby={"client-snackbar"}
                message={
                    <span id={"client-snackbar"} className={classes.message}>
                        <Icon className={cx( classes.icon, classes.iconVariant )} />
                        {message}
                    </span>
                }
                action={
                    <IconButton
                        key={"close"}
                        aria-label={"Close"}
                        color={"inherit"}
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon}/>
                    </IconButton>
                }
                {...other}
            />
        );
    }
}

export default withStyles(style)(MySnackbarContentComp);