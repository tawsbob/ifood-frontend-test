import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { apiClient, clearSection, getSession } from '../../helpers'
import AppContext from '../../context'

var scopes = 'user-read-private user-read-email';

function ContextProvider({ children }) {

    let history = useHistory();

    const [ session, setSession ] = useState( getSession() )
    const [ state, setState ] = useState({ loading: true, playlists: null })

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

    function getLists(){

        apiClient
            .get('/browse/featured-playlists')
            .then(({ data })=>{
                console.log(data)
                   setState({ loading: false, playlists: data.playlists })
            })
    }
    
    useEffect(()=>{
        getLists()
    }, [ state.loading ])

    console.log(state)

  return (
    <AppContext.Provider value={{ state, session, logout, login, setState, getLists }}>
         { children }
    </AppContext.Provider>
  );
}

export default ContextProvider;
