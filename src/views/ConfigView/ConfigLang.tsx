import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import cx from "classnames";
import { connect } from 'react-redux';

import { configLangViewStyle as style } from '../../assets/jss/openfin-starter';

import i18n from '../../i18n';

import usFlag from '../../assets/svg/nationals/united-states.svg';
import chFlag from '../../assets/svg/nationals/china.svg';

interface IProps extends WithStyles<typeof style>{
    language:string,
    actions:{
        handleUpdateLangField:(lang:string)=>void,
    }


}

interface IState {
    anchorEl:any,
}

import {configUpdateOneField, IRootState } from '../../reduxs';

class ConfigLangView extends React.Component<IProps,IState>{

    state = {
        anchorEl: null,
    };

    getBtnContent = ()=>{
        const { classes, language } = this.props;

        if (language === 'zh-CN'){
            return(<React.Fragment>
                <img className={classes.flagImg} src={chFlag}/>
                简体中文
            </React.Fragment>)
        }

        return(<React.Fragment>
            <img className={classes.flagImg} src={usFlag}/>
            English(US)
        </React.Fragment>)
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLanguageChangeBtnClick = (lang:string)=>()=>{
        const { actions:{
            handleUpdateLangField
        } } = this.props;
        i18n.changeLanguage(lang);
        handleUpdateLangField(lang);
        this.setState({ anchorEl: null });
    }

    render(){

        const { classes, actions:{
            handleUpdateLangField
        } } = this.props;
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
                    <MenuItem onClick={this.handleLanguageChangeBtnClick('en-US')}>
                        <img className={classes.flagImg} src={usFlag}/>
                        English(US)
                    </MenuItem>
                    <MenuItem onClick={this.handleLanguageChangeBtnClick('zh-CN')}>
                        <img className={classes.flagImg} src={chFlag}/>
                        简体中文
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default connect(
    (state:IRootState)=>({
        language:state.config.application.language,
    }),
    dispatch => ({
        actions:{
            handleUpdateLangField: (value:string)=>{
                dispatch(configUpdateOneField({
                    name:'application.language',
                    value,
                }))
            }

        }
    })

    )(
    withStyles(style)(ConfigLangView)
);

