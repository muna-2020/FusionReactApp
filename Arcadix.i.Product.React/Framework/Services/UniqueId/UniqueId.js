/**
 * @name GetUniqueId
 * @summary Generates a unique id base Date,month,year. Used to avoid browser caching of pages
 * @returns {number} Numeric unique id.
 */
export const GetUniqueId = () => {
    let strUniqueId = Math.floor(new Date().valueOf() * Math.random());
    return parseInt(strUniqueId.toString().substr(0, 9));
    //let objDate = new Date();
    //let strTimeStamp = objDate.getFullYear().toString();
    //strTimeStamp += (objDate.getMonth() < 9 ? '0' : '') + objDate.getMonth().toString();
    //strTimeStamp += (objDate.getDate() < 10 ? '0' : '') + objDate.getDate().toString();
    //strTimeStamp += (objDate.getHours() < 10 ? '0' : '') + objDate.getHours().toString();
    //strTimeStamp += (objDate.getMinutes() < 10 ? '0' : '') + objDate.getMinutes().toString();
    //strTimeStamp += (objDate.getSeconds() < 10 ? '0' : '') + objDate.getSeconds().toString();
    //let intMiliSeconds = objDate.getMilliseconds();
    //if (intMiliSeconds < 10 || intMiliSeconds < 100) {
    //    strTimeStamp += "0";
    //}
    //strTimeStamp += intMiliSeconds.toString();
    //return parseInt(strTimeStamp);
};

/**
 * @name GetGUID
 * @summary Forms a guid string.
 * @returns {string} GUID.
 * */
export const GetGUID = () => {
    let strGUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var strRandom = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return strRandom.toString(16);
    });
    return strGUID.toUpperCase();
};
