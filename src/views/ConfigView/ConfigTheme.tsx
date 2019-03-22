import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import cx from "classnames";
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { configThemeViewStyle as style } from '../../assets/jss/openfin-starter';

import {
    MuiTheme,
} from '../../reduxs'

import {
    WithConfigContext,
    withConfigContext
} from '../../reduxs/config/context'

interface IProps extends WithStyles<typeof style>, WithConfigContext{
    actions:{
    },
}

import { IRootState } from '../../reduxs';

const ConfigThemeView:React.FunctionComponent<IProps> = (
    {
        classes,
        configContext:{
            config,
            actions:{
                onToggleThemeField
            }
        }
    }
)=>{

    const { t, i18n } = useTranslation('config', { useSuspense: false });

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
        withConfigContext(ConfigThemeView)
    )
);

