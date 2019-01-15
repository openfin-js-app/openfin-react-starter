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
        height: "100vh",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
    },
    wrapperPrimary:{
        borderTop: `${windowBorder}px solid ${primaryColor}`,
    },
    wrapperInfo:{
        borderTop: `${windowBorder}px solid ${infoColor}`,
    },
    wrapperWarning:{
        borderTop: `${windowBorder}px solid ${warningColor}`,
    },
    wrapperDanger:{
        borderTop: `${windowBorder}px solid ${dangerColor}`,
    },
    wrapperSuccess:{
        borderTop: `${windowBorder}px solid ${successColor}`,
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