import React, { useContext } from 'react';
import { getSrc } from '../../helpers';
import AppContext from '../../context';
import './index.css';

function Me() {
  
  const Context = useContext(AppContext)

  return (
    <div className="me-container">
        { Context.me && (<strong className="user-name">{ Context.me.display_name }</strong>) }
        { Context.me && (<img className="avatar" src={getSrc(Context.me)} alt={Context.me.display_name }/>) }
    </div>
  );
}

export default Me;
