import * as React from 'react';

import { Omit } from 'react-openfin/utils/typeHelper';

import { IClientState } from './types'

export interface IWithClientActions{
    updateClientCount:(count:number)=>void
}

export interface IWithClient {
    state:IClientState,
    actions:IWithClientActions,
}

export const ClientContext = React.createContext<Partial<IWithClient>|null>(null);

const { Provider, Consumer } = ClientContext;

interface IWithClientContext {
    clientContext?:Partial<IWithClient>
}

export type WithClientContext = IWithClientContext;

export const ClientContextProvider = Provider;
export const ClientContextConsumer = Consumer;


export const withClientContext:<
    P extends WithClientContext
    >(Component: React.ComponentType<P>)=>React.FunctionComponent<Omit<P,WithClientContext>> =

    <P extends WithClientContext>(Component: React.ComponentType<P>)=> {
        return function ComponentWithConfig(props:Omit<P,WithClientContext>){
            return (
                <ClientContextConsumer>
                    {value =>
                        // @ts-ignore
                        (<Component {...props} clientContext={value}/>)}
                </ClientContextConsumer>
            );}
    };
