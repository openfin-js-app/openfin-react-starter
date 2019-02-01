import { Theme, createStyles } from '@material-ui/core/styles';

import { appbarHeight, windowBorder } from '../../openfin-starter-constant'

const switcherWidth = 14/34*appbarHeight;
const switcherHeight = appbarHeight;

const headerThemeSwitcherCompStyle = (theme:Theme)=> createStyles({

    switcher:{
        position:'relative',
        top: -windowBorder/2,
        width: switcherWidth,
        height: switcherHeight,
        backgroundSize:`${switcherWidth*2}px ${switcherHeight}px`,
        backgroundImage:`url(${process.env.PUBLIC_URL}/img/switcher.png)`,
        "-webkit-app-region":"no-drag",
    },

    active:{
        backgroundPosition:`-${switcherWidth}px 0px`
    }

});

export default headerThemeSwitcherCompStyle;
