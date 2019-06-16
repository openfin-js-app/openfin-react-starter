import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';

import cx from "classnames";
import { connect } from 'react-redux';

import { sampleNotificationViewStyle as style } from '../../assets/jss/sample-name';

import appSvg from '../../assets/svg/app.svg';

interface IProps{
    count:number,
}

import { IRootState } from '../../reduxs';

const useStyles = makeStyles(style);

const SampleNotificationView:React.FunctionComponent<IProps> = (
    {
        count,
    }
)=>{

    const classes = useStyles({});

    return (
        <div className={classes.container}>

            <img className={classes.appImg} src={appSvg}/>

            <Typography variant='h2'>
                Cnt:{count}
            </Typography>

        </div>
    )

}

export default connect(
    (state:IRootState)=>({
        count:state.client.count,
    }),
    dispatch => ({
        actions:{

        }
    })

    )(
    SampleNotificationView
);

