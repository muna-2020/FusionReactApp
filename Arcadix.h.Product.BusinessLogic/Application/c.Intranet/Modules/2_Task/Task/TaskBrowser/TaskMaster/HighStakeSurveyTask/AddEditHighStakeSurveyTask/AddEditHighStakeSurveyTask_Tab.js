
/**
 * @name GetAddEditHighStakeSurveyTaskTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditHighStakeSurveyTaskTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Save"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Task"),
                    "Id": "TaskDiv",
                    "Event": () => {
                        objData.ShowDiv("TaskDiv");
                    }
                },
                {
                    "Text": Localization.TextFormatter(objTextResource, "DevelopmentHistory"),
                    "Id": "DevelopmentHistoryDiv",
                    "Event": () => {
                        objData.ShowDiv("DevelopmentHistoryDiv");
                    }
                }
            ]
        },
        {
            "Text": Localization.TextFormatter(objTextResource, "SubjectArea"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "SubjectArea"),
                    "Id": "SubjectAreaDiv",
                    "Event": () => {
                        objData.ShowDiv("SubjectAreaDiv");
                    }
                }
            ]
        },
        {
            "Text": Localization.TextFormatter(objTextResource, "Audit"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Audit"),
                    "Id": "AuditDiv",
                    "Event": () => {
                        objData.ShowDiv("AuditDiv");
                    }
                }
            ]
        }   
    ];   

    return arrContentData;
}