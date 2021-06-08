/**
* @name GetTabData
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetTabData(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": "TabbedPopupSample",
            "Id": "TaskQuestion",
            "Children": [
                {
                    "Text": "FirstTab",
                    "Id": "FirstTab",
                    "Event": () => {
                        objData.ShowDiv("FirstTab", objContext)
                    }
                },
                {
                    "Text": "SecondTab",
                    "Id": "SecondTab",
                    "Event": () => {
                        objData.ShowDiv("SecondTab", objContext)
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}