import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { getMe, objectToQueryString, apiClient, clearSection, getSession } from '../../helpers'
import AppContext from '../../context'

var scopes = 'user-read-private user-read-email'

function ContextProvider({ children }) {
  //tudo que vamos usar
  let history = useHistory()
  const [me, setMe] = useState(getMe())
  const [session, setSession] = useState(getSession())
  const [state, setState] = useState({ loading: true, playlists: null, filters: null, focusedList: null })
  const [filters, setFilters] = useState({})

  const logout = useCallback(() => {
    //limpa do localstorage
    clearSection()
    //atualiza o estado
    setSession(null)
    //fé em deus que ele é justo irmão nunca se esqueça
    history.push('/login')
  }, [history])

  const fetchMe = useCallback(() => {
    apiClient({ session, setSession, logout })
      .get('/me')
      .then(({ data }) => {
        if (data) {
          setMe(data)
        }
      })
  }, [logout, session])

  //Login no estilo redirect
  function login() {
    const { REACT_APP_HOST, REACT_APP_SPOTIFY_APP_ID } = process.env
    const loginUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${REACT_APP_SPOTIFY_APP_ID}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(REACT_APP_HOST)}`
    window.location.href = loginUrl
  }

  //ficou complexo
  const fetchLists = useCallback(() => {
    const url = `/browse/featured-playlists${objectToQueryString(filters)}`

    apiClient({ session, setSession, logout })
      .get(url)
      .then(({ data }) => {
        if (data) {
          const { limit, offset } = data.playlists
          setState({ loading: false, playlists: data.playlists })
          setFilters({ limit, offset })
        }
      })
  }, [filters, logout, session])

  useEffect(() => {
    if (!me) {
      fetchMe()
    }

    if (!state.playlists && session) {
      console.log('getList')
      fetchLists()
    }
  }, [fetchLists, fetchMe, me, session, state.loading, state.playlists])

  console.log(state, session)

  return (
    <AppContext.Provider
      value={{ me, state, filters, setFilters, session, setSession, logout, login, setState, fetchLists }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
