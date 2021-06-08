
/**
 * @name GetAddEditCompetencyRangeTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditIntranetAdministratorTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "IntranetAdministrator"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "IntranetAdministrator"),
                    "Id": "IntranetAdministrator",
                    "Event": () => {
                        objData.ShowDiv("IntranetAdministrator");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}