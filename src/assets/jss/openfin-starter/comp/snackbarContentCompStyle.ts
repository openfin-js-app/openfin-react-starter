import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import {
    primaryColor, warningColor, dangerColor, successColor, infoColor,
} from '../../openfin-starter-constant';

const snackbarContent = (theme:any) =>({
    primary:{
        backgroundColor:primaryColor,
    },
    success:{
        backgroundColor:green[600],
    },
    error:{
        backgroundColor:theme.palette.error.dark,
    },
    info:{
        backgroundColor:theme.palette.primary,
    },
    warning:{
        backgroundColor:amber[700],
    },
    icon:{
        fontSize:20,
    },
    iconVariant:{
        opacity:0.9,
        marginRight: theme.spacing.unit,
    },
    message:{
        display:"flex",
        alignItems: 'center',
    },
});

export default snackbarContent;