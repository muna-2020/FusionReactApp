//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultValue
 * @param {object} objContext {state, props, dispatch}
 * @summary Returns a default value object for the dropdown
 * @returns {object} Dropdown value
 */
export const GetDefaultValue = (objContext) => {
    return {
        "iElementDropdownValueId": UniqueId.GetUniqueId(),
        "iDisplayOrder": 1,
        "cIsCorrectValue": "N",
        "dWrongPoint": 0,
        "vText": ""
    };
};
