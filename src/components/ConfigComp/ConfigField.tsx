import * as React from 'react';
import * as shortid from 'shortid';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import {FieldType, ConfigField } from '../../redux/config/types';

import { withStyles } from '@material-ui/core/styles';
import { configFieldCompStyle as style } from '../../assets/jss/openfin-starter';

class ConfigFieldComp extends React.Component<any,any>{

    handleTextFieldChange = event =>{
        if (this.props.onChange){
            this.props.onChange(event.target.value);
        }
    };

    render(){

        const {
            classes,
            _type, _label, _props, _custom,
            value,
        } = this.props;

        switch (_type){
            case FieldType.TITLE:
                return (<Typography variant={'title'} gutterBottom>
                    {_label}
                </Typography>);
            case FieldType.SUBHEADING:
                return (<Typography variant={'subheading'} gutterBottom>
                    {_label}
                </Typography>);
            case FieldType.NUMBER:
                return(<TextField
                    type={"number"}
                    className={classes.numberField}
                    id={`config_field_${shortid.generate()}`}
                    error={value?false:true}
                    label={_label}
                    value={value}
                    onChange={this.handleTextFieldChange}
                    {..._props}
                />);
            default:
                return (<Typography variant={"body1"} gutterBottom align={"right"}>
                    {_label}
                </Typography>)
        }

        return (<React.Fragment>
            Config field comp works
        </React.Fragment>);
    }
}

export default withStyles(style)(ConfigFieldComp);