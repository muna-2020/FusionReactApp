/**
 * @name GetAddEditRolesTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditRolesTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "UserRoleName"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "UserRoleName"),
                    "Id": "UserRoleName",
                    "Event": () => {
                        objData.ShowDiv("UserRoleName");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}