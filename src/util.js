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
    }
}