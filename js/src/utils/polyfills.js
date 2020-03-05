import 'es6-promise/auto';
import'whatwg-fetch';

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
