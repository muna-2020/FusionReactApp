/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "TextBoxColumn",
            "vDataType": "string",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vTextResourceKey": "TextBoxColumn",
            "iWidth": 150,
            "iTabId":"FirstTab"
        },
        {
            "vColumnName": "LabelColumn",
            "vDataType": "string",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vTextResourceKey": "LabelColumn",
            "iWidth": 150,
            "iTabId": "FirstTab"
        }
        
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: null
    };
    return objMeta;
};