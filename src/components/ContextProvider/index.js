import React, { useState, useContext, Children } from 'react';
import { useHistory } from "react-router-dom";
import { clearSection, getSession } from '../../helpers'
import AppContext from '../../context'

var scopes = 'user-read-private user-read-email';

function ContextProvider({ children }) {

    const [ session, setSession ] = useState( getSession() )

    let history = useHistory();

    function login() {
        const { REACT_APP_HOST, REACT_APP_SPOTIFY_APP_ID } = process.env
        const loginUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${REACT_APP_SPOTIFY_APP_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REACT_APP_HOST)}`
        window.location.href = loginUrl;
    }

    function logout(){
        clearSection()
        setSession(null)
        history.push('/login')
    }
    
  return (
    <AppContext.Provider value={{ session, logout, login }}>
         { children }
    </AppContext.Provider>
  );
}

export default ContextProvider;
