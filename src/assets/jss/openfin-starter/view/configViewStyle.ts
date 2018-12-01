import { Theme, createStyles } from '@material-ui/core/styles';

const configViewStyle:any = (theme:Theme)=> createStyles({
    root:{
        width:'100%',
        height:'100%',
    },
    topInputContainer:{
        padding:'0px 30px 0px 30px',
    },
    configContainer:{
        height:'calc( 100% - 39px )',
        '& .splitter-layout':{
            height:'calc( 100% - 39px )',
            right:'4px',
        }
    },
    configLeftSection:{
        height:'100%',
        padding:'0px 4px 50px 12px',
    },
    configMainSection:{
        padding:'4px 12px 100px 2px',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-around',
        backgroundColor:theme.palette.background.paper,
    },
    configMainGridList:{
        width:'100%',
    },
});

export default configViewStyle;