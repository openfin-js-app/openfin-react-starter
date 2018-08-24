import {
    appbarHeight,
    drawerWidth,
    transition,
    boxShadow,
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
} from '../../openfin-starter-constant';

const sidebarStyle:any = (theme:any) => ({
    drawerPaper:{
        border:"none",
        position:"fixed",
        top: appbarHeight +4,
        bottom:0,
        left:"0",
        zIndex: "1",
        ...boxShadow,
        width:drawerWidth,
        height:"100%",
        borderLeft:`4px solid ${primaryColor}`,
    },
    background:{
        position:"absolute",
        zIndex:"1",
        borderBottom:`4px solid ${primaryColor}`,
        height: "calc(100% - 13px)",
        width: "100%",
        display:"block",
        top:"0",
        left:"0",
        backgroundSize:"cover",
        backgroundPosition:"center center",
        "&:after":{
            position:"absolute",
            zIndex:"3",
            width: "100%",
            height:"100%",
            content:'""',
            display:"block",
            background:"#000",
            opacity:".8",
        }
    },
    list:{
        marginTop:"20px",
        paddingLeft:"0",
        paddingTop:"0",
        paddingBottom:"0",
        marginBottom:"0",
        listStyle:"none",
    },
    item:{
        position:"relative",
        display:"block",
        textDecoration:"none",
    },
    itemLink:{
        width:"auto",
        transaction:"all 300ms linear",
        margin:"2px 15px 0",
        borderRadius:"3px",
        position:"relative",
        display:"block",
        padding:"2px 15px",
        backgroundColor:"transparent",
        ...defaultFont,
    },
    itemIcon:{
        width:"24px",
        height:"30px",
        float:"left",
        marginRight:"15px",
        textAlign:"center",
        verticalAlign:"middle",
        color:"rgba(255,255,255,0.8)",
    },
    itemText:{
        ...defaultFont,
        margin:"0",
        lineHeight:"30px",
        fontSize:"14px",
        color:"#ffffff",
    },
    whiteFont:{
        color:"#ffffff",
    },
    releaseTypo:{
        zIndex:1250,
        padding:"2% 5%",
    },
    primary:{
        backgroundColor:primaryColor,
        ...primaryBoxShadow,
        "&:hover":{
            backgroundColor:primaryColor,
            ...primaryBoxShadow,
        }
    },
    blue: {
        backgroundColor: infoColor,
        boxShadow:
            "0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)",
        "&:hover": {
            backgroundColor: infoColor,
            boxShadow:
                "0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)"
        }
    },
    green: {
        backgroundColor: successColor,
        boxShadow:
            "0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2)",
        "&:hover": {
            backgroundColor: successColor,
            boxShadow:
                "0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2)"
        }
    },
    orange: {
        backgroundColor: warningColor,
        boxShadow:
            "0 12px 20px -10px rgba(255,152,0,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(255,152,0,.2)",
        "&:hover": {
            backgroundColor: warningColor,
            boxShadow:
                "0 12px 20px -10px rgba(255,152,0,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(255,152,0,.2)"
        }
    },
    red: {
        backgroundColor: dangerColor,
        boxShadow:
            "0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2)",
        "&:hover": {
            backgroundColor: dangerColor,
            boxShadow:
                "0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2)"
        }
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: drawerWidth,
        zIndex: "4",
        overflowScrolling: "touch"
    },
});

export default sidebarStyle;