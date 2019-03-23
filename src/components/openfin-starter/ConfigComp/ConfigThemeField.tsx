import * as React from 'react';
import { useContext } from 'react';

import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

import { useTranslation } from 'react-i18next';

import { configThemeFieldCompStyle as style } from '../../../assets/jss/openfin-starter';

import {
    MuiTheme,
} from '../../../reduxs'

import {
    ConfigContext
} from '../../../reduxs/config/context'

const useStyles = makeStyles(style);

const ConfigThemeField:React.FunctionComponent<{}> = (
    {}
)=>{

    const classes = useStyles();

    const { t, i18n } = useTranslation('config', { useSuspense: false });

    const {
        config,
        actions:{
            onToggleThemeField
        }
    } = useContext(ConfigContext);

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

export default ConfigThemeField;

