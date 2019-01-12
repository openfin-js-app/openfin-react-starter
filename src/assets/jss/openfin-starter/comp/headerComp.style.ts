import { Theme, createStyles } from '@material-ui/core/styles';

import {
    appbarHeight,
    container,
    defaultFont,
    primaryColor,
    defaultBoxShadow,
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
        margin:"4px 4px 0px 4px",
        position:"absolute",
        width:"calc(100% - 8px)",
        paddingTop:"0px",
        zIndex:1029,
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
    flex:{
        flex:1,
        height:appbarHeight,
        minHeight:appbarHeight,
    },
    menuBtn:{
        marginRight:'4px',
        backgroundColor:"transparent",
        "-webkit-app-region":"no-drag",
        color:"inherit",
        height:appbarHeight,
        minHeight:appbarHeight,
        width:appbarHeight,
        boxShadow:"none",
        "&:hover,&:focus":{
            background:"transparent",
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
        color:"#ffffff",
        ...defaultBoxShadow,
    },
    info:{
        backgroundColor:infoColor,
        color:"#ffffff",
        ...defaultBoxShadow,
    },
    success:{
        backgroundColor:successColor,
        color:"#ffffff",
        ...defaultBoxShadow,
    },
    warning:{
        backgroundColor:warningColor,
        color:"#ffffff",
        ...defaultBoxShadow,
    },
    danger:{
        backgroundColor:dangerColor,
        color:"#ffffff",
        ...defaultBoxShadow,
    },
});

export default headerStyle;