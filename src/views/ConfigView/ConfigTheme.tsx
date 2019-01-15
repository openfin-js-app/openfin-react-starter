import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';

import cx from "classnames";
import { connect } from 'react-redux';

import { configThemeViewStyle as style } from '../../assets/jss/openfin-starter';

import {
    MuiTheme,
    configUpdateOneField,
} from '../../reduxs'

interface IProps extends WithStyles<typeof style>{
    theme:MuiTheme,
    actions:{
        handleUpdateThemeField:(value:MuiTheme)=>void,
        handleToggleThemeField:()=>void,
    },
}

import { IRootState } from '../../reduxs';

class ConfigThemeView extends React.Component<IProps,{}>{
    render(){

        const {
            theme,
            actions:{
                handleToggleThemeField,
            }
        } = this.props;

        return (
            <React.Fragment>
                ConfigTheme view works ~ {theme}
                <Switch
                    checked={theme === MuiTheme.DARK}
                    onChange={handleToggleThemeField}
                    value="themeVal"
                />
            </React.Fragment>
        )
    }
}

export default connect(
    (state:IRootState)=>({
        theme:state.config.application.theme
    }),
    dispatch => ({
        actions:{
            handleUpdateThemeField: (value:MuiTheme)=>{
                dispatch(configUpdateOneField({
                    name:'application.theme',
                    value,
                }))
            }
        }
    }),
    (stateProps,actionProps)=>({
        ...stateProps,
        actions:{
            ...actionProps.actions,
            handleToggleThemeField: ()=>{
                actionProps.actions.handleUpdateThemeField(
                    stateProps.theme === MuiTheme.DARK ?MuiTheme.LIGHT:MuiTheme.DARK
                )
            }
        }

    })
    )(
    withStyles(style)(ConfigThemeView)
);

