import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import cx from "classnames";
import { connect } from 'react-redux';

import { configLangViewStyle as style } from '../../assets/jss/openfin-starter';

import i18n from '../../i18n';

import usFlag from '../../assets/svg/nationals/united-states.svg';
import chFlag from '../../assets/svg/nationals/china.svg';

import { I18Language, IRootState } from '../../reduxs';

import {
    WithConfigContext,
    withConfigContext
} from '../../reduxs/config/context'

interface IProps extends WithStyles<typeof style>, WithConfigContext{

}

interface IState {
    anchorEl:any,
}

class ConfigLangView extends React.Component<IProps,IState>{

    state = {
        anchorEl: null,
    };

    getBtnContent = ()=>{
        const { classes, configContext } = this.props;

        const language:I18Language = configContext.config.application.language;

        if (language === I18Language.zh_CN){
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

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLanguageChangeBtnClick = (lang:I18Language)=>()=>{
        const {
            configContext:{
                actions:{
                    onUpdateLangField
                }
            }
        } = this.props;
        i18n.changeLanguage(lang);
        onUpdateLangField(lang);
        this.setState({ anchorEl: null });
    }

    render(){

        const {
            classes,
        } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.container}>
                <Button
                    aria-owns={anchorEl ? 'language-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {this.getBtnContent()}
                </Button>
                <Menu
                    id="language-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleLanguageChangeBtnClick(I18Language.en_US)}>
                        <img className={classes.flagImg} src={usFlag}/>
                        <Typography variant='body1'>English(US)</Typography>
                    </MenuItem>
                    <MenuItem onClick={this.handleLanguageChangeBtnClick(I18Language.zh_CN)}>
                        <img className={classes.flagImg} src={chFlag}/>
                        <Typography variant='body1'>简体中文</Typography>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default connect(
    (state:IRootState)=>({
    }),
    dispatch => ({
        actions:{

        }
    })

    )(
    withStyles(style)(
        withConfigContext(ConfigLangView)
    )
);

