/**
 * @name GetAddEditSchoolYearTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTeacherManagementTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "TeacherManagementMain"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "TeacherManagementMain"),
                    "Id": "TeacherManagement",
                    "Event": () => {
                        objData.ShowDiv("TeacherManagement");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}