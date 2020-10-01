import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { setLocalJson, getToken } from '../../helpers'
import AppContext from '../../context'
import Logo from '../../logo.svg'

import './index.css';

function Login() {
    
    const Context = useContext(AppContext)
    let history = useHistory();

    useEffect(() => {
        if( /code=(.+)/.test(window.location.search)){
            const code = window.location.search.replace('?code=', '')
            console.log(code)
            if(code){
                getToken({
                        grant_type: 'authorization_code',
                        code
                    })
                    .then((response)=>{

                        const data = { code, ...response.data }
                        //salva no localStorage e atualiza o context
                        setLocalJson({ key: 'section', data  })
                        Context.setSession(data)

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
        <img className="logo" src={Logo} alt="Playlists Insanas" />
        <h1 className="title">Login</h1>
        <p>Faça o login para ter acesso as playlists mais sinistras do mundo, não perca tempo!</p>
        <button className="button primary" onClick={Context.login}>Quero ouvir as melhores músicas</button>
    </div>
  );
}

export default Login;
