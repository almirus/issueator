import 'es6-promise/auto';
import 'whatwg-fetch';
import 'array-from-polyfill';

let objectToEntriesPolyfill = function(object) {
    return Object
        .keys(object)
        .map(
            function(key) {
                return [key, object[key]];
            }
        );
};
Object.entries = Object.entries || objectToEntriesPolyfill;

