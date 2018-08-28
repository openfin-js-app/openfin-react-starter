import * as React from 'react';

import {connect} from 'react-redux';
import {Scrollbars} from 'react-custom-scrollbars';
import ReactJson from 'react-json-view';

class ConfigJsonView extends React.Component<any,any>{
    render(){
        const {config} = this.props;
        return(
            <Scrollbars
                renderThumbVertical={props => <div className={"dark-thumb-vertical"} {...props}/>}
            >
                <ReactJson src={config} theme={'monokai'}/>
            </Scrollbars>
        )
    }
}

export default connect(
    (state:any) => ({
        config:state.config
    }),
    dispatch => {
        actions:{

        }
    }
)(ConfigJsonView);