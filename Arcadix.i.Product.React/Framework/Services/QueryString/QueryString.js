/**
 * @name GetQueryStringValue
 * @summary Gets Querystring value
 * @param {any} key
 * @returns {string}
 */
export function GetQueryStringValue(strQueryStringKey) {
    let objQueryStringKeyValuePair = {};
    let strHref = global.PrefetchHref ?? window.location.href; 
    strHref.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, strKey, strValue) {
        objQueryStringKeyValuePair[strKey] = strValue;
    });
    if (objQueryStringKeyValuePair[strQueryStringKey])
        return objQueryStringKeyValuePair[strQueryStringKey]
    else
        return "";
}

/**
 * @name SetQueryStringValue
 * @summary Sets Querystring value
 * @param {any} strUri
 * @param {any} strQueryStringKey
 * @param {any} strQueryStringValue
 * @returns {string}
 */
export function SetQueryStringValue(strUri, strQueryStringKey, strQueryStringValue) {
  var objRegularExpressionQueryString = new RegExp("([?&])" + strQueryStringKey + "=.*?(&|$)", "i");
  var strSeparator = strUri.indexOf('?') !== -1 ? "&" : "?";
    if (strUri.match(objRegularExpressionQueryString)) {
        return strUri.replace(objRegularExpressionQueryString, '$1' + strQueryStringKey + "=" + strQueryStringValue + '$2');
  }
  else {
        return strUri + strSeparator + strQueryStringKey + "=" + strQueryStringValue;
  }
}

/**
 * @name SetQueryStringValue
 * @summary Sets Querystring value
 * @param {any} strUri
 * @param {any} strQueryStringKey
 * @param {any} strQueryStringValue
 * @returns {string}
 */
export function RemoveQueryStringValue(strUri, strQueryStringKey) {
    //prefer to use l.search if you have a location/link object
    var arrUrlparts = strUri.split('?');   
    if (arrUrlparts.length >= 2) {
        var strQueryStringToRemove = encodeURIComponent(strQueryStringKey) + '=';
        var arrQueryStrings = arrUrlparts[1].split(/[&;]/g);
        //reverse iteration as may be destructive
        for (var i = arrQueryStrings.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (arrQueryStrings[i].lastIndexOf(strQueryStringToRemove, 0) !== -1) {  
                arrQueryStrings.splice(i, 1);
            }
        }
        return arrUrlparts[0] + (arrQueryStrings.length > 0 ? '?' + arrQueryStrings.join('&') : '');
    }
    return strUri;
}