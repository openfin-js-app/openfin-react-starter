import * as React from 'react';
import {useContext} from "react";

import {Scrollbars} from 'react-custom-scrollbars';
import ReactJson from 'react-json-view';

import {MuiTheme} from "../../reduxs";
import { ConfigContext } from "../../reduxs/config/context";

interface IProps {
    config:any,
    theme:MuiTheme,
}

const ConfigJsonView:React.FunctionComponent<{}> = (
    {}
) => {

    const {
        config
    } = useContext(ConfigContext);

    const theme = config.application.theme;

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

export default ConfigJsonView;