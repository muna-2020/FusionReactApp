/**
 * @name GetAddEditSchoolYearTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditSchoolYearTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "SchooYearManagment"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "SchooYearManagment"),
                    "Id": "SchoolYear",
                    "Event": () => {
                        objData.ShowDiv("SchoolYear");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}