import React from 'react';
import { useHistory } from "react-router-dom";
import { clearSection } from '../../helpers'
import icon from './icon.svg';
import './index.css';

function LogoutButton() {

    let history = useHistory();

    function click(){
        clearSection()
        history.push('/login')
    }
    
  return (
    <button className="button-logout" onClick={click}>
        <img src={icon} alt="Logo" />
    </button>
  );
}

export default LogoutButton;
