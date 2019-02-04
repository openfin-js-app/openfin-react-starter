import * as React from 'react';
import { I18Language, IConfigRuntimeState } from './types';

interface IWithConfig {
    config:Partial<IConfigRuntimeState>,
    actions:Partial<{
        onToggleThemeField:()=>void,
        onUpdateLangField:(lang:I18Language)=>void,
    }>
}

interface IWithConfigContext {
    configContext?:Partial<IWithConfig>
}


const { Provider, Consumer } = React.createContext<Partial<IWithConfig>|null>(null);

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type WithConfigContext = IWithConfigContext;

export const ConfigContextProvider = Provider;
export const ConfigContextConsumer = Consumer;

export const withConfigContext:<
    P extends WithConfigContext
>(Component: React.ComponentType<P>)=>React.FunctionComponent<Omit<P,WithConfigContext>> =

    <P extends WithConfigContext>(Component: React.ComponentType<P>)=> {
        return function ComponentWithConfig(props:Omit<P,WithConfigContext>){
            return (
                <ConfigContextConsumer>
                    {value =>
                        // @ts-ignore
                        (<Component {...props} configContext={value}/>)}
                </ConfigContextConsumer>
            );}
};