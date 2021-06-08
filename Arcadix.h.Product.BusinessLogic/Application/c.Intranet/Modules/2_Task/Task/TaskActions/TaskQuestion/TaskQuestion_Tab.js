/**
* @name GetTabData
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetTabData(objContext, objData) {
    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion", objContext.props)
    let arrContentData = [
        {//Group1
            "Text": objTextResource["TaskQuestion"],
            "Id": "TaskQuestion",
            "Children": [
                {
                    "Text": objTextResource["TaskQuestion"],
                    "Id": "TaskQuestion",
                    "Event": () => {
                        objData.ShowDiv("TaskQuestion", objContext)
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}