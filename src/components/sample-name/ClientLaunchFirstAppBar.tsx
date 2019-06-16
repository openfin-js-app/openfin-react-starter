import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from "@material-ui/styles";

import ThumbUpIcon from '@material-ui/icons/ThumbUp'

import {clientLaunchFirstAppBarComp as style} from "../../assets/jss/sample-name";

import appLogo from '../../assets/svg/app.svg';

const useStyles = makeStyles(style);

const ClientLaunchFirstAppBar:React.FunctionComponent<{}>=(
    props
)=>{

    const classes = useStyles({});

    return (<div className={classes.outmostContainer}>
        <img src={appLogo} className={classes.appLogoImg}/>
        <IconButton aria-label="ThumbUp" className={classes.testBtn} >
            <ThumbUpIcon fontSize="small" />
        </IconButton>
    </div>)
}

export default ClientLaunchFirstAppBar;