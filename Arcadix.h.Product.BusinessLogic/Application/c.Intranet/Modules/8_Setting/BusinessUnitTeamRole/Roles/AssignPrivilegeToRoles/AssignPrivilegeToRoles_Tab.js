/**
 * @name GetAssignPrivilegeToRolesTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAssignPrivilegeToRolesTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "RoleManagement"),
            "Id": "RoleManagement",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Privileges"),
                    "Id": "Privileges",
                    "Event": () => {
                        objData.ShowDiv("Privileges");
                    }
                },
                {
                    "Text": Localization.TextFormatter(objTextResource, "SystemPrivilege"),
                    "Id": "SystemPrivilege",
                    "Event": () => {
                        objData.ShowDiv("SystemPrivilege");
                    }
                },
                {
                    "Text": Localization.TextFormatter(objTextResource, "Navigation"),
                    "Id": "Navigation",
                    "Event": () => {
                        objData.ShowDiv("Navigation");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}