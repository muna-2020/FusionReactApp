/**
* @name HandleChange
* @param {object} objContext takes objContext
* @param {string} strAttributeName consists of the vColumnName
* @param {string} strValue consists of value of the input
* @param {string} strDataVariable strDataVariable
* @param {string} strLanguageId consists of LanguageId for multilanguage input if any
* @summary Handle change method to handle changes in the jsx elements
* @returns {object} NewChangedData
*/
export function HandleChange(objContext, strAttributeName, strValue, strDataVariable, strLanguageId = "") {
    var objNewData;
    if (strAttributeName.split('.').length > 1) {
        let strTableName = strAttributeName.split('.')[0];
        let strColumnName = strAttributeName.split('.')[1];
        let arrLanguageData;
        if (!objContext.state[strDataVariable][strTableName]) {
            objNewData = { ...objContext.state[strDataVariable], [strTableName]: [{ "iLanguageId": strLanguageId, [strColumnName]: strValue }] };
        }
        else if (objContext.state[strDataVariable][strTableName].filter(x => x["iLanguageId"] == strLanguageId).length == 0) {
            arrLanguageData = [...objContext.state[strDataVariable][strTableName], { "iLanguageId": strLanguageId, [strColumnName]: strValue }];
            objNewData = { ...objContext.state[strDataVariable], [strTableName]: arrLanguageData };
        }
        else {
            arrLanguageData = objContext.state[strDataVariable][strTableName].map((objItem) => {
                return objItem["iLanguageId"] == strLanguageId ? { ...objItem, [strColumnName]: strValue } : objItem;
            });
            objNewData = { ...objContext.state[strDataVariable], [strTableName]: [...arrLanguageData] };
        }

    }
    else {
        objNewData = { ...objContext.state[strDataVariable], [strAttributeName]: strValue };
    }
    return objNewData;

}