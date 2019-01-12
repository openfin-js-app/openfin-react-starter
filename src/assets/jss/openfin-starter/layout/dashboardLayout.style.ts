import { Theme, createStyles } from '@material-ui/core/styles';

import {
    windowBorder,
    primaryColor, infoColor, warningColor, dangerColor, successColor,
    drawerWidth, appbarHeight,
} from '../../openfin-starter-constant';

const appStyle:any = (theme:Theme) => createStyles({
    wrapper:{
        position:"relative",
        top:"0",
        height: "100%",
    },
    wrapperPrimary:{
        borderTop: `${windowBorder}px solid ${primaryColor}`,
        borderLeft: `${windowBorder}px solid ${primaryColor}`,
        borderRight: `${windowBorder}px solid ${primaryColor}`,
        borderBottom: `${windowBorder}px solid ${primaryColor}`,
    },
    wrapperInfo:{
        borderTop: `${windowBorder}px solid ${infoColor}`,
        borderLeft: `${windowBorder}px solid ${infoColor}`,
        borderRight: `${windowBorder}px solid ${infoColor}`,
        borderBottom: `${windowBorder}px solid ${infoColor}`,
    },
    wrapperWarning:{
        borderTop: `${windowBorder}px solid ${warningColor}`,
        borderLeft: `${windowBorder}px solid ${warningColor}`,
        borderRight: `${windowBorder}px solid ${warningColor}`,
        borderBottom: `${windowBorder}px solid ${warningColor}`,
    },
    wrapperDanger:{
        borderTop: `${windowBorder}px solid ${dangerColor}`,
        borderLeft: `${windowBorder}px solid ${dangerColor}`,
        borderRight: `${windowBorder}px solid ${dangerColor}`,
        borderBottom: `${windowBorder}px solid ${dangerColor}`,
    },
    wrapperSuccess:{
        borderTop: `${windowBorder}px solid ${successColor}`,
        borderLeft: `${windowBorder}px solid ${successColor}`,
        borderRight: `${windowBorder}px solid ${successColor}`,
        borderBottom: `${windowBorder}px solid ${successColor}`,
    },

    mainPanel:{
        overflow:'auto',
        position:"relative",
        float:"right",
        height:"100%",
        width:`calc(100% - ${drawerWidth}px)`,
        overflowScrolling:'touch',
    },
    mainPanelShift:{
        width:`calc(100%)`,
        transition:theme.transitions.create('width',{
            easing:theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    content:{
        position:'relative',
        marginTop:"0px",
        padding:`0px ${windowBorder}px`,
        height:"100%",
        overflowX:'hidden',
    },
    container:{
        position:'absolute',
        top:appbarHeight,
        left:"0px",
        right:"0px",
        bottom:"0px",
    },
    snackbarCloseBtn:{
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

export default appStyle;