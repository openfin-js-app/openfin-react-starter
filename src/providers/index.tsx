import * as React from 'react';

import ClientCtxProvider from './ClientCtxProvider'

const CtxProviders:React.FunctionComponent<{}> = (
    {
        children
    }
)=>{
    return (<ClientCtxProvider>
        {children}
    </ClientCtxProvider>)
}

export default CtxProviders;