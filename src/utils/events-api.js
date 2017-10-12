import axios from 'axios'
import { getAccessToken } from './auth'

const BASE_URL = 'http://localhost:3333'

export {getPrivateEvents}

function getPrivateEvents () {
    const url = `${BASE_URL}/api/events/private`
    return axios.get(url, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data)
}
