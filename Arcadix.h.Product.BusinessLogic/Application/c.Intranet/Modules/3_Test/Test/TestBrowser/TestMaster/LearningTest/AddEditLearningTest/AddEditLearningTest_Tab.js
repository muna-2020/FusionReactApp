/**
* @name GetAddEditLearningTestTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditLearningTestTabData(objContext, objData) {
    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["General"],
            "Id": "General",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["General"],
                    "Id": "General",
                    "Event": () => { objData.ShowDiv("General") }
                },                
                {
                    "Text": objContext.props.Resource.Text["Algorithm"],
                    "Id": "Algorithm",
                    "Event": () => { objData.ShowDiv("Algorithm") }
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