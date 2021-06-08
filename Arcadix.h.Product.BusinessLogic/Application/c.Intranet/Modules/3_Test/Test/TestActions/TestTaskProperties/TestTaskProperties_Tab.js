/**
* @name GetTabData
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetTabData(objContext, objData) {
    let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props)
    let arrContentData = [
        {//Group1
            "Text": objTextResource["TestAufgaben"],
            "Id": "TestAufgaben",
            "Children": [
                {
                    "Text": objTextResource["Hierarchy"],
                    "Id": "Hierarchy",
                    "Event": () => {
                        objData.ShowDiv("Hierarchy", objContext)
                    }
                },
                {
                    "Text": objTextResource["Index"],
                    "Id": "Index",
                    "Event": () => {
                        objData.ShowDiv("Index", objContext)
                    }
                },
                {
                    "Text": objTextResource["Navigation"],
                    "Id": "Navigation",
                    "Event": () => {
                        objData.ShowDiv("Navigation", objContext)
                    }
                },
                {
                    "Text": objTextResource["Time"],
                    "Id": "Time",
                    "Event": () => {
                        objData.ShowDiv("Time", objContext)
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}