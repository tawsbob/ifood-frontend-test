import React from 'react';
import Filter from '../../components/Filter'
import List from '../../components/List'
import LogoutButton from '../../components/LogoutButton'
import './index.css';

function Home() {

  return (
    <div className="home-container wrapper">
        <h1>Bem vindo ao App de playlists mais insano do mundo!</h1>
        <Filter />
        <List />
        <LogoutButton />
    </div>
  );
}

export default Home;
