import { Theme, createStyles } from '@material-ui/core/styles';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

import {
    primaryColor, warningColor, successColor, infoColor, roseColor,
    greyColor, dangerColor,
} from '../../openfin-starter-constant';

const launchBtnHeight = 64;
const launchBtnContainerMaxWidth = 576;

const launchBarStyle:any = (theme:Theme) => createStyles({
    toolBar:{
        height:64,
        padding:'0 0',
    },
    appLogoImg:{
        width:40,
        height:40,
        margin:12,
        "-webkit-user-select":"none",
        "-webkit-app-region":"drag",
    },
    undockCtrlBtn:{
        position:'absolute',
        top:2,
        left: launchBtnHeight-18,
    },
    buttonContainer:{
        maxWidth:`${launchBtnContainerMaxWidth}px`,
        whiteSpace:'nowrap',
        height:`${launchBtnHeight}px`,
        background: darken(primaryColor, 0.2),
    },
    buttonContainerCollapse:{
        width:'0px !important',
    },
    baseButton:{
        color:'white',
        borderRadius:'0%',
        height:launchBtnHeight,
        width:launchBtnHeight,
        "&:hover":{
            background: darken(primaryColor, 0.4),
        },
        '& $svg':{
            fontSize:'50px',
        },
    },
    svgButton:{
        borderRadius:'0%',
        height:launchBtnHeight,
        width:launchBtnHeight,
        "&:hover":{
            background: darken(primaryColor, 0.4),
        },
        '& $img':{
            height:36,
            width:36,
        },
    },
    controlPanelContainer:{
        margin:'0 4px',
        display:'flex',
        flexDirection:'column',
    },
    controlBtn:{
        width:16,
        height:16,
        minHeight:16,
        borderRadius:4,
        '& $svg':{
            width:16,
            height:16,
        }
    },
    controlBtnPrimary:{
        color: '#ffffff',
        backgroundColor: primaryColor,
        "&:hover,&:focus":{
            background:primaryColor,
            border:`1px solid ${lighten(primaryColor,0.5)}`
        },
    },
    controlBtnWarning:{
        color: '#ffffff',
        backgroundColor: warningColor,
        "&:hover,&:focus":{
            background:warningColor,
            border:`1px solid ${lighten(warningColor,0.5)}`
        },
    },
    controlBtnSuccess:{
        color: '#ffffff',
        backgroundColor: successColor,
        "&:hover,&:focus":{
            background:successColor,
            border:`1px solid ${lighten(successColor,0.5)}`
        },
    },
    controlBtnInfo:{
        color: '#ffffff',
        backgroundColor: infoColor,
        "&:hover,&:focus":{
            background:infoColor,
            border:`1px solid ${lighten(infoColor,0.5)}`
        },
    },
    controlBtnRose:{
        color: '#ffffff',
        backgroundColor: roseColor,
        "&:hover,&:focus":{
            background:roseColor,
            border:`1px solid ${lighten(roseColor,0.5)}`
        },
    },
    controlBtnGrey:{
        color: '#ffffff',
        backgroundColor: greyColor,
        "&:hover,&:focus":{
            background:greyColor,
            border:`1px solid ${lighten(greyColor,0.5)}`
        },
    },
    controlBtnDanger:{
        color: '#ffffff',
        backgroundColor: dangerColor,
        "&:hover,&:focus":{
            background:dangerColor,
            border:`1px solid ${lighten(dangerColor,0.5)}`
        },
    },
});

export default launchBarStyle;