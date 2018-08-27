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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_TOP),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_WIDTH),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_HEIGHT),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_DELTA_LEFT),
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
                _defaultValue:parseInt(process.env.REACT_APP_NEW_WINDOW_DELTA_HEIGHT),
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
