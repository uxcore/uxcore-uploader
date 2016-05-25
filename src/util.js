const {UploadCore} = require('uploadcore');
const hijackEvents = ['fileuploadsuccess', 'filecancel'];
let CORE_INSTANCE = {};
UploadCore.setSWF('https://alinw.alicdn.com/alinw/uxuploader/2.0.1/flashpicker.swf');
module.exports = {
    humanSizeFormat: function (size) {
        size = parseFloat(size);
        const prefixesSI = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y'];
        let base = 1000,
            index = size ? Math.floor(Math.log(size) / Math.log(base)) : 0;
        index = Math.min(index, prefixesSI.length - 1);
        let powedPrecision = Math.pow(10, index < 2 ? 0 : (index > 2 ? 2 : 1));
        size = size / Math.pow(base, index);
        size = Math.round(size * powedPrecision) / powedPrecision;
        if (size > 500) {
            size = Math.round(size / 100) / 10;
            index++;
        }
        return size + prefixesSI[index];
    },
    natcut: function(title, len) {
        let max = len * 2, length = title.length, l = 0, i = 0, part, s;
        for (i=0; i < length && l <= max; i++) {
            l += title.charCodeAt(i) > 255 ? 2 : 1;
        }
        if (l <= max) {
            return title;
        }
        i = 0;
        l = 0;
        len -= 2;
        while (l < len) {
            s = title.charCodeAt(i) > 255 ? 2 : 1;
            if (l + s > len) {
                break;
            } else {
                i++;
                l += s;
            }
        }
        part = title.substr(0, i);
        l += 3;

        i = length;
        while (l < max) {
            s = title.charCodeAt(i-1) > 255 ? 2 : 1;
            if (l + s > max) {
                break;
            } else {
                i--;
                l += s;
            }
        }
        return part + '...' + title.substring(Math.min(i, length-1), length);
    },
    getCoreInstance: (props, autoPending) => {
        let core = props.core;
        if (core instanceof UploadCore) {
            return core;
        }

        const id = core;
        if (id && typeof id === 'string' && CORE_INSTANCE.hasOwnProperty(id)) {
            return CORE_INSTANCE[id];
        }

        let options = props.options || {};
        ['name', 'url', 'params', 'action', 'data', 'headers', 'withCredentials', 'timeout',
            'chunkEnable', 'chunkSize', 'chunkRetries', 'chunkProcessThreads', 'processThreads',
            'autoPending', 'multiple', 'accept', 'sizeLimit', 'preventDuplicate','isOnlyImg'
        ].forEach((key) => {
            if (props.hasOwnProperty(key)) {
                options[key] = props[key];
            }
        });

        if (autoPending != null) {
            options.autoPending = autoPending;
        }

        core = new UploadCore(options);

        for (let key in props) {
            if (props.hasOwnProperty(key)) {
                let m = /^on(\w+)$/i.exec(key);
                if (!m) continue;
                if (typeof props[key] === 'function' && hijackEvents.indexOf(m[1]) == -1) {
                    core.on(m[1], props[key]);
                }
            }
        }

        if (id) {
            CORE_INSTANCE[id] = core;
        }

        return core;
    },
    /**
     * JSON can not handle undefined/null/function
     * hence it's just a simple method
     * Don't use if your object contains the type metioned before
     */
    simpleDeepCopy: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },
    simpleDeepEqual: (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b)
    },
    TRANSFORM_PROPERTY: () => {
        const style = document.createElement("div").style;
        const properties = ["transform", "WebkitTransform", "MozTransform", "msTransform"];
        for (let i = 0, l = properties.length; i < l; i++) {
            if (properties[i] in style) {
                return properties[i];
            }
        }
        return false;
    }
}