import * as React from 'react';
import * as shortid from 'shortid';

import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import MomentUtils from '@date-io/moment'
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { FieldType } from '../../../reduxs';

import { WithStyles, withStyles } from '@material-ui/core/styles';

import {useTranslation} from 'react-i18next';

import { configFieldCompStyle as style } from '../../../assets/jss/openfin-starter';

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

interface IProps extends WithStyles<typeof style> {
    _type:FieldType,
    _label:string,
    _props?:any,
    _custom?:any,
    value:any,
    onChange?:(value:any)=>void
}

const ConfigFieldComp:React.FunctionComponent<IProps> = (
    {
        classes,
        _type, _label, _props, _custom,
        value,

        onChange
    }
)=>{

    const { t, i18n } = useTranslation('config', { useSuspense: false });

    const handleTextFieldChange = event =>{
        if (onChange){
            onChange(event.target.value);
        }
    };

    const handleTextFieldIntChange = event =>{
        if (onChange){
            const value = event.target.value;
            onChange(value?parseInt(value,10):'');
        }
    };

    const handleTextFieldFloatChange = event =>{
        if (onChange){
            const value = event.target.value;
            onChange(value?parseFloat(value):'');
        }
    };

    const handleDateChange = (date) =>{
        if (onChange){
            onChange(date._d);
        }
    };

    switch (_type){
        case FieldType.TITLE:
            return (<Typography variant={'h5'} gutterBottom>
                {t(_label)}
            </Typography>);
        case FieldType.SUBHEADING:
            return (<Typography className={classes.subheadingField} variant={'subtitle1'}>
                {t(_label)}
            </Typography>);
        case FieldType.CUSTOM_FIELD:
            return (_custom);
        case FieldType.CURRENCY:
            return (
                <TextField
                    label={t(_label)}
                    value={value}
                    onChange={handleTextFieldFloatChange}
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
                    label={t(_label)}
                    value={value}
                    onChange={handleTextFieldChange}
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
                label={t(_label)}
                value={value}
                onChange={handleTextFieldIntChange}
                margin={"dense"}
                {..._props}
            />);
        case FieldType.DATE:
            return(
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        keyboard
                        label={t(_label)}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                        value={value}
                        onChange={handleDateChange}
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
                        label={t(_label)}
                        value={value}
                        onChange={handleDateChange}
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
                        label={t(_label)}
                        value={value}
                        onChange={handleDateChange}
                        disableOpenOnEnter
                        margin={"dense"}
                        {..._props}
                    />
                </MuiPickersUtilsProvider>
            );
        case FieldType.BODY1:
        default:
            return (<Typography variant={"body1"} gutterBottom align={"right"}>
                {t(_label)}
            </Typography>)
    }
}

export default withStyles(style)(
    ConfigFieldComp
);