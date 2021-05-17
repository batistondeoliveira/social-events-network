export function dateFormat(data) {
    if (data === undefined || data === '' || data === null)
        return '';

    data = "" + data + "";

    if (data.indexOf(':') > 1) {
        return data.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})(.*)$/, '$3/$2/$1 $4').substr(0, 10);
    } else {
        return data.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, '$3/$2/$1');
    }
}