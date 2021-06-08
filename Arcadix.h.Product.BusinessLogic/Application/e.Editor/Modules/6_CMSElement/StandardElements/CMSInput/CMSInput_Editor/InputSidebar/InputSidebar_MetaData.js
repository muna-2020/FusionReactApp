//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultValue
 * @param {object} objContext {state, props, dispatch}
 * @param {string} strText text for input
 * @param {any} dblTolerance tolerance value
 * @summary Returns a default value object for the Input
 * @returns {object} Input value
 */
export const GetDefaultValue = (objContext, strText, dblTolerance) => {
    return {
        "iElementInputValueId": UniqueId.GetUniqueId(),
        "iDisplayOrder": 1,
        "dTolerance": dblTolerance ? dblTolerance : null,
        "vText": strText
    };
};
