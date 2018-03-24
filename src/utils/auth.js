// try this: https://github.com/auth0-samples/auth0-express-api-samples/blob/master/01-Authorization-RS256/package.json
import decode from 'jwt-decode'
import auth0 from 'auth0-js'
import Router from 'vue-router'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'

const CLIENT_ID = '1ySh5N0sOXxMkcAslnuhRfxO5BloY56t'
const CLIENT_DOMAIN = '501st.eu.auth0.com'
const SCOPE = 'openid profile email groups permissions roles'
const AUDIENCE = 'https://iris.501st.nl'

const auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
})

export function login () {
    auth.authorize({
        responseType: 'token id_token',
        redirectUri: process.env.VUE_APP_AUTH0_REDIRECT,
        audience: AUDIENCE,
        scope: SCOPE
    })
}

export function getProfile () {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
        console.log('Access token must exist to fetch profile')
    }

    if (accessToken) {
        return new Promise((resolve, reject) => {
            auth.client.userInfo(accessToken, function (err, profileData) {
                if (err) {
                    if (err.stack) {
                        console.log(err.stack)
                    } else {
                        console.log(err)
                    }
                }
                if (profileData) {
                    resolve(profileData)
                } else {
                    reject(Error('Cannot get profile data'))
                    console.log('Logging out!')
                    logout()
                }
            })
        })
    }
}

const router = new Router({
    mode: 'history'
})

export function logout () {
    clearIdToken()
    clearAccessToken()
    router.go('/')
}

export function requireAuth (to, from, next) {
    if (!isLoggedIn()) {
        next({
            path: '/',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}

export function getIdToken () {
    return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
    localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken () {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export function setAccessToken () {
    let accessToken = getParameterByName('access_token')
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export function setIdToken () {
    let idToken = getParameterByName('id_token')
    localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
    const idToken = getIdToken()
    return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
    const token = decode(encodedToken)
    if (!token.exp) { return null }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
}

function isTokenExpired (token) {
    const expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}
