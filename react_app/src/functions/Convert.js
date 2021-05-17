export function convertStrToDate(date, time = undefined) {        
    var partesData = date.split("/");          

    if(time === undefined) 
        return new Date(partesData[2], partesData[1] - 1, partesData[0]);

    var partesHour = time.split(":");          

    return new Date(partesData[2], partesData[1] - 1, partesData[0], partesHour[0], partesHour[1], partesHour[2]);        
}