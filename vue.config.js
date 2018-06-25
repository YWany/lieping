/* global module */
var target = 'https://shi.huamijie.com'

module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8888,
        https: false,
        hotOnly: false,
        proxy: {
            '/sw': {
                target,
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