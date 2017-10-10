import axios from 'axios'
import { getAccessToken } from './auth'

const BASE_URL = 'http://localhost:3333'

export {getPublicStartupBattles, getPrivateEvents}

function getPublicStartupBattles () {
    const url = `${BASE_URL}/api/battles/public`
    return axios.get(url).then(response => response.data)
}

function getPrivateEvents () {
    const url = `${BASE_URL}/api/events/private`
    return axios.get(url, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data)
}
