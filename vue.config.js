/* global module */
const target = 'http://47.96.116.114:8089/'

module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8088,
        https: false,
        hotOnly: false,
        proxy: {
            '/boquma-web': {
                target,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/boquma-web': '/boquma-web'
                }
            },
            '/param': {
                target,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/param': '/param'
                }
            },
            '/sw': {
                target: 'https://shi.huamijie.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/sw': '/sw'
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