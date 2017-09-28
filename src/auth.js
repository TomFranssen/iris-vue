/* globals localStorage */
const OktaAuth = require('@okta/okta-auth-js')
const authClient = new OktaAuth({url: 'https://dev-231800-admin.oktapreview.com'})

export default {
    login (email, pass, cb) {
        cb = arguments[arguments.length - 1]
        if (localStorage.token) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }

        return authClient.signIn({
            username: email,
            password: pass
        }).then(response => {
            if (response.status === 'SUCCESS') {
                return authClient.token.getWithoutPrompt({
                    clientId: `0oac6fqwf8RHuR0Dt0h7`,
                    responseType: ['id_token', 'token'],
                    scopes: ['openid', 'email', 'profile'],
                    sessionToken: response.sessionToken,
                    redirectUri: 'http://localhost:8080'
                }).then(tokens => {
                    localStorage.token = tokens[1].accessToken
                    localStorage.idToken = tokens[0].idToken
                    if (cb) cb(true)
                    this.onChange(true)
                })
            }
        })
    },

    getToken () {
        return localStorage.token
    },

    logout (cb) {
        delete localStorage.token
        if (cb) cb()
        this.onChange(false)
        return authClient.signOut()
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {
    }
}
