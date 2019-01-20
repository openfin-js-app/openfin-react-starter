import { Theme, createStyles } from '@material-ui/core/styles';
import {
    appbarHeight,
    defaultFont,
    dangerColor,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    roseColor,
    defaultBoxShadow,
} from '../../openfin-starter-constant';

const headerLinkStyle:any = (theme:Theme) => createStyles({
    menuBtn:{
        transform:`scale(${appbarHeight/40 * 0.8})`,
        "-webkit-app-region":"no-drag",
        "& span svg":{
            fontSize: `${appbarHeight/26*36}px`,
        }
    },
    info:{
        backgroundColor: infoColor,
        color: '#ffffff',
        ...defaultBoxShadow,
        borderRadius:"4px",
    },
    success:{
        backgroundColor: successColor,
        color: '#ffffff',
        ...defaultBoxShadow,
        borderRadius:"4px",
    },
    warning:{
        backgroundColor: warningColor,
        color: '#ffffff',
        ...defaultBoxShadow,
        borderRadius:"4px",
    },
    rose:{
        backgroundColor: roseColor,
        color: '#ffffff',
        ...defaultBoxShadow,
        borderRadius:"4px",
    },
    danger:{
        backgroundColor: dangerColor,
        color: '#ffffff',
        ...defaultBoxShadow,
        borderRadius:"4px",
    },
});

export default headerLinkStyle;