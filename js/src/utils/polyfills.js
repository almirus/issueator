import 'es6-promise/auto';

if (!window.fetch) {
    import(/* webpackChunkName: "polyfill-fetch" */ 'whatwg-fetch')
}
