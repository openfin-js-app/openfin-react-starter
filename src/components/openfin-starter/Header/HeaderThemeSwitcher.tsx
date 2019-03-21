import * as React from 'react';
import cx from 'classnames';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import {
    MuiTheme,
} from '../../../reduxs';

import {
    WithConfigContext,
    withConfigContext
} from '../../../reduxs/config/context';

import { headerThemeSwitcherCompStyle as style } from '../../../assets/jss/openfin-starter';

interface IProps extends WithStyles<typeof style>, WithConfigContext {

}

const HeaderThemeSwitcherComp:React.FunctionComponent<IProps> = (
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

export default withStyles(style)(
    withConfigContext(HeaderThemeSwitcherComp)
);