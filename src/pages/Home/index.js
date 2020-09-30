import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { checkSession } from '../../helpers'
import Filter from '../../components/Filter'
import List from '../../components/List'
import LogoutButton from '../../components/LogoutButton'
import './index.css';

function Home() {

    let history = useHistory();

    useEffect(() => {
        if(!checkSession()){
            history.push('/login')
        }
      });
    
  return (
    <div className="home-container wrapper">
        <h1>Bem vindo ao app de listagem de playlists mais insano do mundo!</h1>
        <Filter />
        <List />
        <LogoutButton />
    </div>
  );
}

export default Home;
