import { createContext } from 'react'
import { getSession } from '../helpers'

export default createContext({
  me: null,
  state: null,
  session: getSession(),
  login: () => null,
  logout: () => null,
  setState: () => {},
  setSession: () => {},
  getLists: () => {},
})
