import React from 'react';
import Filter from '../../components/Filter'
import List from '../../components/List'
import Me from '../../components/Me'
import LogoutButton from '../../components/LogoutButton'
import Logo from '../../logo.svg'
import './index.css';

function Home() {

  return (
    <div className="home-container wrapper">
        <img className="logo" src={Logo} alt="Playlists Insanas" />
        <div className="side-elements">
          <Me />
          <LogoutButton />
        </div>
        <Filter />
        <List />
        
    </div>
  );
}

export default Home;
