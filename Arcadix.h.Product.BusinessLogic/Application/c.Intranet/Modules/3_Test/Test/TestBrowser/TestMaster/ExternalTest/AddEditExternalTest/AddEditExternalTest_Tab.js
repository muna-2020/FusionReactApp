/**
* @name GetAddEditExternalTestTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditExternalTestTabData(objContext, objData) {
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
                    "Text": objContext.props.Resource.Text["External"],
                    "Id": "External",
                    "Event": () => { objData.ShowDiv("External") }
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