import * as React from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import { Scrollbars } from 'react-custom-scrollbars';

import Typography from '@material-ui/core/Typography';

import { WithStyles, withStyles } from '@material-ui/core/styles';

import { reportViewStyle as style } from '../../assets/jss/openfin-starter';

interface IProps extends WithStyles<typeof style>{
    username:string,
    computerName:string,
    machineId:string,
    deviceUserId:string,
    version:string,
    hostSpec:any,
}

class ReportView extends React.Component<IProps,{}>{
    render (){
        const {
            classes,
            username, computerName, machineId, deviceUserId,
            version, hostSpec,
        } = this.props;

        return(<div className={classes.root}>
            <Scrollbars
                renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
            >
                <div className={classes.mainContainer}>
                    <Typography variant={"subtitle1"} gutterBottom>
                        Openfin {version} - {username} @ {computerName}
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
}

export default connect(
    (state:any)=>({
        username:state.application.username,
        computerName:state.application.computerName,
        machineId:state.application.machineId,
        deviceUserId:state.application.deviceUserId,
        version:state.application.openfinVersion,
        hostSpec:state.application.openfinHostSpec,
    }),
    dispatch => ({
        actions:{

        }
    })
)(withStyles(style)(ReportView));