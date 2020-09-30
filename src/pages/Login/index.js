import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { setLocalJson, getToken } from '../../helpers'
import './index.css';

var scopes = 'user-read-private user-read-email';

function Login() {
    
    let history = useHistory();

    function logar() {
        const { REACT_APP_HOST, REACT_APP_SPOTIFY_APP_ID } = process.env
        const loginUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${REACT_APP_SPOTIFY_APP_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REACT_APP_HOST)}`
        window.location.href = loginUrl;
    }

    useEffect(() => {
        if( /code=(.+)/.test(window.location.search)){
            const code = window.location.search.replace('?code=', '')
            if(code){

                getToken(code)
                    .then((response)=>{
                        setLocalJson({ key: 'section', data: { code, ...response.data } })
                        history.push('/')
                    })
                    .catch((e)=>{
                        console.error(e)
                        alert('Algo deu errado, tente novamente')
                    })
                //history.push('/')
            }
        }
      });

  return (
    <div className="login-container">
        <h1>Login</h1>
        <p>Faça o login para ter acesso as playlists mais sinistras do mundo</p>
        <button className="button primary" onClick={logar}>Quero ouvir as melhores músicas</button>
    </div>
  );
}

export default Login;
