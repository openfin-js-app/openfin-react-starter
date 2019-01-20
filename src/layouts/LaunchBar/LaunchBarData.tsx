import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BackupIcon from '@material-ui/icons/Backup';
import BugReportIcon from '@material-ui/icons/BugReport';
import LanguageIcon from '@material-ui/icons/Language';
import ReportIcon from '@material-ui/icons/Report';

import svgNumberOne from'../../assets/svg/other/number-1.svg';
import svgNumberTwo from'../../assets/svg/other/number-2.svg';
import googleSearch from'../../assets/svg/other/google-search.svg';

export interface IlaunchBarItemType {
    icon:any,
    disabled:boolean,
    svg:string,
    appJson:any,
}

export const sampleItems:IlaunchBarItemType[]=[
    {
        icon:AccessibilityIcon,
        disabled:false,
        svg:null,
        appJson:{
            name:'openfin-react-starter-child-accessibility',
            url:'/childWindow/accessibility',
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            minWidth:520,
            minHeight:170,
        },
    },
    {
        icon:null,
        disabled:false,
        svg:svgNumberOne,
        appJson:{
            name:'openfin-react-starter-child-view-one',
            url:'/childWindow/view-one',
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            minWidth:415,
            minHeight:100,
        },
    },
    {
        icon:null,
        disabled:false,
        svg:svgNumberTwo,
        appJson:{
            name:'openfin-react-starter-child-view-two',
            url:'/childWindow/view-two',
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            minWidth:415,
            minHeight:100,
        },
    },
    {
        icon:ReportIcon,
        disabled:false,
        svg:null,
        appJson:{
            name:'openfin-react-starter-child-report',
            url:'/childWindow/report',
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            minWidth:430,
            minHeight:100,
        },
    },
    {
        icon:null,
        disabled:false,
        svg:googleSearch,
        appJson:{
            name:'openfin-react-starter-child-google',
            url:'https://www.google.com/',
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

export const disabledItems:IlaunchBarItemType[]=[
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