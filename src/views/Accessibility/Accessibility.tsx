import * as React from 'react';
import * as shortid from 'shortid';
import { connect, DispatchProp } from 'react-redux';

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

interface Props extends WithStyles<typeof style>, DispatchProp<any>{
    actions:{
        onOpenNewSelf:any,
        onOpenGoogle:any,
        handleOpenPrimarySnackBar:any,
        handleOpenSecondarySnackBar:any,
    },
}

@connect(
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
            handleOpenPrimarySnackBar:()=>{
                dispatch(applicationNewSnackbar({
                    message:'Message to primary snackbar',
                    variant:'primary',
                }))
            },
            handleOpenSecondarySnackBar:()=>{
                dispatch(applicationNewSnackbar({
                    message:'Message to warning snackbar',
                    variant:'warning',
                }))
            },
        }
    })
)
@(withStyles(style)as any)
export default class AccessibilityView extends React.Component<Props, any>{
    render():any{

        const {
            classes,
            actions:{
                onOpenNewSelf,onOpenGoogle,
                handleOpenPrimarySnackBar, handleOpenSecondarySnackBar,
            }
        } = this.props;

        return(
            <React.Fragment>
                <Typography
                    variant={"title"} gutterBottom
                >
                    Accessibility view works
                </Typography>

                <Button size={"large"} variant={"contained"} color={"primary"} onClick={onOpenNewSelf}
                >Report</Button>
                <Button size={"large"} variant={"contained"} color={"secondary"} onClick={onOpenGoogle}
                >Google</Button>


                <Button size={"large"} variant={"contained"} color={"primary"} onClick={handleOpenPrimarySnackBar}
                >Snackbar 1</Button>
                <Button size={"large"} variant={"contained"} color={"secondary"} onClick={handleOpenSecondarySnackBar}
                >Snackbar 2</Button>

                <hr/>

                <Button size={"small"} variant={"contained"} className={classes.primary}
                >Primary</Button>
                <Button size={"small"} variant={"contained"} className={classes.info}
                >Info</Button>
                <Button size={"small"} variant={"contained"} className={classes.success}
                >Success</Button>
                <Button size={"small"} variant={"contained"} className={classes.warning}
                >Warning</Button>
                <Button size={"small"} variant={"contained"} className={classes.danger}
                >Danger</Button>
                <Button size={"small"} variant={"contained"} className={classes.rose}
                >Rose</Button>

            </React.Fragment>
        )
    }
}