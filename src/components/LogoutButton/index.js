import React, { useContext } from 'react';
import icon from './icon.svg';
import AppContext from '../../context';
import './index.css';

function LogoutButton() {
  
  const Context = useContext(AppContext)

  return (
    <button className="button-logout" title="logout" onClick={Context.logout}>
        <img src={icon} alt="Logo" />
    </button>
  );
}

export default LogoutButton;
