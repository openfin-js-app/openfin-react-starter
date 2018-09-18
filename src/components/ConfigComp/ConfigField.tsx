import * as React from 'react';
import * as shortid from 'shortid';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { FieldType } from '../../redux/config/types';

import { withStyles } from '@material-ui/core/styles';
import { configFieldCompStyle as style } from '../../assets/jss/openfin-starter';

import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="$"
        />
    );
}

class ConfigFieldComp extends React.Component<any,any>{

    handleTextFieldChange = event =>{
        if (this.props.onChange){
            this.props.onChange(event.target.value);
        }
    };

    handleTextFieldIntChange = event =>{
        if (this.props.onChange){
            const value = event.target.value;
            this.props.onChange(value?parseInt(value,10):'');
        }
    };

    handleTextFieldFloatChange = event =>{
        if (this.props.onChange){
            const value = event.target.value;
            this.props.onChange(value?parseFloat(value):'');
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
            ...other
        } = this.props;

        switch (_type){
            case FieldType.TITLE:
                return (<Typography variant={'title'} gutterBottom>
                    {_label}
                </Typography>);
            case FieldType.SUBHEADING:
                return (<Typography className={classes.subheadingField} variant={'subheading'} gutterBottom>
                    {_label}
                </Typography>);
            case FieldType.CUSTOM_FIELD:
                return (_custom);
            case FieldType.CURRENCY:
                return (
                    <TextField
                        label={_label}
                        value={value}
                        onChange={this.handleTextFieldFloatChange}
                        id={`config_field_${shortid.generate()}`}
                        InputProps={{inputComponent:NumberFormatCustom}}
                        margin={"dense"}
                        {..._props}
                    />
                );
            case FieldType.STRING:
                return (
                    <TextField
                        id={`config_field_${shortid.generate()}`}
                        label={_label}
                        value={value}
                        onChange={this.handleTextFieldChange}
                        margin={"dense"}
                        {..._props}
                    />
                );
            case FieldType.NUMBER:
                return(<TextField
                    type={"number"}
                    className={classes.numberField}
                    id={`config_field_${shortid.generate()}`}
                    error={value?false:true}
                    label={_label}
                    value={value}
                    onChange={this.handleTextFieldIntChange}
                    margin={"dense"}
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
                            margin={"dense"}
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
                            margin={"dense"}
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
                            margin={"dense"}
                            {..._props}
                        />
                    </MuiPickersUtilsProvider>
                );
            case FieldType.BODY1:
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