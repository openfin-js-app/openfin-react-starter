import {
    appbarHeight,
    defaultFont,
    dangerColor,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    defaultBoxShadow,
} from '../../openfin-starter-constant';

const headerLinkStyle:any = (theme:any) => ({
    menuBtn:{
        transform:`scale(${appbarHeight/40 * 0.8})`,
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
    danger:{
        backgroundColor: dangerColor,
        color: '#ffffff',
        ...defaultBoxShadow,
        borderRadius:"4px",
    },
});

export default headerLinkStyle;