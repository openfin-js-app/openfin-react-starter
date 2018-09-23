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

export interface IConfigField {
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

export interface IConfigState {
    configGlobalFilterString:string;
    _tabs:IConfigTab[];
    [key:string]:any;
    [key:number]:any;
}