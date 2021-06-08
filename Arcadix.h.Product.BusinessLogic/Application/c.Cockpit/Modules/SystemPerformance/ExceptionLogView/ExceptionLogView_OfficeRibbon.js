/**
 * @name GetClientHostUrlToolData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetExceptionLogViewOfficeRibbonData(objContext, objData) {
    var objTextResource = objData.objContext.props.Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ExceptionLogView", objData.objContext.props);
    return (
        [
            {//Group2
                "vGroupName": objTextResource.Course,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Course,
                        "uImageUrl": "Presentation.svg",//"down.svg",
                        "type": "single",
                        //"OnClick": () => StreamFile(objContext, "ExcelFile"),
                        "Href": GetStreamFileHref(objContext, "ExcelFile")
                    }
                ]
            },
            {//Group2
                "vGroupName": objTextResource.Course,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Course,
                        "uImageUrl": "Presentation.svg",//"down.svg",
                        "type": "single",
                        //"OnClick": () => StreamFile(objContext, "TextFile")
                        "Href": GetStreamFileHref(objContext, "TextFile")
                    }
                ]
            }
        ]
    );
}

/**
 * @name GetStreamFileHref
 * @param objContext objContext
 * @param strType strType File Ftype
 * @summary gets file reference.
 * @returns {object} return file reference.
 */
function GetStreamFileHref(objContext, strType) {
    var strDisplayFileName = ""
    var strFileType = strType;
    if (objContext.state.vType == "ElasticInsertFail" || objContext.state.vType == "ElasticUpdateFail" || objContext.state.vType == "ElasticDeleteFail") {
        strFileType = "TextFile";
    }
    if (strType == "TextFile") {
        strDisplayFileName = "Exception.txt";
    }
    else {
        strDisplayFileName = "Exception.xlsx";
    }

    let objParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iMainClientId": objContext.state.iMainClientId
                    }
                },
                {
                    "match": {
                        "iApplicationTypeId": objContext.state.iApplicationTypeId
                    }
                },
                {
                    "match": {
                        "dtFromDate": objContext.state.dtFromDate
                    }
                },
                {
                    "match": {
                        "dtToDate": objContext.state.dtToDate
                    }
                },
                {
                    "match": {
                        "vType": objContext.state.vType
                    }
                }
            ]
        },
        "RedisKey": FormRedisKey(objContext),
        "Type": objContext.state.blnDbData ? "DB" : "REDIS",
        "FileType": strFileType,
        "ErrorType": objContext.state.vType
    };
    var strParams = JSON.stringify(objParams);
    return objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/FileHandler/StreamFile?ClassName=ExceptionLogView&MethodName=ExportExcel&FileName=FileName&DisplayFileName=" + strDisplayFileName + "&MethodParams=" + strParams;
}

/**
 * @name FormRedisKey
 * @param objContext objContext
 * @summary returns formed redis key.
 * @returns {string} return redis key.
 */
const FormRedisKey = (objContext) => {
    var strKey = objContext.state.iMainClientId + ":{!@Date}" + (objContext.state.strHour == "*" ? "" : "-") + objContext.state.strHour + ":elog_" + objContext.state.vType;
    return strKey;
}
