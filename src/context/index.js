import { createContext } from 'react';
import { getSession } from '../helpers';

export default createContext({
    state: null,
    session: getSession(),
    login: ()=>(null),
    logout: ()=>(null),
    setState: ()=>{},
    getLists: ()=>{}
})