//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultValue
 * @param {object} objContext {state, props, dispatch, MultiInputSidebar_ModuleProcessor}
 * @param {string} strText text for MultiInput
 * @param {double} dblTolerance tolerance value
 * @param {double} dblCorrectPoint correct point
 * @summary Returns a default value object for the MultiInput
 * @returns {object} MultiInput value
 */
export const GetDefaultValue = (objContext, strText, dblTolerance = null, dblCorrectPoint) => {
    return {
        "iElementMultiInputValueId": UniqueId.GetUniqueId(),
        "iDisplayOrder": "1",
        "dTolerance": dblTolerance,
        "vText": strText,
        "dCorrectPoint": dblCorrectPoint
    };
};
