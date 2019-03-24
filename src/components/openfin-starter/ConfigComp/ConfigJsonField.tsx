import * as React from 'react';
import {useContext} from "react";

import {Scrollbars} from 'react-custom-scrollbars';
import ReactJson from 'react-json-view';

import {MuiTheme} from "../../../reduxs";
import { ConfigContext } from "../../../reduxs/config/context";

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