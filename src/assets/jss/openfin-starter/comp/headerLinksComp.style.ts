import { Theme, createStyles } from '@material-ui/core/styles';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

import {
    appbarHeight,
    defaultFont,
    dangerColor,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    roseColor,
} from '../../openfin-starter-constant';

const headerLinkStyle = (theme:Theme) => createStyles({
    menuBtn:{
        width:appbarHeight * 0.9,
        height:appbarHeight * 0.9,
        minHeight:appbarHeight * 0.9,
        marginRight: appbarHeight * 0.5,
        "-webkit-app-region":"no-drag",
        "& span svg":{
            width:appbarHeight * 0.8,
            height:appbarHeight * 0.8,
        }
    },
    info:{
        backgroundColor: infoColor,
        color: '#ffffff',
        borderRadius:"4px",
        "&:hover,&:focus":{
            background:infoColor,
            border:`1px solid ${lighten(infoColor,0.5)}`
        },
    },
    success:{
        backgroundColor: successColor,
        color: '#ffffff',
        borderRadius:"4px",
        "&:hover,&:focus":{
            background:successColor,
            border:`1px solid ${lighten(successColor,0.5)}`
        },
    },
    warning:{
        backgroundColor: warningColor,
        color: '#ffffff',
        borderRadius:"4px",
        "&:hover,&:focus":{
            background:warningColor,
            border:`1px solid ${lighten(warningColor,0.5)}`
        },
    },
    rose:{
        backgroundColor: roseColor,
        color: '#ffffff',
        borderRadius:"4px",
        "&:hover,&:focus":{
            background:roseColor,
            border:`1px solid ${lighten(roseColor,0.5)}`
        },
    },
    danger:{
        backgroundColor: dangerColor,
        color: '#ffffff',
        borderRadius:"4px",
        "&:hover,&:focus":{
            background:dangerColor,
            border:`1px solid ${lighten(dangerColor,0.5)}`
        },
    },
});

export default headerLinkStyle;