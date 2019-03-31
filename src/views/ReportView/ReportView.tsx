import * as React from 'react';
import { useContext } from 'react';
import { ApplicationContext } from 'react-openfin';
import ReactJson from 'react-json-view';
import { Scrollbars } from 'react-custom-scrollbars';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

import { reportViewStyle as style } from '../../assets/jss/openfin-starter';

const useStyles = makeStyles(style);

const ReportView:React.FunctionComponent<{}> = (
    {}
)=>{

    const classes = useStyles();

    const {
        state:{
            username, computerName, machineId, deviceUserId,
            openfinVersion, openfinHostSpec,
            winTop, winLeft, winWidth, winHeight,
        }
    } = useContext(ApplicationContext);

    return(<div className={classes.root}>
        <Scrollbars
            renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
        >
            <div className={classes.mainContainer}>
                <Typography variant={"subtitle1"} gutterBottom>
                    Openfin {openfinVersion} - {username} @ {computerName}
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
                <ReactJson src={openfinHostSpec} theme={"monokai"}/>
            </div>
        </Scrollbars>
    </div>);
}

export default ReportView;