import ls from 'store2'

export const getErrorMsg = data => {
    let msg = ''
    if (data) {
        const keys = Object.keys(data)
        msg = data[keys[0]][0]
    }
    return msg
}

export const isWeiXin = () => {
    const ua = window.navigator.userAgent.toLowerCase()
    const wx = ua.match(/MicroMessenger/i)
    if (wx && wx[0] === 'micromessenger') {
        return true
    }
    return false
}
export const isQQ = () => {
    ls.get()
    const ua = window.navigator.userAgent.toLowerCase()
    return ua.indexOf('micromessenger') == -1 && ua.indexOf('qqbrowser') > -1 || ua.indexOf('qbwebview') > -1
}

export const isAndroid = () => {
    const ua = window.navigator.userAgent.toLowerCase()
    const android = ua.match(/Android/i)
    if (android && android[0] === 'android') {
        return true
    }
    return false
}

// 获取时间
export const UTC2Date = (utc, format, add) => {
    if (!format) format = 'y-m-d'
    let newDate = utc ? new Date(utc) : new Date()
    if (add) newDate = new Date(newDate.setDate(newDate.getDate() + add))
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let date = newDate.getDate()
    let hours = newDate.getHours()
    let minutes = newDate.getMinutes()
    let seconds = newDate.getSeconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return format
        .replace(/y/ig, year)
        .replace(/m/ig, month)
        .replace(/d/ig, date)
        .replace(/h/ig, hours)
        .replace(/i/ig, minutes)
        .replace(/s/ig, seconds)
}