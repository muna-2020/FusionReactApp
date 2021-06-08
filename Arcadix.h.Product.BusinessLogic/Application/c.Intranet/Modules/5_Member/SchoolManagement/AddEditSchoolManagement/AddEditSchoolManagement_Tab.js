/**
 * @name GetAddEditSchoolManagmentTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditSchoolManagmentTab(objContext, objData) {
    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "General"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "General"),
                    "Id": "SchoolManagment",
                    "Event": () => {
                        objData.ShowDiv("SchoolManagment");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}