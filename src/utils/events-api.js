import axios from 'axios'
import { getAccessToken } from './auth'

export { getPrivateEvents, getPrivateEvent, getPrivateSignedUpEvents, getPrivateArchivedEvents, getPrivateSignedUpEventsForUser }

function getPrivateEvents () {
    const url = `${process.env.VUE_APP_API_URL}/api/private/events`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error)
        })
}

function getPrivateArchivedEvents () {
    const url = `${process.env.VUE_APP_API_URL}/api/private/archivedevents`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error)
        })
}

function getPrivateSignedUpEvents () {
    const url = `${process.env.VUE_APP_API_URL}/api/private/signedupevents`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error)
        })
}

function getPrivateSignedUpEventsForUser (userId) {
    const url = `${process.env.VUE_APP_API_URL}/api/private/signedupeventsforuser`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            userId
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(error)
        })
}

function getPrivateEvent (id) {
    const url = `${process.env.VUE_APP_API_URL}/api/private/event`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            id
        }
    })
        .then(response => response.data)
        .catch(error => {
            return error
        })
}
