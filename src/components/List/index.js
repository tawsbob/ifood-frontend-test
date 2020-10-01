import React, { useContext, useEffect, useState} from 'react';
import { getSrc } from '../../helpers'
import AppContext from '../../context';
import loading from './loading.svg'
import './index.css';

function click(p){
  return ()=>{
    if(p.external_urls.spotify){
      window.open(p.external_urls.spotify)
    } else {
      alert('Vish mano, ta sem link esse aqui :/')
    }
  }
}

function renderPlaylist(context){
  //onFocus={()=>{ context.setState({ focusedList: p }) }}
  return (p, index)=>(
    <div className="playlist" key={p.id}  tabIndex={index} role="button" onClick={click(p)} >
      <img className="thumb" loading="lazy" src={ getSrc(p) } alt={p.name} />
      
      <div className="content">
        <h3 className="title">{ p.name }</h3>
        <p>{ p.description }</p>
      </div>
  </div>
  )
}

function List() {

  const Context = useContext(AppContext)
  const [ eventIsSet, setEventFlag ] = useState(false)
  
  useEffect(() => {

    //vamo vê se o cara chegou no final da página :)
    function onScroll(e) {
     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
     const pageHeight = document.body.offsetHeight
     const windoHeight = window.innerHeight
     const tolerance = 100

    if((pageHeight -scrollTop ) - tolerance  <= windoHeight ){
        //Context.paginate()
      }
    }

    if(!eventIsSet && Context.state.playlists ){
      console.log('add')
      window.addEventListener('scroll', onScroll)
      setEventFlag(true)
    }
    

    /*return function removeScrollEvent() {
      console.log('remove')
      window.removeEventListener('scroll', onScroll)
    };*/
  }, [Context.filters, Context.state, Context.state.loading, eventIsSet]);

  return (
    <div className="list-component">
        {
          Context.state.playlists &&
          Context.state.playlists.items && 
          Context.state.playlists.items.map(renderPlaylist(Context))
        }
        {
          Context.state.loading && <img src={loading} alt="carregando..." />
        }
    </div>
  );
}

export default List;
