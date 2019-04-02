import * as React from 'react';
import { useContext } from 'react';
import { ConfigContext, MuiTheme } from 'react-openfin';
import cx from 'classnames';
import { makeStyles } from '@material-ui/styles';

import { headerThemeSwitcherCompStyle as style } from '../../../assets/jss/openfin-starter';

const useStyles = makeStyles(style);

const HeaderThemeSwitcherComp:React.FunctionComponent<{}> = (
    {}
)=>{

    const classes = useStyles();

    const {
        config:{
            application:{
                theme
            }
        },
        actions:{
            onToggleThemeField,
        }
    } = useContext(ConfigContext);

    return(
        <div
            className={cx(
                classes.switcher,
                {
                    [classes.active]: theme === MuiTheme.DARK
                }
            )}
            onClick={onToggleThemeField}
        />
    )
}

export default HeaderThemeSwitcherComp;