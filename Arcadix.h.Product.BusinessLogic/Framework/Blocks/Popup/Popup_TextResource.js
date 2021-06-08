//Helper File.
import * as Localization from "@root/Framework/Blocks/Localization/Localization";

/**
 * @name GetResouceText
 * @param {*} objPopupParam
 * @param {*} strProperty
 * @summary Forms the ResouceText
 * @returns {string} ResouceText
 */
export function GetResouceText(objPopupParam, strProperty, strCount = null){
    let objTextResource = objPopupParam.Text;
    let objVariables = objPopupParam.Variables;
    let strTextResourceKey = objPopupParam.TextResourcesKey + "_" + strProperty;
    let strValue;
    if (strCount) {
        strValue = Localization.TextPluralFormatter(objTextResource, strTextResourceKey, strCount);
    }
    else {
        strValue = objTextResource && objTextResource[strTextResourceKey] ? objTextResource[strTextResourceKey] : undefined;
    }    
    if (strValue) {
        for (let strKey in objVariables) {
            strValue = strValue.replace("{!@" + strKey + "}", objVariables[strKey]);
        }
    }
    return strValue ? strValue : "";
}