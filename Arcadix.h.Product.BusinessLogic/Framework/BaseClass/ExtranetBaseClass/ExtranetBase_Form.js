import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

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
    return Base_Form.HandleChange(objContext, strAttributeName, strValue, strDataVariable, strLanguageId);

}