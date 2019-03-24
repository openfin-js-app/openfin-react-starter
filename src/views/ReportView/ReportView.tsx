import * as React from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import { Scrollbars } from 'react-custom-scrollbars';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

import { reportViewStyle as style } from '../../assets/jss/openfin-starter';

interface IProps {
    username:string,
    computerName:string,
    machineId:string,
    deviceUserId:string,
    version:string,
    hostSpec:any,
    winTop:number,
    winLeft:number,
    winWidth:number,
    winHeight:number,
}

const useStyles = makeStyles(style);

const ReportView:React.FunctionComponent<IProps> = (
    {
        username, computerName, machineId, deviceUserId,
        version, hostSpec,
        winTop,winLeft,winWidth,winHeight,
    }
)=>{

    const classes = useStyles();

    return(<div className={classes.root}>
        <Scrollbars
            renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
        >
            <div className={classes.mainContainer}>
                <Typography variant={"subtitle1"} gutterBottom>
                    Openfin {version} - {username} @ {computerName}
                </Typography>
                <Typography variant={"body1"}>
                    X:&lt;{winLeft}&gt;|Y:&lt;{winTop}&gt;|W&lt;{winWidth}&gt;H&lt;{winHeight}&gt;
                </Typography>
                <Typography variant={"body1"}>
                    MachineId:{machineId}
                </Typography>
                <Typography variant={"body2"}>
                    DeviceUserId:{deviceUserId}
                </Typography>
                <ReactJson src={hostSpec} theme={"monokai"}/>
            </div>
        </Scrollbars>
    </div>);
}

export default connect(
    (state:any)=>({
        username:state.application.username,
        computerName:state.application.computerName,
        machineId:state.application.machineId,
        deviceUserId:state.application.deviceUserId,
        version:state.application.openfinVersion,
        hostSpec:state.application.openfinHostSpec,
        winTop : state.application.winTop,
        winLeft : state.application.winLeft,
        winWidth : state.application.winWidth,
        winHeight : state.application.winHeight,
    }),
    dispatch => ({
        actions:{

        }
    })
)(ReportView);