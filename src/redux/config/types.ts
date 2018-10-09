import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { TextFieldProps } from '@material-ui/core/TextField';
import {TimePickerModalProps} from "material-ui-pickers/TimePicker/TimePickerModal";
import {DatePickerModalProps} from "material-ui-pickers/DatePicker/DatePickerModal";


export enum FieldType{
    CUSTOM_FIELD = 1,
    STRING = 2,
    DATETIME = 3,
    DATE = 4,
    TIME = 5,
    NUMBER = 6,
    CURRENCY = 7,
    TITLE = 8,
    SUBHEADING = 9,
    BODY1 = 10,
}

export interface IConfigField {
    _type:FieldType;
    _label:string;
    _name?:string;
    _defaultValue?:any;
    _cols?:number;
    _rows?:number;
    _props?:TextFieldProps|TimePickerModalProps|DatePickerModalProps;
    _custom?:any;
    [key:string]:any;
    [key:number]:any;
}

export interface IConfigTab {
    _order?:number;
    _label:string;
    _name:string;
    _svgUrl:string;
    _icon?:React.ComponentType<SvgIconProps>;
    _fields:IConfigField[];
    _fieldLabels?:string;
    [key:string]:any;
    [key:number]:any;
}

export interface IConfigResetOption {
    tabName?:string
}

export interface IConfigUpdateOneFieldOption {
    name:string,
    value:any,
}

export interface IConfigUpdateGlobalFilterStrOption {
    configGlobalFilterString:string,
}

export interface IConfigState {
    configGlobalFilterString:string;
    _tabs:IConfigTab[];
    [key:string]:any;
    [key:number]:any;
}