import axios from 'axios'

const sectionKey = 'section'
const { REACT_APP_SPOTIFY_APP_SECRET, REACT_APP_SPOTIFY_APP_ID }=  process.env

function setLocalJson({ key, data }){
    localStorage.setItem(key, JSON.stringify( data ));
}

function getLocalJson(key){
    const data = localStorage.getItem(key)
    return data ? JSON.parse( data ) : null
}

function checkSession(){
    const userSection = getLocalJson(sectionKey)
    return (userSection && userSection.code && typeof userSection.code === 'string')
}

function getFromUser(key = 'code'){
    const s = getLocalJson(sectionKey)
    return (s && s[key]) ? s[key] : null 
}

function clearSection(){
    localStorage.removeItem(sectionKey)
}

function getToken( code ){
    const { REACT_APP_HOST } = process.env

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code || getFromUser());
    params.append('redirect_uri', REACT_APP_HOST );

    return accountClient.post(`/token`,params)
}

const accountClient = axios.create({
    baseURL: 'https://accounts.spotify.com/api/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${new Buffer(REACT_APP_SPOTIFY_APP_ID+':'+REACT_APP_SPOTIFY_APP_SECRET).toString('base64')}`
    }
  });

const apiClient = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    timeout: 1000,
    ...( checkSession && { headers: {'Authorization': `Bearer ${getFromUser('access_token')}`} })
  });


export {
    setLocalJson,
    getLocalJson,
    checkSession,
    clearSection,
    getToken,
    accountClient,
    apiClient
}