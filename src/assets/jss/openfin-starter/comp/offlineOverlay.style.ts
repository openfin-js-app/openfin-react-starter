import { Theme, createStyles } from '@material-ui/core/styles';

const offlineOverlayStyle = (theme:Theme)=> createStyles({

    outmostContainer:{
        zIndex: 1200,
        position:'absolute',
        top: '4px',
        left: '4px',
        right: '4px',
        bottom: '8px',
        width:'calc(100% - 8px)',
        height:'calc(100% - 4px)',
        backgroundColor:'rgba(0,0,0,0.9)',

        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',

    },
    oneRow:{
        marginBottom:'20px',
    },
    bannerImg:{
        width:'150px',
        height:'150px',
    },
    controlBtnContainer:{
        display:'flex',
        justifyContent:'space-around',
    },
    button: {
        margin: theme.spacing.unit,
    },

});

export default offlineOverlayStyle;