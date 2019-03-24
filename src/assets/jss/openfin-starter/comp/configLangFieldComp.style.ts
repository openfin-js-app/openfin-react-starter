import { Theme, createStyles } from '@material-ui/core/styles';

const configLangFieldCompStyle = (theme:Theme)=> createStyles({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'center',
    },
    flagImg:{
        height:24,
        marginRight: theme.spacing.unit*2
    }
});

export default configLangFieldCompStyle;
