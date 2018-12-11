import { Theme, createStyles } from '@material-ui/core/styles';

const configAboutFieldStyle = (theme:Theme)=>createStyles({
    outmostContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:'40px 5px',
        "& h1, & h2, & h3, & h4":{
            marginBottom:'20px',
        },
        "& div, & h5, & h6":{
            marginBottom:'10px',
        }
    },
    imgContainer:{
        position:'relative',
        width:'140px',
        height:'140px',
    },
    appImg:{
        position:'absolute',
        top:'20px',
        left:'20px',
        width:'100px',
        height:'100px',
    },
    companyImg:{
        position:'absolute',
        right:'10px',
        bottom:'10px',
        width:'30px',
        height:'30px',
    },
    btnContainer:{
        width:'160px',
        display:'flex',
        flexWrap:'nowrap',
        justifyContent:'space-around',
    }
})

export default configAboutFieldStyle;