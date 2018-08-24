import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BackupIcon from '@material-ui/icons/Backup';
import BugReportIcon from '@material-ui/icons/BugReport';
import LanguageIcon from '@material-ui/icons/Language';
import ReportIcon from '@material-ui/icons/Report';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CropDinIcon from '@material-ui/icons/CropDin';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

const appLogo = require('../../assets/svg/app.svg') as string;
const companyLogo = require('../../assets/svg/company.svg') as string;
const svgNumberOne = require('../../assets/svg/other/number-1.svg') as string;
const svgNumberTwo = require('../../assets/svg/other/number-2.svg') as string;
const googleSearch = require('../../assets/svg/other/google-search.svg') as string;

export interface LaunchBarItemType {
    icon:any,
    disabled:boolean,
    svg:string,
    appJson:any,
}

export const sampleItems:LaunchBarItemType[]=[
    {
        icon:AccessibilityIcon,
        disabled:false,
        svg:null,
        appJson:{
            name:'openfin-react-starter-child-accessibility',
            url:'/childWindow/accessibility',
            defaultWidth:320,
            defaultHeight:320,
            defaultTop:10,
            defaultLeft:300,
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            callback:(window:any)=>{
                console.log('onOpenNewSelf::callback', window);
            }
        },
    },
    {
        icon:null,
        disabled:false,
        svg:svgNumberOne,
        appJson:{
            name:'openfin-react-starter-child-view-one',
            url:'/childWindow/view-one',
            defaultWidth:320,
            defaultHeight:320,
            defaultTop:10,
            defaultLeft:300,
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            callback:(window:any)=>{
                console.log('onOpenNewSelf::callback', window);
            }
        },
    },
    {
        icon:null,
        disabled:false,
        svg:svgNumberTwo,
        appJson:{
            name:'openfin-react-starter-child-view-two',
            url:'/childWindow/view-two',
            defaultWidth:320,
            defaultHeight:320,
            defaultTop:10,
            defaultLeft:300,
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            callback:(window:any)=>{
                console.log('onOpenNewSelf::callback', window);
            }
        },
    },
    {
        icon:ReportIcon,
        disabled:false,
        svg:null,
        appJson:{
            name:'openfin-react-starter-child-report',
            url:'/childWindow/report',
            defaultWidth:320,
            defaultHeight:320,
            defaultTop:10,
            defaultLeft:300,
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            callback:(window:any)=>{
                console.log('onOpenNewSelf::callback', window);
            }
        },
    },
    {
        icon:null,
        disabled:false,
        svg:googleSearch,
        appJson:{
            name:'openfin-react-starter-child-google',
            url:'https://www.google.com/',
            defaultWidth:320,
            defaultHeight:320,
            defaultTop:10,
            defaultLeft:300,
            frame:true,
            resizable:true,
            state:'normal',
            autoShow:true,
            callback:(window:any)=>{
                console.log('onOpenNewSelf::callback', window);
            }
        },
    },
];

export const disabledItems:LaunchBarItemType[]=[
    {
        icon:AccountBoxIcon,
        disabled:true,
        svg:null,
        appJson:{},
    },
    {
        icon:BookmarkIcon,
        disabled:true,
        svg:null,
        appJson:{},
    },
    {
        icon:BackupIcon,
        disabled:true,
        svg:null,
        appJson:{},
    },
    {
        icon:BugReportIcon,
        disabled:true,
        svg:null,
        appJson:{},
    },
    {
        icon:LanguageIcon,
        disabled:true,
        svg:null,
        appJson:{},
    },
];

export const launchBarItems = [
    ...sampleItems,
    ...disabledItems,
];