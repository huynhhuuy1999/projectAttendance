export const objToQuery = (obj: any): string => {
    if (!obj) return '';

    var query = [];

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            query.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
        }
    }

    return '?' + query.join('&');
};