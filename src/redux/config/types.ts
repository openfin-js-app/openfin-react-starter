import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { TextFieldProps } from '@material-ui/core/TextField';

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

export interface ConfigField {
    _type:FieldType;
    _label:string;
    _name?:string;
    _defaultValue?:any;
    _cols?:number;
    _rows?:number;
    _props?:TextFieldProps;
    _custom?:any;
    [key:string]:any;
    [key:number]:any;
}

export interface ConfigTab {
    _order?:number;
    _label:string;
    _name:string;
    _svgUrl:string;
    _icon?:React.ComponentType<SvgIconProps>;
    _fields:ConfigField[];
    _fieldLabels?:string;
    [key:string]:any;
    [key:number]:any;
}

export interface ConfigState {
    configGlobalFilterString:string;
    _tabs:ConfigTab[];
    [key:string]:any;
    [key:number]:any;
}