import axios from 'axios'
import { getAccessToken } from './auth'

const BASE_URL = 'http://localhost:3333'

export {getPrivateUsers, getPrivateUser}

function getPrivateUsers () {
    const url = `${BASE_URL}/api/private/users`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    }).then(response => response.data)
}

function getPrivateUser (userId) {
    const url = `${BASE_URL}/api/private/user`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            userid: userId
        }
    }).then(response => response.data)
}
