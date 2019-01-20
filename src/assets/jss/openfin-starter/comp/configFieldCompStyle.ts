import { Theme, createStyles } from '@material-ui/core/styles';

const configFieldStyle:any = (theme:Theme)=>createStyles({
    subheadingField:{
        marginTop:'1.5rem',
    },
    numberField:{
        marginRight:'4px',
    }
});

export default configFieldStyle;