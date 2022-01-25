export default {
    install(app, options) {
        app.config.globalProperties.$message = function(text) {
            M.toast({html: text})
        }

        app.config.globalProperties.$error = function(text) {
            M.toast({html: `[Error] ${text}`})
        }
    },
    // install_vue2 (Vue, options) {
    //     Vue.prototype.$message = function(text) {
    //         M.toast({html: text})
    //     }

    //     Vue.prototype.$error = function(text) {
    //         M.toast({html: `[Error] ${text}`})
    //     }
    // }
}

