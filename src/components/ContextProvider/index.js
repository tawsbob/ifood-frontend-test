import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { axios, getMe, objectToQueryString, apiClient, clearSection, getSession } from '../../helpers'
import AppContext from '../../context'

var scopes = 'user-read-private user-read-email'

function ContextProvider({ children }) {
  //tudo que vamos usar
  let history = useHistory()

  const [me, setMe] = useState(getMe())
  const [loadingMe, setLoadingMe] = useState(false)
  const [session, setSession] = useState(getSession())
  const [state, setPlaylistState] = useState({ loading: false, playlists: null, filteredLists: null, filters: null, focusedList: null })
  const [filters, setFilters] = useState({})
  const [filtersConfigs, setFiltersConfigs] = useState(null)
  const [loadingFiltersConfig, setLoadingFiltersConfig] = useState(false)

  const setState = useCallback((newState)=>(setPlaylistState({ ...state, ...newState  })), [state])

  const filterListByName = (e)=>{
    const { value } = e.target
    if(value){
      const term = value.toLowerCase()
      const filteredLists = state.playlists.items.filter((p)=>( p.name.toLowerCase().indexOf(term) > -1 ))
      setState({ filteredLists })
    } else {
      setState({ filteredLists: null })
    }
  }

  const logout = useCallback(() => {
    //limpa do localstorage
    clearSection()
    //atualiza o estado
    setSession(null)
    //fé em deus que ele é justo irmão nunca se esqueça
    history.push('/login')
  }, [history])

  const fetchMe = useCallback(() => {
    console.log('fetchMe')
    setLoadingMe(true)
    apiClient({ session, setSession, logout })
      .get('/me')
      .then(({ data }) => {
        if (data) {
          setMe(data)
          setLoadingMe(false)
        }
      })
  }, [logout, session])

  const fetchFilterConfigs = useCallback(()=>{
    setLoadingFiltersConfig(true)
      axios
        .get('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
        .then(({ data })=>{
          if(data && data.filters){
            setFiltersConfigs(data.filters)
            setLoadingFiltersConfig(false) 
          }
        })
  },[])

  //Login no estilo redirect
  function login() {
    const { REACT_APP_HOST, REACT_APP_SPOTIFY_APP_ID } = process.env
    const loginUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${REACT_APP_SPOTIFY_APP_ID}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(REACT_APP_HOST)}`
    window.location.href = loginUrl
  }

  
  const fetchLists = useCallback(() => {
    console.log('fetchLists')
    const url = `/browse/featured-playlists${objectToQueryString(filters)}`

    setState({ loading: true })
    apiClient({ session, setSession, logout })
      .get(url)
      .then(({ data }) => {
        if (data) {
          const { limit, offset } = data.playlists
          setState({ loading: false, playlists: data.playlists })
          setFilters({ limit, offset })
        }
      })
  }, [filters, logout, session, setState])


  const paginate = ()=>{

    console.log('state loading', state.loading)

    if(!state.loading){
      
      const { items, limit } = state.playlists
      const offset = items.length
      //const paginteParams = { offset, limit }
      
     /* setFilters(paginteParams)*/
      setState({ loading:true })
      console.log('paginate')
    }
  }

  useEffect(() => {
    if (!me && !loadingMe) {
      fetchMe()
    }

    if(!filtersConfigs && !loadingFiltersConfig){
      console.log('passou no if')
      fetchFilterConfigs()
    }

    if (!state.loading && !state.playlists && session) {
      fetchLists()
    }
  }, [fetchFilterConfigs, fetchLists, fetchMe, filtersConfigs, loadingMe, loadingFiltersConfig, me, session, state.loading, state.playlists])

  console.log(state, filters)

  return (
    <AppContext.Provider
      value={{ me, state, filters, setFilters, filtersConfigs, session, setSession, logout, login, setState, fetchLists, paginate, filterListByName }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
