//Application state Classes
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name ApplicationLog
 * @summary Application Log Service
 */
class ApplicationLog {

    Log(strLog, strGroupName = null) {
        if (strGroupName !== null) {
            let arrLogData = ApplicationState.GetProperty("ApplicationLog");
            if (!arrLogData || arrLogData === null) {
                arrLogData = [];
            }
            arrLogData = [
                ...arrLogData,
                {
                    "GroupId": UniqueId.GetUniqueId(),
                    "GroupName": strGroupName,
                    "LogData": [strLog]
                }
            ];
            ApplicationState.SetProperty("ApplicationLog", arrLogData);
        }
        else {
            let arrLogData = ApplicationState.GetProperty("ApplicationLog");
            if (arrLogData && arrLogData.length > 0) {
                arrLogData = arrLogData.map((objData, intIndex) => {
                    if (intIndex === arrLogData.length - 1) {
                        return {
                            ...objData,
                            ["LogData"]: [
                                ...objData["LogData"],
                                strLog
                            ]
                        };
                    }
                    else {
                        return {
                            ...objData
                        };
                    }
                });
                ApplicationState.SetProperty("ApplicationLog", arrLogData);
            }
            else {
                console.log("Please create a log group");
            }
        }
    }
}

export default ApplicationLog;
