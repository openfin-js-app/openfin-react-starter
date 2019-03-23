import * as React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/styles';

import {
    MuiTheme,
} from '../../../reduxs';

import {
    WithConfigContext,
    withConfigContext
} from '../../../reduxs/config/context';

import { headerThemeSwitcherCompStyle as style } from '../../../assets/jss/openfin-starter';

const useStyles = makeStyles(style);

const HeaderThemeSwitcherComp:React.FunctionComponent<WithConfigContext> = (
    {
        configContext:{
            config,
            actions:{
                onToggleThemeField
            }
        }
    }
)=>{

    const classes = useStyles();

    return(
        <div
            className={cx(
                classes.switcher,
                {
                    [classes.active]: config.application.theme === MuiTheme.DARK
                }
            )}
            onClick={onToggleThemeField}
        />
    )
}

export default withConfigContext(HeaderThemeSwitcherComp);