//Application State classes
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {object} objContext {state, props, dispatch}.
 * @param {number} iOrder The order where the Element needs to be added.
 * @param {string} strElementTypeName Element type name.
 * @param {object} objAdditionalProperties Additional Properties to be sent to the GetDefaultElementJson of the Element.
 * @summary Gets the default element json.
 * @returns {object} Default element json.
 */
export const GetDefaultElementJson = async (objContext, iOrder, strElementTypeName, objAdditionalProperties) => {
    let objImport = await import(/* webpackChunkName: "[request]" */ `@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMS${strElementTypeName}/CMS${strElementTypeName}_Editor/CMS${strElementTypeName}_Editor_MetaData`);
    let objElementJson = objImport.GetDefaultElementJson(iOrder, objAdditionalProperties);
    return new Promise((resolve, reject) => {
        if (objElementJson) {
            resolve(objElementJson);
        }
        else {
            reject(null);
        }
    });
};

/**
 * @name GetDefaultContainertJson
 * @param {number} intTemplateId template id
 * @summary Contains the default container json.
 * @returns {object} container json object
 */
export const GetDefaultContainerJson =  (intTemplateId) => {
    let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails") ? ApplicationState.GetProperty("ClientUserDetails") : ClientUserDetails;
    let objContainerJson = {
        "iContainerId": UniqueId.GetUniqueId(),
        "iContainerTypeId": 5,
        "iContainerTemplateId": intTemplateId,
        "vContainerBackgroundColor": "white",
        "iContainerFolderId": 0,
        "iOrder": 1,
        "vElementVerticalAlignment": "top",
        "vElementHorizontalAlignment": "center",
        "cIsParentContainer": "N",
        "iMainClientId": parseInt(objClientUserDetails["MainClientId"]),
        "cIsDeleted": "N",
        "cShowCalculator": "N",
        "cShowCalculatorOnLoad": "N",
        "cIsAnswerTitleEditable": "N",
        "cIsQuestionTitleEditable": "N",
        "cIsDisplayedInContainerTree": "N",
        "cIsSetHeight": "N",
        "uUserId": objClientUserDetails["UserId"],
        "Elements": []
    };
    return objContainerJson;
};
