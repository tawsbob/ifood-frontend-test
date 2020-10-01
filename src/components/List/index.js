import React, { useContext, useEffect } from 'react'
import { getSrc } from '../../helpers'
import AppContext from '../../context'
import loading from './loading.svg'
import './index.css'

const emptyArray = []

function click(p) {
  return () => {
    if (p.external_urls.spotify) {
      window.open(p.external_urls.spotify)
    } else {
      alert('Vish mano, ta sem link esse aqui :/')
    }
  }
}

function renderPlaylist() {
  //onFocus={()=>{ context.setState({ focusedList: p }) }}
  return (p, index) => (
    <div className="playlist" key={p.id} tabIndex={index} role="button" onClick={click(p)}>
      <img className="thumb" loading="lazy" src={getSrc(p)} alt={p.name} />

      <div className="content">
        <h3 className="title">{p.name}</h3>
        <p>{p.description}</p>
      </div>
    </div>
  )
}

function List() {
  
  const Context = useContext(AppContext)

  /*const onScroll = useCallback((e)=>{
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const pageHeight = document.body.offsetHeight
    const windoHeight = window.innerHeight
    const tolerance = 100    
    if (pageHeight - scrollTop - tolerance <= windoHeight) {
      Context.paginate()
    }
  },[])*/

  useEffect(() => {
      console.log('add')
      //window.addEventListener('scroll', onScroll)
  }, [])

  
  const statePlaylist = Context.state.playlists ? Context.state.playlists.items : emptyArray
  const playlists = Context.state.filteredLists ? Context.state.filteredLists :  statePlaylist

  return (
    <div className="list-component">
      { Context.state.playlists &&
        playlists.map(renderPlaylist(Context))}
      {Context.state.loading && <img className="loading" src={loading} alt="carregando..." />}
    </div>
  )
}

export default List
