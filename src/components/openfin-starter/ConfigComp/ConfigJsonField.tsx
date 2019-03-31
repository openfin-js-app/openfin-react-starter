import * as React from 'react';
import {useContext} from "react";
import { ConfigContext, MuiTheme } from "react-openfin";
import {Scrollbars} from 'react-custom-scrollbars';
import ReactJson from 'react-json-view';

const ConfigJsonField:React.FunctionComponent<{}> = (
    {}
) => {

    const {
        config
    } = useContext(ConfigContext);

    const theme:MuiTheme = config.application.theme;

    return(
        <Scrollbars
            renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
        >
            <ReactJson src={config} theme={
                theme===MuiTheme.DARK?'monokai':'rjv-default'
            }/>
        </Scrollbars>
    )
}

export default ConfigJsonField;