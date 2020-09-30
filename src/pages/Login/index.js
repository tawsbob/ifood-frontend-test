import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { setLocalJson, getToken } from '../../helpers'
import AppContext from '../../context';
import './index.css';

function Login() {
    
    const Context = useContext(AppContext)
    let history = useHistory();

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
            }
        }
      });

  return (
    <div className="login-container">
        <h1>Login</h1>
        <p>Faça o login para ter acesso as playlists mais sinistras do mundo</p>
        <button className="button primary" onClick={Context.login}>Quero ouvir as melhores músicas</button>
    </div>
  );
}

export default Login;
