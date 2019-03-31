import * as React from 'react';
import { useContext, useState }from 'react';
import { ConfigContext, I18Language } from 'react-openfin';

import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import cx from "classnames";

import { configLangFieldCompStyle as style } from '../../../assets/jss/openfin-starter';

import i18n from '../../../i18n';

import usFlag from '../../../assets/svg/nationals/united-states.svg';
import chFlag from '../../../assets/svg/nationals/china.svg';

const useStyles = makeStyles(style);

const ConfigLangField:React.FunctionComponent<{}> = (
    {}
)=>{

    const {
        config,
        actions:{
            onUpdateLangField
        }
    } = useContext(ConfigContext);

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement | ((element: HTMLElement) => HTMLElement)>(null);

    const getBtnContent = ()=>{

        const language:I18Language = config.application.language;

        if (language === 'zh-CN'){
            return(<React.Fragment>
                <img className={classes.flagImg} src={chFlag}/>
                <Typography variant='body1'>简体中文</Typography>
            </React.Fragment>)
        }

        return(<React.Fragment>
            <img className={classes.flagImg} src={usFlag}/>
            <Typography variant='body1'>English(US)</Typography>
        </React.Fragment>)
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChangeBtnClick = (lang:I18Language)=>()=>{
        i18n.changeLanguage(lang);
        onUpdateLangField(lang);
        setAnchorEl(null);
    }


    return (
        <div className={classes.container}>
            <Button
                aria-owns={anchorEl ? 'language-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {getBtnContent()}
            </Button>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLanguageChangeBtnClick('en-US')}>
                    <img className={classes.flagImg} src={usFlag}/>
                    <Typography variant='body1'>English(US)</Typography>
                </MenuItem>
                <MenuItem onClick={handleLanguageChangeBtnClick('zh-CN')}>
                    <img className={classes.flagImg} src={chFlag}/>
                    <Typography variant='body1'>简体中文</Typography>
                </MenuItem>
            </Menu>
        </div>
    )

}

export default ConfigLangField;

