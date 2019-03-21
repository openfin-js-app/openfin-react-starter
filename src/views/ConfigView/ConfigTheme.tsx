import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import cx from "classnames";
import { connect } from 'react-redux';

import { withTranslation, WithTranslation } from 'react-i18next';

import { configThemeViewStyle as style } from '../../assets/jss/openfin-starter';

import {
    MuiTheme,
} from '../../reduxs'

import {
    WithConfigContext,
    withConfigContext
} from '../../reduxs/config/context'

interface IProps extends WithStyles<typeof style>, WithTranslation, WithConfigContext{
    actions:{
    },
}

import { IRootState } from '../../reduxs';

const ConfigThemeView:React.FunctionComponent<IProps> = (
    {
        classes, t,
        configContext:{
            config,
            actions:{
                onToggleThemeField
            }
        }
    }
)=>{

    return (
        <div className={classes.container}>
            <Switch
                checked={config.application.theme === MuiTheme.DARK}
                onChange={onToggleThemeField}
                value="themeVal"
            />
            <Typography className={classes.themeSpan} variant="body1" gutterBottom>
                {t(`common.${config.application.theme}`)}
            </Typography>
        </div>
    )

}

export default connect(
    (state:IRootState)=>({
    }),
    dispatch => ({
        actions:{
        }
    }),
    )(
    withStyles(style)(
        withTranslation('config')(withConfigContext(ConfigThemeView))
    )
);

