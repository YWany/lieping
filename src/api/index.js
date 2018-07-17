import axios from 'axios'
import qs from 'qs'

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8', //'application/json', //'application/x-www-form-urlencoded; charset=UTF-8'
    'diy': '1234567890'
}

const baseConfig = {
    headers,
    timeout: 20000,
    withCredentials: true
}

function doSucc(res) {
    if (res && (res.status === 200 || res.status === 304)) {
        return res
    }
}

function doError(res) {
    if (res.data.code == "UNAUTHORIZED") {
        window.location.href = '/#/login'
    } else {
        return res
    }
}

const config = {}
config.api = '/boquma-web'

export default {
    axs(method, url, data = {}) {
        return axios({
                // ...baseConfig,
                method: method,
                url: config.api + url,
                // params: data,
                data: qs.stringify(data),
                // data: bodyData
            })
            .then(doSucc)
            .then(doError)
    },
    axss(method, url, data = {}, bodyData) {
        return axios({
                ...baseConfig,
                method: method,
                url: config.api + url,
                params: data,
                // data: qs.stringify(data),
                data: bodyData
            })
            .then(doSucc)
            .then(doError)
    },
    put(method, url, data = {}) {
        return axios({
                ...baseConfig,
                method: method,
                url: url,
                // data: qs.stringify(data),
                params: data,
            })
            .then(doSucc)
            .then(doError)
    }
}