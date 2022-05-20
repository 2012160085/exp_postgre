export const objToString = (obj: object): string => {
    var str = '';
    for (var p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            str += p + '::' + obj[p];
        }
    }

    return str;
}