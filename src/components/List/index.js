import React, { useContext, useEffect} from 'react';
import AppContext from '../../context';
import './index.css';

function getSrc(p){
  return p.images[0] ? p.images[0].url : 'http://placekitten.com/200/200'
}

function renderPlaylist(p){
 return (
  <div className="playlist" key={p.id}>
      <img className="thumb" loading="lazy" src={ getSrc(p) } alt={null} />
      
      <div className="content">
        <h3 className="title">{ p.name }</h3>
        <p>{ p.description }</p>
      </div>
  </div>
 )
}

function List() {

  const Context = useContext(AppContext)

  return (
    <div className="list-component">
        {
          Context.state.playlists &&
          Context.state.playlists.items && 
          Context.state.playlists.items.map(renderPlaylist)
        }
    </div>
  );
}

export default List;
