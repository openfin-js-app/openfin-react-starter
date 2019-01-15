import { Theme, createStyles } from '@material-ui/core/styles';

const configThemeViewStyle = (theme:Theme)=> createStyles({
    container:{
        width:'100%',
        display:'flex',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'flex-end',
    },
    switchComp:{
        position: 'relative',
        top: 14,
    }
});

export default configThemeViewStyle;
