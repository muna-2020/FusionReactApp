/**
 * @name GetMainClientDropDownMeta
 * @summary get the meta data for MainClient DropDown
 * @returns {object} array of Drop down meta
 */
export const GetMainClientDropDownMeta = () => {
    return {
        DisplayColumn: "vMainClientIdentifier",
        ValueColumn: "iMainClientId"
    };
}

/**
 * @name GetExecutionDataDropDownMeta
 * @summary get the meta data for Execution DropDown
 * @returns {object} array of Drop down meta
 */
export const GetExecutionDataDropDownMeta = () => {
    return {
        DisplayColumn: "vExecutionName",
        ValueColumn: "uOfflineProcessExecutionId",
        DefaultOptionValue: - 1,
        ShowDefaultOption: "true"
    };
}