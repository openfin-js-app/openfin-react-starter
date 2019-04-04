import * as React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

import { IConfigTab, MuiTheme, FieldType } from 'react-openfin';
import {
    ConfigAboutField,
    ConfigThemeField,
    ConfigLangField,
    ConfigJsonField,
    ConfigView,
} from 'react-openfin-mat-impl';

import SettingIcon from '@material-ui/icons/Settings';

import i18n from '../i18n';

import appSvg from '../assets/svg/app.svg';
import companySvg from '../assets/svg/company.svg';
import controlsSvg from'../assets/svg/support/controls.svg';
import controlsDarkSvg from'../assets/svg/support/controls_dark.svg';
import infomationSvg from '../assets/svg/support/information.svg';
import infomationDarkSvg from '../assets/svg/support/information-dark.svg';
import listCheckedSvg from'../assets/svg/other/check-box.svg';
import listCheckedDarkSvg from'../assets/svg/other/list-checked-dark.svg';

function _getSampleDate() {
    return process.env.NODE_ENV === 'test'? new Date(2018,9,13,16,53,41): new Date();
}

const configTabs:IConfigTab[]=[
    {
        _order: 0 ,
        _label: 'application.label',
        _name:'application',
        _svgUrl: controlsSvg,
        _svgUrl_dark: controlsDarkSvg,
        _icon: SettingIcon,
        _fields:[
            {
                _type:FieldType.SUBHEADING,
                _label:'application.theme.label',
                _cols: 2,
                _rows:1,
            },
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'Theme',
                _custom:<ConfigThemeField/>,
                _name:'theme',
                _defaultValue:MuiTheme.DARK,
                _cols:10,
                _rows:1,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'application.language.label',
                _cols: 2,
                _rows:1,
            },
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'language',
                _custom:<ConfigLangField/>,
                _name:'language',
                _defaultValue:i18n.language,
                _cols:10,
                _rows:1,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'application.newWinPos.label',
                _cols: 12,
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinTop',
                _name:'newWinTop',
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_TOP,10),
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinLeft',
                _name:'newWinLeft',
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT,10),
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinWidth',
                _name:'newWinWidth',
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_WIDTH,10),
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWinHeight',
                _name:'newWinHeight',
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_HEIGHT,10),
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWindDeltaLeft',
                _name:'newWindDeltaLeft',
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_DELTA_LEFT,10),
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'application.newWinPos.newWindDeltaHeight',
                _name:'newWindDeltaHeight',
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_DELTA_HEIGHT,10),
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
        ]
    },
    {
        _order: 1 ,
        _label: 'about.label',
        _name:'about',
        _svgUrl: infomationSvg,
        _svgUrl_dark: infomationDarkSvg,
        _icon: SettingIcon,
        _fields:[
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'About openfin starter',
                _custom:
                    <ConfigAboutField
                        appLogo={appSvg}
                        companyLogo={companySvg}
                    />
                ,
                _cols:12,
                _rows:12,
            }
        ]
    },
    {
        _order: 2,
        _label: 'sample.label',
        _name:'sample',
        _svgUrl: listCheckedSvg,
        _svgUrl_dark: listCheckedDarkSvg,
        _icon: SettingIcon,
        _fields:[
            {
                _type:FieldType.SUBHEADING,
                _label:'sample.vals.label',
                _cols: 12,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'sample.vals.string.label',
                _cols: 4,
            },
            {
                _type:FieldType.STRING,
                _label:'sample.vals.string.field',
                _name:'strValue',
                _defaultValue:"",
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'sample.vals.currency.label',
                _cols: 4,
            },
            {
                _type:FieldType.CURRENCY,
                _label:'sample.vals.currency.field',
                _name:'crrValue',
                _defaultValue:123456789,
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'sample.vals.date.label',
                _cols: 4,
            },
            {
                _type:FieldType.DATE,
                _label:'sample.vals.date.field',
                _name:'dateValue',
                _defaultValue:_getSampleDate(),
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'sample.vals.time.label',
                _cols: 4,
            },
            {
                _type:FieldType.TIME,
                _label:'sample.vals.time.field',
                _name:'timeValue',
                _defaultValue:_getSampleDate(),
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'sample.vals.dateTime.label',
                _cols: 4,
            },
            {
                _type:FieldType.DATETIME,
                _label:'sample.vals.dateTime.field',
                _name:'datetimeValue',
                _defaultValue:_getSampleDate(),
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'sample.vals.customField.label',
                _cols: 12,
            },
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'sample.vals.customField.field',
                _custom:<ConfigJsonField/>,
                _cols:12,
                _rows:6,
            }
        ]
    }
];

export const MyConfigView:React.FunctionComponent<{}> = ({})=>{
    return (<ConfigView tabs={configTabs}/>)
}

export default configTabs;
