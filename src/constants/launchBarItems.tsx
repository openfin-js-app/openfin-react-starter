import {ILaunchBarItem} from 'react-openfin';

import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BackupIcon from '@material-ui/icons/Backup';
import BugReportIcon from '@material-ui/icons/BugReport';
import LanguageIcon from '@material-ui/icons/Language';
import ReportIcon from '@material-ui/icons/Report';

import svgNumberOne from '../assets/svg/other/number-1.svg';
import svgNumberTwo from '../assets/svg/other/number-2.svg';
import googleSearch from '../assets/svg/other/google-search.svg';

export const sampleItems:ILaunchBarItem[]=[
    {
        icon:AccessibilityIcon,
        disabled:false,
        svg:null,
        appJson:{
            name:`${process.env.REACT_APP_FIN_UUID}-child-accessibility`,
            url:`${process.env.PUBLIC_URL}/childWindow/accessibility`,
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
            name:`${process.env.REACT_APP_FIN_UUID}-child-view-one`,
            url:`${process.env.PUBLIC_URL}/childWindow/view-one`,
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
            name:`${process.env.REACT_APP_FIN_UUID}-child-view-two`,
            url:`${process.env.PUBLIC_URL}/childWindow/view-two`,
            frame:false,
            resizable:true,
            state:'normal',
            autoShow:true,
            minWidth:415,
            minHeight:100,
        },
        // !!!README!!!
        // to hide a launch bar item like basing on entitlement,
        // set shown field to false or a cb returning false
        // shown:()=>{return false},
    },
    {
        icon:ReportIcon,
        disabled:false,
        svg:null,
        appJson:{
            name:`${process.env.REACT_APP_FIN_UUID}-child-report`,
            url:`${process.env.PUBLIC_URL}/childWindow/report`,
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
            name:`${process.env.REACT_APP_FIN_UUID}-child-google`,
            url:'https://www.google.com/',
            frame:true,
            resizable:true,
            state:'normal',
            autoShow:true,
        },
    },
];

export const disabledItems:ILaunchBarItem[]=[
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

export default launchBarItems;