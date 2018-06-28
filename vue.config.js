/* global module */
var target = 'https://192.168.1.200'

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