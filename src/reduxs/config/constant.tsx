import * as React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

import { IConfigTab, IConfigField, MuiTheme, FieldType } from './types';

import SettingIcon from '@material-ui/icons/Settings';

import ConfigJson from '../../views/ConfigView/ConfigJson';
import ConfigTheme from '../../views/ConfigView/ConfigTheme';

import { ConfigAboutField } from '../../components';

import controlsSvg from'../../assets/svg/support/controls.svg';
import controlsDarkSvg from'../../assets/svg/support/controls_dark.svg';
import infomationSvg from '../../assets/svg/support/information.svg';
import infomationDarkSvg from '../../assets/svg/support/information-dark.svg';
import listCheckedSvg from'../../assets/svg/other/check-box.svg';
import listCheckedDarkSvg from'../../assets/svg/other/list-checked-dark.svg';

function _getSampleDate() {
    return process.env.NODE_ENV === 'test'? new Date(2018,9,13,16,53,41): new Date();
}

const configTabs:IConfigTab[]=[
    {
        _order: 0 ,
        _label: 'Application',
        _name:'application',
        _svgUrl: controlsSvg,
        _svgUrl_dark: controlsDarkSvg,
        _icon: SettingIcon,
        _fields:[
            {
                _type:FieldType.SUBHEADING,
                _label:'Dark/Light Theme',
                _cols: 2,
                _rows:1,
            },
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'Theme',
                _custom:<ConfigTheme/>,
                _name:'theme',
                _defaultValue:MuiTheme.DARK,
                _cols:10,
                _rows:1,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'New Window Position',
                _cols: 12,
            },
            {
                _type:FieldType.NUMBER,
                _label:'New Window Top',
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
                _label:'New Window Left',
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
                _label:'New Window Width',
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
                _label:'New Window Height',
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
                _label:'New Window Delta Left',
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
                _label:'New Window Delta Height',
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
        _label: 'About',
        _name:'about',
        _svgUrl: infomationSvg,
        _svgUrl_dark: infomationDarkSvg,
        _icon: SettingIcon,
        _fields:[
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'About openfin starter',
                _custom:<ConfigAboutField/>,
                _cols:12,
                _rows:12,
            }
        ]
    },
    {
        _order: 2,
        _label: 'Sample',
        _name:'sample',
        _svgUrl: listCheckedSvg,
        _svgUrl_dark: listCheckedDarkSvg,
        _icon: SettingIcon,
        _fields:[
            {
                _type:FieldType.SUBHEADING,
                _label:'Sample value',
                _cols: 12,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'STRING',
                _cols: 4,
            },
            {
                _type:FieldType.STRING,
                _label:'String value',
                _name:'strValue',
                _defaultValue:"",
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'CURRENCY',
                _cols: 4,
            },
            {
                _type:FieldType.CURRENCY,
                _label:'Currency value',
                _name:'crrValue',
                _defaultValue:123456789,
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'DATE',
                _cols: 4,
            },
            {
                _type:FieldType.DATE,
                _label:'Date value',
                _name:'dateValue',
                _defaultValue:_getSampleDate(),
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'TIME',
                _cols: 4,
            },
            {
                _type:FieldType.TIME,
                _label:'Time value',
                _name:'timeValue',
                _defaultValue:_getSampleDate(),
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'DATETIME',
                _cols: 4,
            },
            {
                _type:FieldType.DATETIME,
                _label:'Datetime value',
                _name:'datetimeValue',
                _defaultValue:_getSampleDate(),
                _cols: 8,
            },
            {
                _type:FieldType.SUBHEADING,
                _label:'Custom field',
                _cols: 12,
            },
            {
                _type:FieldType.CUSTOM_FIELD,
                _label:'Custom value',
                _custom:<ConfigJson/>,
                _cols:12,
                _rows:6,
            }
        ]
    }
];

export default configTabs;
