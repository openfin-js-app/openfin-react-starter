import * as React from 'react';
import * as shortid from 'shortid';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

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
            let value = event.target.value;
            this.props.onChange(value?parseInt(value):'');
        }
    };

    handleDateChange = (date) =>{
        if (this.props.onChange){
            this.props.onChange(date._d);
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
            case FieldType.DATE:
                return(
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            keyboard
                            label={_label}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                            value={value}
                            onChange={this.handleDateChange}
                            disableOpenOnEnter
                            animateYearScrolling={false}
                            {..._props}
                        />
                    </MuiPickersUtilsProvider>
                );
            case FieldType.TIME:
                return(
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <TimePicker
                            seconds
                            format="hh:mm:ss A"
                            label={_label}
                            value={value}
                            onChange={this.handleDateChange}
                            {..._props}
                        />
                    </MuiPickersUtilsProvider>
                );
            case FieldType.DATETIME:
                return(
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DateTimePicker
                            format="YYYY/MM/DD hh:mm A"
                            mask={[/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                            label={_label}
                            value={value}
                            onChange={this.handleDateChange}
                            disableOpenOnEnter
                            {..._props}
                        />
                    </MuiPickersUtilsProvider>
                );
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