import { Theme, createStyles } from '@material-ui/core/styles';

const configThemeFieldCompStyle = (theme:Theme)=> createStyles({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'center',
    },
    themeSpan:{
        position:'relative',
        top: 4,
    }
});

export default configThemeFieldCompStyle;
