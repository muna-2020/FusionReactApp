/**
 * @name GetAddEditSchoolYearTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditSchoolTypeTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "SchoolType"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "SchoolType"),
                    "Id": "SchoolType",
                    "Event": () => {
                        objData.ShowDiv("SchoolType");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}