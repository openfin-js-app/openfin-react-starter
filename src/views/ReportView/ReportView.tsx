import * as React from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import { Scrollbars } from 'react-custom-scrollbars';

import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { reportViewStyle as style } from '../../assets/jss/openfin-starter';

class ReportView extends React.Component<any,any>{
    render (){
        const {
            classes,
            username, computerName, deviceId, deviceUserId,
            version, hostSpec,
        } = this.props;

        return(<div className={classes.root}>
            <Scrollbars>
                <div className={classes.mainContainer}>
                    <Typography variant={"title"} gutterBottom>
                        Openfin {version} - {username} @ {computerName}
                    </Typography>
                    <Typography variant={"body2"}>
                        DeviceId:{deviceId}
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
        deviceId:state.application.deviceId,
        deviceUserId:state.application.deviceUserId,
        version:state.application.openfinVersion,
        hostSpec:state.application.openfinHostSpec,
    }),
    dispatch => ({
        actions:{

        }
    })
)(withStyles(style)(ReportView));