import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { axios, getMe, objectToQueryString, apiClient, clearSection, getSession } from '../../helpers'
import AppContext from '../../context'

var scopes = 'user-read-private user-read-email'

function ContextProvider({ children }) {
  //tudo que vamos usar
  let history = useHistory()
  let location = useLocation()

  const [me, setMe] = useState(getMe())
  const [loadingMe, setLoadingMe] = useState(false)
  const [session, setSession] = useState(getSession())
  const [state, setPlaylistState] = useState({
    loading: false,
    playlists: null,
    filters: {},
    filteredLists: null,
    focusedList: null,
  })
  const [filters, setFilters] = useState({ limit: 4, offset: 0 })
  const [filtersConfigs, setFiltersConfigs] = useState(null)
  const [loadingFiltersConfig, setLoadingFiltersConfig] = useState(false)

  const setFilter = (newState) => setFilters({ ...filters, ...newState })
  const setState = useCallback((newState) => setPlaylistState({ ...state, ...newState }), [state])

  const filterListByName = (e) => {
    const { value } = e.target
    if (value) {
      const term = value.toLowerCase()
      const filteredLists = state.playlists.items.filter((p) => p.name.toLowerCase().indexOf(term) > -1)
      setState({ filteredLists })
    } else {
      setState({ filteredLists: null })
    }
  }

  const changeFilter = ({ id, value }) => {
    console.log({ [id]: value })
    setFilter({ [id]: value })
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

  const fetchFilterConfigs = useCallback(() => {
    setLoadingFiltersConfig(true)
    axios.get('http://www.mocky.io/v2/5a25fade2e0000213aa90776').then(({ data }) => {
      if (data && data.filters) {
        setFiltersConfigs(data.filters)
        setLoadingFiltersConfig(false)
      }
    })
  }, [])

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
    const url = `/browse/featured-playlists${objectToQueryString(state.filters)}`
    console.log(url)
    setState({ loading: true })
    apiClient({ session, setSession, logout })
      .get(url)
      .then(({ data }) => {
        if (data) {

          //preserva o estado anterior e addiciona os elementos novos
          const playlists = !state.playlists
            ? data.playlists
            : { ...data.playlists, items: state.playlists.items.concat(data.playlists.items) }

          setState({ loading: false, playlists })

        }
      })
  }, [logout, session, setState, state.filters, state.playlists])

  const setFiltersAndSearch = useCallback(() => {
    setState({ filters, playlists: null })
  }, [filters, setState])

  const paginate = () => {
    if (!state.loading) {
      fetchLists()
    }
  }

  useEffect(() => {
    //methodos que vão acontecer na home
    if (location.pathname === '/') {
      if (!me && !loadingMe) {
        fetchMe()
      }

      if (!filtersConfigs && !loadingFiltersConfig) {
        fetchFilterConfigs()
      }

      if (!state.loading && !state.playlists && session) {
        fetchLists()
      }
    }
  }, [
    fetchFilterConfigs,
    fetchLists,
    fetchMe,
    filtersConfigs,
    loadingMe,
    loadingFiltersConfig,
    me,
    session,
    state.loading,
    state.playlists,
    location.pathname,
  ])

  console.log(filters)

  return (
    <AppContext.Provider
      value={{
        me,
        state,
        filters,
        setFilters,
        filtersConfigs,
        session,
        setSession,
        logout,
        login,
        setState,
        fetchLists,
        paginate,
        filterListByName,
        changeFilter,
        setFiltersAndSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
