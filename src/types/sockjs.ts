/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react';
import { Client, Frame, Message, Subscription } from 'stompjs';

export interface ISubscribeOptions {
  destination: string
  onMessage?: (message: Message) => any
  onSubscribed?: (subscription: Subscription) => void
  headers?: {}
}

export interface IConnectOptions {
  url: string
  debug?: boolean
  headers?: object
  onError?: (error: Frame | string) => any
  heartbeat?: {
    incoming: number
    outgoing: number
  }
  onConnected?: (client: Client, frame?: Frame) => any
}

export interface ISockJsContext {
  connect: (options: IConnectOptions) => void
  disconnect: () => void
  subscribe: (options: ISubscribeOptions) => void
  unsubscribe: (subscription?: Subscription) => void
}

export const SockJsContext = React.createContext<ISockJsContext>({} as ISockJsContext)