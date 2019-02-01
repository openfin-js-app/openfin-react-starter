import * as React from 'react';
import { connect } from 'react-redux'

import { I18Language, IConfigRuntimeState } from './reduxs'

import { ConfigContextProvider } from './reduxs/config/context';

interface IProps {
    config:IConfigRuntimeState,
    onToggleThemeField?:()=>void,
    onUpdateLangField?:(lang:I18Language)=>void,
}

class GlobalContext extends React.Component<IProps,{}>{

    render(){

        const {
            config,
            onToggleThemeField,
            onUpdateLangField,
        } = this.props;

        return (
            <ConfigContextProvider value={
                {
                    config,
                    actions:{
                        onToggleThemeField,
                        onUpdateLangField,
                    }
                }
            }>
                {this.props.children}
            </ConfigContextProvider>

        )
    }
}

export default GlobalContext;