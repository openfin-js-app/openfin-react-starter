import * as React from 'react';

import {connect} from 'react-redux';
import {Scrollbars} from 'react-custom-scrollbars';
import ReactJson from 'react-json-view';
import {MuiTheme} from "../../reduxs";

interface IProps {
    config:any,
    theme:MuiTheme,
}

const ConfigJsonView:React.FunctionComponent<IProps> = (
    {
        config, theme,
    }
) => {
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

export default connect(
    (state:any) => ({
        config:state.config,
        theme:state.config.application.theme
    }),
    dispatch => ({
        actions:{

        }
     })
)(ConfigJsonView);