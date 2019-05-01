import { Theme, createStyles } from '@material-ui/core/styles';

const clientLaunchFirstAppBarCompStyle = (theme:Theme)=> createStyles({
    outmostContainer:{
        width:'100%',
        height:'100%',
        position:'relative',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    appLogoImg:{
        width:35,
        height:35,
    },
    testBtn:{
        position:'absolute',
        right:1,
        bottom:1,
        "-webkit-app-region":"no-drag",
    }
});

export default clientLaunchFirstAppBarCompStyle;
