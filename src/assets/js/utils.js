import Vue from 'vue'
import api from "@/api"
import ls from "store2"

export const inBrowser = typeof window !== 'undefined'

export const ua = () => {
    var userAgentInfo = inBrowser ? navigator.userAgent : ''
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    var flag = 'PC'
    for (var vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = Agents[vv]
            break
        }
    }
    return flag
}

export const ssp = path => {
    if (!inBrowser) return
    var clientHeight = document.documentElement.clientHeight,
        scrollTop = ls.get(path)
    if (scrollTop) {
        Vue.nextTick().then(() => {
            if (document.body.clientHeight >= scrollTop + clientHeight) {
                window.scrollTo(0, scrollTop)
            } else {
                ls.remove(path)
            }
        })
    }
}

function randomChar(length) {
    var x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
    var tmp = ''
    var timestamp = new Date().getTime()
    for (var i = 0; i < length; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
    }
    return timestamp + tmp
}

const uploadimg = async files => {
    var oMyForm = new FormData()
        // const isJPG = ['image/jpeg', 'image/x-png', 'image/png', 'image/gif'].includes(files.type)
        // if (!isJPG) {
        //     return Promise.reject('选择的文件只能是图片格式!')
        // }
    var upFile = null
    var fileSize = 0
    var upType = '1'
    if (files.size > 1024000) {
        try {
            const rst = await lrz(files, { width: 1200, height: 1200, quality: 0.8 })
            upFile = rst.file
            fileSize = rst.fileLen
            upType = '2'
        } catch (error) {
            upFile = files
            fileSize = files.size
        }
    } else {
        upFile = files
        fileSize = files.size
    }
    try {
        const data = await api.put(apiConfig.baseApi + 'oss/upload')
        if (!data || !data.cdn_host) {
            if (window.$$Raven) {
                window.$$Raven.captureException('oss/upload 接口请求失败', {
                    extra: {
                        fileSize,
                        ossUpload: data,
                        networkType: window.networkType || '未知'
                    }
                })
            }
            return Promise.reject('上传失败, 请重试')
        }
        const name = files.name
        const arr_name = name.split('.')
        let ext = arr_name[arr_name.length - 1].toLowerCase()
        if (!['jpg', 'png', 'gif', 'jpeg'].includes(ext)) ext = 'jpg'
        const key = data.dir + userId + randomChar(6) + '.' + ext
        const url = data.cdn_host + '/' + key
        oMyForm.append('name', files.name)
        oMyForm.append('key', key)
        oMyForm.append('success_action_status', '200')
        Object.keys(data).forEach(item => {
            if (item === 'accessid') oMyForm.append('OSSAccessKeyId', data[item])
            else oMyForm.append(item, data[item])
        })
        oMyForm.append('file', upFile)
        const body = await api.putImg(data.host + '?fileSize=' + fileSize + '&upType=' + upType, oMyForm, 'post', false)
        const {
            data: { Status }
        } = body
        if (Status === 'Ok') return Promise.resolve(url)
        if (window.$$Raven) {
            window.$$Raven.captureException('阿里云返回未知错误', {
                extra: {
                    fileSize,
                    ossUpload: data,
                    uploadRes: body,
                    networkType: window.networkType || '未知'
                }
            })
        }
        let msg = '由于网络不稳定, 图片上传失败, 请保证当前操作处于WIFI或者4G环境!'
        if (window.networkType === '3g' || window.networkType === '3g+') {
            msg = '系统检测到你的网络环境为3G, 建议使用WIFI以保证图片能正常上传'
        }
        return Promise.reject(msg)
    } catch (error) {
        if (window.$$Raven) {
            window.$$Raven.captureException(error, {
                extra: {
                    fileSize,
                    networkType: window.networkType || '未知'
                }
            })
        }
        return Promise.reject('上传失败, 请重试')
    }
}

export const upload = uploadimg

export const isWeiXin = () => {
    const ua = window.navigator.userAgent.toLowerCase()
    const wx = ua.match(/MicroMessenger/i)
    if (wx && wx[0] === 'micromessenger') {
        return true
    }
    return false
}

export const isQQ = () => {
    const ua = window.navigator.userAgent.toLowerCase()
    return (ua.indexOf('micromessenger') == -1 && ua.indexOf('qqbrowser') > -1) || ua.indexOf('qbwebview') > -1
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
    if (utc && typeof utc === 'string') utc = utc.replace(/-/g, '/').replace('.000000', '')
    let newDate = utc ? new Date(utc) : new Date()
    if (add) newDate = new Date(newDate.setDate(newDate.getDate() + add))
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let date = newDate.getDate()
    let hours = newDate.getHours()
    let minutes = newDate.getMinutes()
    let seconds = newDate.getSeconds()
    let mseconds = newDate.getMilliseconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    if (mseconds < 100 && mseconds > 9) {
        mseconds = '0' + mseconds
    } else if (mseconds < 10) {
        mseconds = '00' + mseconds
    }
    return format
        .replace(/y/gi, year)
        .replace(/m/gi, month)
        .replace(/d/gi, date)
        .replace(/h/gi, hours)
        .replace(/i/gi, minutes)
        .replace(/s/gi, seconds)
        .replace(/v/gi, mseconds)
}