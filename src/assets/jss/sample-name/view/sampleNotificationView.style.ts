import { Theme, createStyles } from '@material-ui/core/styles';

const sampleNotificationViewStyle = (theme:Theme)=> createStyles({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'center',
    },

    appImg:{
        width:50,
        height:50,
        marginRight: theme.spacing(2),
    }

});

export default sampleNotificationViewStyle;
