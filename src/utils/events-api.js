import axios from 'axios'
import { getAccessToken } from './auth'

export {getPrivateEvents}

function getPrivateEvents () {
    const url = `${process.env.API_URL}/api/private/events`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    }).then(response => response.data)
}
