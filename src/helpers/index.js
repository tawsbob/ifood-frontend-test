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
    const hasCode = (userSection && userSection.code && typeof userSection.code === 'string')
    const hasToken = (userSection && userSection.code && typeof userSection.code === 'string')
    return hasToken || hasCode
}

function getSession(key){
    const s = getLocalJson(sectionKey)
    if(key){
        return (s && s[key]) ? s[key] : null 
    }
    return s
    
}

function clearSection(){
    localStorage.removeItem(sectionKey)
}

function getToken( params ){
    const { REACT_APP_HOST } = process.env

    const refreshKey = 'refresh_token'

    //basicamente valida e acerta o parâmetro se é refresh_token ou code
    const grant_type = params.grant_type || 'authorization_code'
    const grant_type_key = grant_type === refreshKey ? grant_type : 'code'
    const grant_type_value = (grant_type_key === refreshKey && params[refreshKey]) ? params[refreshKey] : params.code || getSession('code')

    const data = new URLSearchParams();
    data.append('grant_type',  grant_type);
    data.append(grant_type_key, grant_type_value);
    data.append('redirect_uri', REACT_APP_HOST );

    return accountClient().post(`/token`,data)
}

function objectToQueryString(obj){
    const keys = Object.keys(obj)
    let count = keys.length

    return keys.reduce((queryString, currenKey)=>{
            queryString +=  `${currenKey}=${obj[currenKey]}&`
        count--
        console.log(count)
        return queryString
    },'?')

}

const accountClient = ()=>(axios.create({
    baseURL: 'https://accounts.spotify.com/api/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${new Buffer(REACT_APP_SPOTIFY_APP_ID+':'+REACT_APP_SPOTIFY_APP_SECRET).toString('base64')}`
    }
  }));

const apiClient = ()=>(axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    timeout: 1000,
    ...( checkSession && { headers: {'Authorization': `Bearer ${getSession('access_token')}`} })
  }));


export {
    setLocalJson,
    getLocalJson,
    checkSession,
    getSession,
    clearSection,
    getToken,
    objectToQueryString,
    accountClient,
    apiClient
}