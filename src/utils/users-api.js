import axios from 'axios'
import { getAccessToken } from './auth'

export {getPrivateUsers, getPrivateUser, get501stUsers}

function getPrivateUsers () {
    const url = `${process.env.API_URL}/api/private/users`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    }).then(response => response.data)
}

function getPrivateUser (userId) {
    const url = `${process.env.API_URL}/api/private/user`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            userid: userId
        }
    }).then(response => response.data)
}

function get501stUsers () {
    const url = `${process.env.API_URL}/api/501stusers`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    }).then(response => response.data)
}
