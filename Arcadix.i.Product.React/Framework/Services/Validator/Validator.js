import * as Localization from "@root/Framework/Blocks/Localization/Localization";

/**
 * @name Validate
 * @param {*} arrMetaData - Contains the Column details such as vControlType, vValidationType, vValidationKey, vColumnName, etc
 * @param {*} objTextResources - Contains the value(text) corresponding to the key(vValidationKey) from the meta and additional text for RequireValidationMessage
 * @param {*} objData - Data against which the validation is done using the "vColumnName" as the key from the MetaData
 * @param {*} strAttributeName - ColumnName, if passed validation will be done for that only
 * @summary Server side method that does the validation and returns the validartion object with the key as ColumnName and value as Validation Error text
 */
export const Validate = (arrMetaData, objTextResources, objData, strAttributeName = "") => {
    let objValidationMessages = {};
    if (strAttributeName != "") {
        arrMetaData = arrMetaData.filter(objMeta => { return objMeta["vColumnName"] == strAttributeName });
    }
    arrMetaData.map((objMeta) => {
        let strColumnName = objMeta.vColumnName, strTextToValidate;
        if (objMeta.vColumnName.split(".").length == 2) {
            let strSubTableName = objMeta.vColumnName.split(".")[0];
            let objSubTableData = objData[strSubTableName] ? objData[strSubTableName].find(obj => obj["iLanguageId"] == JConfiguration.InterfaceLanguageId) : {};
            strTextToValidate = objSubTableData ? objSubTableData[objMeta.vColumnName.split(".")[1]] : "";
        }
        else {
            strTextToValidate = objData[objMeta.vColumnName];
        }        
        let blnIsValid = true;
        let blnIsRequired = objMeta.IsMandatory === "Y" ? true : false;
        if (blnIsRequired) {
            if (strTextToValidate == undefined || (strTextToValidate == "" && objMeta.vControlType != "dropdown") || (objMeta.vControlType == "dropdown" && strTextToValidate == -1)) {
                objValidationMessages = {
                    ...objValidationMessages,
                    [strColumnName]: objTextResources[strColumnName + "_RequireValidationMessage"] || objTextResources["RequireValidationMessage"]
                };
                blnIsValid = false;
            }
        }
        if (blnIsValid && objMeta.vValidationType && strTextToValidate && strTextToValidate != "") {
            switch (objMeta.vValidationType.toLowerCase()) {
                case "date":
                    var strDateRegex = Localization.GetDateRegex(); // /^\d{2}[./-]\d{2}[./-]\d{4}$/;
                    var dateReg = new RegExp(strDateRegex);
                    if (dateReg.test(strTextToValidate || "") == false) {
                        objValidationMessages = { ...objValidationMessages, [strColumnName]: objTextResources[objMeta["vValidationKey"]] };
                    }
                    break;
                case "email":
                    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    if (reg.test(strTextToValidate || "") == false) {
                        objValidationMessages = { ...objValidationMessages, [strColumnName]: objTextResources[objMeta["vValidationKey"]] };
                    }
                    break;
                case "number":
                    if (isNaN(strTextToValidate)) {
                        objValidationMessages = { ...objValidationMessages, [strColumnName]: objTextResources[objMeta["vValidationKey"]] };
                    }
                    break;
                default:
                    break;
            }
        }
    });
    return Object.keys(objValidationMessages).length > 0 ? objValidationMessages : null;
};

/**
 * @name ValidateClientSide
 * @param {*} arrMetaData  - Contains the Column details such as vControlType, vValidationType, vValidationKey, vColumnName, etc
 * @param {*} objTextResources - Contains the value(text) corresponding to the key(vValidationKey) from the meta and additional text for RequireValidationMessage
 * @param {*} objData - Data against which the validation is done using the "vColumnName" as the key from the MetaData
 * @param {*} strAttributeName - ColumnName, if passed validation will be done for that only
 * @param {*} blnFocus - Optional parameter that tells whether to focus the first no valid field or not.
 * @param {*} strMessageDivName - Html Element that shows the validation details
 * @param {*} strImagePath - Image path for Image shown with validation Message
 * @summary Client side method that does the validation and updates the dom css accordingly and returns the validation Object.
 */
export const ValidateClientSide = (arrMetaData, objTextResources, objData, strAttributeName = "", blnFocus = false, strMessageDivName = "", strImagePath = "", blnIsTabbedForm = false) => {
    var objValidationMessages = Validate(arrMetaData, objTextResources, objData, strAttributeName);
    var strElementToFocus = "";
    //for validate onBlur
    if (strAttributeName != "") {
        arrMetaData = arrMetaData.filter(objMeta => { return objMeta["vColumnName"] == strAttributeName });
    }
    arrMetaData.map(objMetaData => {
        let domColumn = objMetaData["vColumnName"].split(".").length == 1 ? document.getElementById(objMetaData["vColumnName"]) :
            document.getElementById(objMetaData["vColumnName"].split(".")[1]);
        if (objValidationMessages && objValidationMessages[objMetaData["vColumnName"]]) {
            if (blnFocus && strElementToFocus == "") {
                strElementToFocus = objMetaData["vColumnName"].split(".").length == 1 ? objMetaData["vColumnName"] : objMetaData["vColumnName"].split(".")[1];
            }
            if (domColumn)
                domColumn.classList.add("error-field");
        }
        else {
            if (domColumn)
                domColumn.classList.remove("error-field");
        }
    });
    if (blnIsTabbedForm) {
        if (strAttributeName == "") {
            if (objValidationMessages != null) {
                let strFirstInvalidControl = Object.keys(objValidationMessages)[0];
                let strFirstInvalidTab = arrMetaData.find(x => x.vColumnName == strFirstInvalidControl)["iTabId"];
                document.getElementById("Nav_" + strFirstInvalidTab).click();
                window.setTimeout(() => {
                    ValidateFocus(strMessageDivName, objValidationMessages, strFirstInvalidControl, strImagePath);
                    if (strFirstInvalidControl.split(".").length == 2)
                        strFirstInvalidControl = strFirstInvalidControl.split(".")[1];
                    if (document.getElementById(strFirstInvalidControl))
                        document.getElementById(strFirstInvalidControl).focus();                    
                }, 10);
            }
            else {
                window.setTimeout(() => {
                    if (document.getElementById(arrMetaData[0].vColumnName))
                        document.getElementById(arrMetaData[0].vColumnName).focus();
                    ValidateFocus(strMessageDivName, objValidationMessages, arrMetaData[0].vColumnName, strImagePath);
                }, 10);
            }
        }
    }
    else {
        if (blnFocus && strElementToFocus != "") {
            if (document.getElementById(strElementToFocus))
                document.getElementById(strElementToFocus).focus();
            ValidateFocus(strMessageDivName, objValidationMessages, strElementToFocus, strImagePath);
        }
    }
    return objValidationMessages;
};

/**
 * @name ValidateFocus
 * @param {*} strMessageDivName - Html Element that shows the validation details
 * @param {*} objValidationMessages -Object with Validation Details (key - ColumnName, Value - Validation Error Message)
 * @param {*} strColumnName - Key to take the Text from the objValidationMessages
 * @param {*} strImagePath - Image path for Image shown with validation Message
 * @summary To assign value(Validation Error Message) to the Html Element based on the ColumnName passed as the key
 */
export const ValidateFocus = (strMessageDivName, objValidationMessages, strColumnName, strImagePath) => {
    let domValidationDiv = document.getElementById(strMessageDivName);
    if (domValidationDiv){
        var strValidationErrorMessage = objValidationMessages ? (objValidationMessages[strColumnName] || "") : "";
        if (strValidationErrorMessage != "") {
            if (strImagePath)
                domValidationDiv.innerHTML = "<img src=" + strImagePath + " /> <span className='validationmessage'>" + strValidationErrorMessage + "</span>";
            else
                domValidationDiv.innerHTML = "<span className='validationmessage'>" + strValidationErrorMessage + "</span>";
        }
        else {
            domValidationDiv.innerHTML = "";
        }    
    }
      
};
