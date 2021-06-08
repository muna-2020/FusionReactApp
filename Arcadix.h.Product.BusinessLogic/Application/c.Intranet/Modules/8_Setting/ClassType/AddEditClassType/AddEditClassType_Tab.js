/**
 * @name GetAddEditSchoolYearTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditClassTypeTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Klassentypen"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Klassentypen"),
                    "Id": "ClassType",
                    "Event": () => {
                        objData.ShowDiv("ClassType");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}