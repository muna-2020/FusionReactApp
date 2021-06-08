/**
 * @name GetAddEditSchoolYearTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditStateAdministratorTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Organisationsheiten"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Organisationsheiten"),
                    "Id": "StateAdministrator",
                    "Event": () => {
                        objData.ShowDiv("StateAdministrator");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}