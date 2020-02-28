export  function checkBrowserDependency() {
    if (!window.fetch) {
        import(/* webpackChunkName: "polyfill-fetch" */ 'whatwg-fetch')
    }
}