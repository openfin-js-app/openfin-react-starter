import { Theme, createStyles } from '@material-ui/core/styles';

const notificationStyle = (theme:Theme)=> createStyles({

    container:{
        width: '100vw',
        height: '100vh',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        position:'relative',
    },
    closeBtn:{
        position:'absolute',
        top : theme.spacing.unit/2,
        right : theme.spacing.unit/2,
        zIndex:theme.zIndex.appBar+5,

    },

});

export default notificationStyle;
