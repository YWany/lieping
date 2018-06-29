/* global module */
var target = 'http://192.168.1.200:8088'

module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8088,
        https: false,
        hotOnly: false,
        proxy: {
            '/sw': {
                target: 'https://shi.huamijie.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/sw': '/sw'
                }
            },
            '/boquma-web': {
                target,
                changeOrigin: true,
                pathRewrite: {
                    '^/boquma-web': '/boquma-web'
                }
            }
        }
    },
    pluginOptions: {
        "extends": [
            "eslint:recommended",
            "plugin:vue/recommended"
        ],
        "rules": {
            "vue/html-self-closing": "off"
        },
    }
}