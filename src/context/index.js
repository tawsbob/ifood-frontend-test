import React, { createContext } from 'react';
import { getSession, getToken } from '../helpers';

export default createContext({
    session: getSession(),
    login: ()=>(null),
    logout: ()=>(null)
})