export function convertStrToDate(date) {        
    var partesData = date.split("/");               

    return new Date(partesData[2], partesData[1] - 1, partesData[0], 23, 59, 59);
}