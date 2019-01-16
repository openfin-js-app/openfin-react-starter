import { Theme, createStyles } from '@material-ui/core/styles';

const configFieldStyle:any = (theme:Theme)=>createStyles({
    subheadingField:{
        height:'100%',
        display:'flex',
        alignItems:'center'
    },
    numberField:{
        marginRight:'4px',
    }
});

export default configFieldStyle;