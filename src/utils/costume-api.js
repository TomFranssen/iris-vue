import axios from 'axios'
import { getAccessToken } from './auth'

function getPrivateCostumes () {
    const url = `${process.env.VUE_APP_API_URL}/api/private/costumes`
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    }).then(response => response.data)
}

function getDgCostumes () {
    const url = `${process.env.VUE_APP_API_URL}/api/public/501stcostumes`
    return axios.get(url).then((response) => {
        return response.data
    }
    )
}

export { getPrivateCostumes, getDgCostumes }
