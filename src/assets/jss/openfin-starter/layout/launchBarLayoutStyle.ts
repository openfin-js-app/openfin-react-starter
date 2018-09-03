import color from 'color';

import {
    primaryColor, warningColor, successColor, infoColor, roseColor,
    greyColor, dangerColor,
} from '../../openfin-starter-constant';

const launchBtnHeight = '64';
const launchBtnContainerMaxWidth = '576';

const launchBarStyle:any = (theme:any) => ({
    toolBar:{
        height:'64px',
        padding:'0 0',
    },
    appLogoImg:{
        width:'40px',
        height:'40px',
        margin:'12px',
        "-webkit-user-select":"none",
        "-webkit-app-region":"drag",
    },
    buttonContainer:{
        maxWidth:`${launchBtnContainerMaxWidth}px`,
        whiteSpace:'nowrap',
        height:`${launchBtnHeight}px`,
        background: color(primaryColor).darken(0.2).hex(),
    },
    buttonContainerCollapse:{
        width:'0px !important',
    },
    baseButton:{
        color:'white',
        borderRadius:'0%',
        height:`${launchBtnHeight}px`,
        width:`${launchBtnHeight}px`,
        '& $svg':{
            fontSize:'50px',
        },
    },
    svgButton:{
        borderRadius:'0%',
        height:`${launchBtnHeight}px`,
        width:`${launchBtnHeight}px`,
        '& $img':{
            height:'36px',
            width:'36px',
        },
    },
    controlPanelContainer:{
        margin:'0 4px',
        display:'flex',
        flexDirection:'column',
    },
    controlBtn:{
        width:'16px',
        height:'16px',
        minHeight:'16px',
        '& $svg':{
            width:'16px',
            height:'16px',
        }
    },
    controlBtnPrimary:{
        color:color(primaryColor).lighten(0.5).hex(),
        backgroundColor:color(primaryColor).lighten(0.1).hex(),
        "&:hover":{
            color: primaryColor,
        },
    },
    controlBtnWarning:{
        color:color(warningColor).lighten(0.5).hex(),
        backgroundColor:color(warningColor).lighten(0.1).hex(),
        "&:hover":{
            color: warningColor,
        },
    },
    controlBtnSuccess:{
        color:color(successColor).lighten(0.5).hex(),
        backgroundColor:color(successColor).lighten(0.1).hex(),
        "&:hover":{
            color: successColor,
        },
    },
    controlBtnInfo:{
        color:color(infoColor).lighten(0.5).hex(),
        backgroundColor:color(infoColor).lighten(0.1).hex(),
        "&:hover":{
            color: infoColor,
        },
    },
    controlBtnRose:{
        color:color(roseColor).lighten(0.5).hex(),
        backgroundColor:color(roseColor).lighten(0.1).hex(),
        "&:hover":{
            color: roseColor,
        },
    },
    controlBtnGrey:{
        color:color(greyColor).lighten(0.5).hex(),
        backgroundColor:color(greyColor).lighten(0.1).hex(),
        "&:hover":{
            color: greyColor,
        },
    },
    controlBtnDanger:{
        color:color(dangerColor).lighten(0.5).hex(),
        backgroundColor:color(dangerColor).lighten(0.1).hex(),
        "&:hover":{
            color: dangerColor,
        },
    },
});

export default launchBarStyle;