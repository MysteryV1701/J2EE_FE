import { useContext } from 'react'
import { SockJsContext } from '@/types/sockjs'

export const useSockJs = () => {
  return useContext(SockJsContext)
}