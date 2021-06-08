/**
* @name GetAddEditHighStakeAdaptiveTestTabData
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditHighStakeAdaptiveTestTabData(objContext, objData) {
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
                    "Text": objContext.props.Resource.Text["Security"],
                    "Id": "Security",
                    "Event": () => { objData.ShowDiv("Security") }
                },
                {
                    "Text": objContext.props.Resource.Text["Algorithm"],
                    "Id": "Algorithm",
                    "Event": () => { objData.ShowDiv("Algorithm") }
                }, 
                {
                    "Text": objContext.props.Resource.Text["Adaptive"],
                    "Id": "Adaptive",
                    "Event": () => { objData.ShowDiv("Adaptive") }
                },
                {
                    "Text": objContext.props.Resource.Text["Timekeeping"],
                    "Id": "TimeKeeping",
                    "Event": () => { objData.ShowDiv("TimeKeeping") }
                },
                {
                    "Text": objContext.props.Resource.Text["TestCall"],
                    "Id": "TestCall",
                    "Event": () => { objData.ShowDiv("TestCall") }
                },
                {
                    "Text": objContext.props.Resource.Text["WelcomePage"],
                    "Id": "WelcomePage",
                    "Event": () => { objData.ShowDiv("WelcomePage") }
                },
                {
                    "Text": objContext.props.Resource.Text["Testpage"],
                    "Id": "TestPage",
                    "Event": () => { objData.ShowDiv("TestPage") }
                },
                {
                    "Text": objContext.props.Resource.Text["FinalPage"],
                    "Id": "FinalPage",
                    "Event": () => { objData.ShowDiv("FinalPage") }
                },
                {
                    "Text": objContext.props.Resource.Text["ResultPage"],
                    "Id": "ResultPage",
                    "Event": () => { objData.ShowDiv("ResultPage") }
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