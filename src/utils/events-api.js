import axios from 'axios'
import { getAccessToken } from './auth'

export {getPrivateEvents, getPrivateEvent, getPrivateSignedUpEvents}

function getPrivateEvents () {
    const url = `${process.env.API_URL}/api/private/events`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    }).then(response => response.data)
}

function getPrivateSignedUpEvents () {
    const url = `${process.env.API_URL}/api/private/signedupevents`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    }).then(response => response.data)
}

function getPrivateEvent (id) {
    const url = `${process.env.API_URL}/api/private/event`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            id
        }
    }).then(response => response.data)
}
