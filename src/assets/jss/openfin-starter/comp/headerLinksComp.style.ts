import { Theme, createStyles } from '@material-ui/core/styles';
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

const headerLinkStyle:any = (theme:Theme) => createStyles({
    menuBtn:{
        width:appbarHeight * 0.9,
        height:appbarHeight * 0.9,
        minHeight:appbarHeight * 0.9,
        marginRight: appbarHeight * 0.5,
        "-webkit-app-region":"no-drag",
        "& span svg":{
            width:appbarHeight * 0.85,
            height:appbarHeight * 0.85,
        }
    },
    info:{
        backgroundColor: infoColor,
        color: '#ffffff',
        borderRadius:"4px",
    },
    success:{
        backgroundColor: successColor,
        color: '#ffffff',
        borderRadius:"4px",
    },
    warning:{
        backgroundColor: warningColor,
        color: '#ffffff',
        borderRadius:"4px",
    },
    rose:{
        backgroundColor: roseColor,
        color: '#ffffff',
        borderRadius:"4px",
    },
    danger:{
        backgroundColor: dangerColor,
        color: '#ffffff',
        borderRadius:"4px",
    },
});

export default headerLinkStyle;