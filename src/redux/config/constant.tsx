import * as React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

import { ConfigTab, ConfigField, FieldType } from './types';

import SettingIcon from '@material-ui/icons/Settings';

const controls = require('../../assets/svg/support/controls_dark.svg') as string;

const configTabs:ConfigTab[]=[
    {
        _order: 0 ,
        _label: 'Application',
        _name:'application',
        _svgUrl: controls,
        _icon: SettingIcon,
        _fields:[
            {
                _type:FieldType.SUBHEADING,
                _label:'New Window Position',
                _cols: 12,
            },
            {
                _type:FieldType.NUMBER,
                _label:'New Window Top',
                _name:'newWinTop',
                _defaultValue:10,
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
                _defaultValue:300,
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
                _defaultValue:10,
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
                _defaultValue:300,
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
                _defaultValue:10,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
            {
                _type:FieldType.NUMBER,
                _label:'New Window Delta Right',
                _name:'newWindDeltaRight',
                _defaultValue:10,
                _props:{
                    InputProps:{
                        endAdornment:<InputAdornment position={'end'}>Pixel</InputAdornment>
                    }
                }
            },
        ]
    }
];

export default configTabs;
