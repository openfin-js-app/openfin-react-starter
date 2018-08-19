import {
    primaryColor, infoColor, warningColor, dangerColor, successColor,
    drawerWidth, appbarHeight, container,
} from '../../openfin-starter-constant';

const appStyle:any = (theme:any) => ({
    wrapper:{
        position:"relative",
        top:"0",
        height: "100%",
    },
    wrapperPrimary:{
        borderTop: `4px solid ${primaryColor}`,
        borderLeft: `4px solid ${primaryColor}`,
        borderRight: `4px solid ${primaryColor}`,
        borderBottom: `4px solid ${primaryColor}`,
    },
    wrapperInfo:{
        borderTop: `4px solid ${infoColor}`,
        borderLeft: `4px solid ${infoColor}`,
        borderRight: `4px solid ${infoColor}`,
        borderBottom: `4px solid ${infoColor}`,
    },
    wrapperWarning:{
        borderTop: `4px solid ${warningColor}`,
        borderLeft: `4px solid ${warningColor}`,
        borderRight: `4px solid ${warningColor}`,
        borderBottom: `4px solid ${warningColor}`,
    },
    wrapperDanger:{
        borderTop: `4px solid ${dangerColor}`,
        borderLeft: `4px solid ${dangerColor}`,
        borderRight: `4px solid ${dangerColor}`,
        borderBottom: `4px solid ${dangerColor}`,
    },
    wrapperSuccess:{
        borderTop: `4px solid ${successColor}`,
        borderLeft: `4px solid ${successColor}`,
        borderRight: `4px solid ${successColor}`,
        borderBottom: `4px solid ${successColor}`,
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
        top:appbarHeight,
        left:'0px',
        right:'0px',
        bottom:'0px',
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