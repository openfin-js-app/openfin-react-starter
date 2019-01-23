import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import cx from "classnames";
import { connect } from 'react-redux';

import { sampleNotificationViewStyle as style } from '../../assets/jss/openfin-starter';

import appSvg from '../../assets/svg/app.svg';

interface IProps extends WithStyles<typeof style>{
    count:number,
}

import { IRootState } from '../../reduxs';

class SampleNotificationView extends React.Component<IProps,{}>{
    render(){

        const {
            classes, count,
        } = this.props;

        return (
            <div className={classes.container}>

                <img className={classes.appImg} src={appSvg}/>

                <Typography variant='h2'>
                    Cnt:{count}
                </Typography>

            </div>
        )
    }
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
    withStyles(style)(SampleNotificationView)
);

