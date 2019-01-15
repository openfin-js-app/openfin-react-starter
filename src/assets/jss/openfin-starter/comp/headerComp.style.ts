import { Theme, createStyles } from '@material-ui/core/styles';

import {
    windowBorder,
    appbarHeight,
    container,
    defaultFont,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
} from '../../openfin-starter-constant';

const headerStyle:any = (theme:Theme) =>createStyles({
    appBar:{
        backgroundColor:"transparent",
        boxShadow:"none",
        borderBottom: "0",
        margin:`${windowBorder}px 0px 0px 0px`,
        position:"absolute",
        width:'100%',
        paddingTop:0,
        zIndex:theme.zIndex.appBar+5,
        color:"#555555",
        border:"0",
        borderRadius:"0px",
        padding:"0 0",
        transition:"all 150ms ease 0s",
        minHeight:appbarHeight,
        display:"block",
        "-webkit-user-select":"none",
        "-webkit-app-region":"drag",
    },
    container:{
        ...container,
        height:appbarHeight,
        minHeight:appbarHeight,
    },
    preFlex:{
        position:'relative',
        top: -windowBorder/2,
        height:appbarHeight,
        minHeight:appbarHeight,
    },
    flex:{
        flex:1,
        height:appbarHeight,
        minHeight:appbarHeight,
    },
    postFlex:{
        position:'relative',
        top: -windowBorder/2,
        height:appbarHeight,
        minHeight:appbarHeight,
    },
    menuBtn:{
        marginRight:windowBorder,
        backgroundColor:"transparent",
        "-webkit-app-region":"no-drag",
        color:"inherit",
        width:appbarHeight,
        height:appbarHeight,
        minHeight:appbarHeight,
        boxShadow:"none",
        "&:hover,&:focus":{
            background:"transparent",
        },
        "& span svg":{
            width:appbarHeight,
            height:appbarHeight,
        }
    },
    companyLogImg:{
        position:"absolute",
        top:appbarHeight * 0.1,
        height: appbarHeight * 0.8,
        "-webkit-app-region":"no-drag",
    },
    title:{
        ...defaultFont,
        fontSize:"14px",
        borderRadius:"3px",
        textTransform:"none",
        color:"inherit",
        height:appbarHeight,
        minHeight:appbarHeight,
        marginLeft:appbarHeight * 0.5,
        "&:hover,&:focus":{
            background:"transparent",
        }
    },
    primary:{
        backgroundColor:primaryColor,
        borderLeft: `${windowBorder}px solid ${primaryColor}`,
        borderRight: `${windowBorder}px solid ${primaryColor}`,
        color:"#ffffff",
    },
    info:{
        backgroundColor:infoColor,
        borderLeft: `${windowBorder}px solid ${infoColor}`,
        borderRight: `${windowBorder}px solid ${infoColor}`,
        color:"#ffffff",
    },
    success:{
        backgroundColor:successColor,
        borderLeft: `${windowBorder}px solid ${successColor}`,
        borderRight: `${windowBorder}px solid ${successColor}`,
        color:"#ffffff",
    },
    warning:{
        backgroundColor:warningColor,
        borderLeft: `${windowBorder}px solid ${warningColor}`,
        borderRight: `${windowBorder}px solid ${warningColor}`,
        color:"#ffffff",
    },
    danger:{
        backgroundColor:dangerColor,
        borderLeft: `${windowBorder}px solid ${dangerColor}`,
        borderRight: `${windowBorder}px solid ${dangerColor}`,
        color:"#ffffff",
    },
});

export default headerStyle;