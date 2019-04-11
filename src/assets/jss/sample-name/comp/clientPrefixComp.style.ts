import { Theme, createStyles } from '@material-ui/core/styles';

import { buttonStyle } from 'react-openfin-mat-impl/assets/jss';
import constant from 'react-openfin-mat-impl/assets/jss/openfin-starter-constant';

const clientPrefixCompStyle = (theme:Theme)=> createStyles({
    title:{
        ...constant.defaultFont,
        fontSize:"14px",
        borderRadius:"3px",
        textTransform:"none",
        color:"inherit",
        height:constant.appbarHeight,
        minHeight:constant.appbarHeight,
        marginLeft:constant.appbarHeight * 0.2,
        "&:hover,&:focus":{
            background:"transparent",
        }
    },
    success: {
        ...buttonStyle.success,
        marginLeft:constant.appbarHeight * 0.2,
        position:"relative",
        top: -constant.windowBorder/2,
        "-webkit-app-region":"no-drag",
    },
    warning: {
        ...buttonStyle.warning,
        marginLeft:constant.appbarHeight * 0.2,
        position:"relative",
        top: -constant.windowBorder/2,
        "-webkit-app-region":"no-drag",
    },
});

export default clientPrefixCompStyle;
