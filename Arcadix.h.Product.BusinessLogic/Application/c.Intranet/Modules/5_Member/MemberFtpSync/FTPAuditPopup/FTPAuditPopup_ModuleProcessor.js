//Module related imports
import Object_Framework_SystemTracking_DataAudit from '@shared/Object/a.Framework/SystemTracking/DataAudit/DataAudit';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';

/**
 * @name FTPAuditPopup_ModuleProcessor
 * @param NA
 * @summary Class for Audit display.
 * @return NA
 */
class FTPAuditPopup_ModuleProcessor {

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Loads the Initial FTP Audit data
     */
    LoadInitialData(objContext) {
        this.GetObjectDetails(objContext.props.Data.ObjectType, objContext.props.Data.ExternalSourceId, objContext);   
    }

    /**
     * @name GetObjectDetails
     * @param {string} strObjectType ObjectType to get details
     * @param {string} strExternalSourceId ExternalSourceId
     * @param {object} objContext Context object
     * @summary Gets details from respective Object
     */
    GetObjectDetails(strObjectType, strExternalSourceId, objContext) {
        switch (strObjectType.toLowerCase()) {
            case "schule": {
                let objSchoolParams = {
                    "SearchQuery": {
                        "must": [
                            {
                                "nested": {
                                    "path": "t_TestDrive_Member_school_ExternalSourceMapping",
                                    "query": {
                                        "bool": {
                                            "must": [
                                                {
                                                    "match": {
                                                        "t_TestDrive_Member_school_ExternalSourceMapping.uSchoolExternalSourceId": strExternalSourceId
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }                                
                            }
                        ]
                    },                    
                    "OutputColumns": ["uSchoolId"]
                };
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Extranet_School_School.GetData(objSchoolParams, (objReturnData) => {
                    let arrSchoolData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
                    let strPrimaryKeyValue = arrSchoolData && arrSchoolData[0] ? arrSchoolData[0]["uSchoolId"] : "";
                    let strObjectKey = "Object_Extranet_School_School";
                    this.GetAuditData(strPrimaryKeyValue, strObjectKey, objContext)
                    //ApplicationState.SetProperty("blnShowAnimation", false);                    
                }, true);
                break;
            }
            case "lehrperson": {
                let objTeacherParams = {
                    "SearchQuery": {
                        "must": [
                            {
                                "nested": {
                                    "path": "t_TestDrive_Member_Teacher_ExternalSourceMapping",
                                    "query": {
                                        "bool": {
                                            "must": [
                                                {
                                                    "match": {
                                                        "t_TestDrive_Member_Teacher_ExternalSourceMapping.uTeacherExternalSourceId": strExternalSourceId
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                } 
                            }
                        ]
                    },
                    "OutputColumns": ["uTeacherId"]
                };
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Extranet_Teacher_Teacher.GetData(objTeacherParams, (objReturnData) => {
                    let arrTeacherData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
                    let strPrimaryKeyValue = arrTeacherData && arrTeacherData[0] ? arrTeacherData[0]["uTeacherId"] : "";
                    let strObjectKey = "Object_Extranet_Teacher_Teacher";
                    this.GetAuditData(strPrimaryKeyValue, strObjectKey, objContext)
                    //ApplicationState.SetProperty("blnShowAnimation", false);                   
                }, true);
                break;
            }
            case "lernende": {
                let objPupilParams = {
                    "SearchQuery": {
                        "must": [
                            {
                                "nested": {
                                    "path": "t_TestDrive_Member_Pupil_ExternalSourceMapping",
                                    "query": {
                                        "bool": {
                                            "must": [
                                                {
                                                    "match": {
                                                        "t_TestDrive_Member_Pupil_ExternalSourceMapping.uPupilExternalSourceId": strExternalSourceId
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                } 
                            }
                        ]
                    },
                    "OutputColumns": ["uPupilId"]
                };
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Extranet_Pupil_Pupil.GetData(objPupilParams, (objReturnData) => {
                    let arrPupilData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
                    let strPrimaryKeyValue = arrPupilData && arrPupilData[0] ? arrPupilData[0]["uPupilId"] : "";
                    let strObjectKey = "Object_Extranet_Pupil_Pupil";
                    this.GetAuditData(strPrimaryKeyValue, strObjectKey, objContext)
                    //ApplicationState.SetProperty("blnShowAnimation", false);                   
                }, true);
                break;
            }                           
        }
    }

    /**
     * @name GetAuditData
     * @param {string} strPrimaryKeyValue PrimaryKeyValue
     * @param {string} strExternalSourceId ExternalSourceId
     * @param {object} objContext Context object
     * @summary Gets the Audit Data for corresponding PrimaryKeyValue of Current and Previous transaction if any
     */
    GetAuditData(strPrimaryKeyValue, strObjectKey, objContext) {
        let objAuditParams = {
           "PrimaryKeyValue": strPrimaryKeyValue,
            "ObjectKey": strObjectKey,
            "AuditType": "Extranet"           
        }
        Object_Framework_SystemTracking_DataAudit.GetData(objAuditParams, (objReturnData) => {

            if (objReturnData[Object.keys(objReturnData)[0]]["Data"].length > 0) {
                let arrFTPAuditData = objReturnData[Object.keys(objReturnData)[0]]["Data"].sort((obj1, obj2) => new Date(obj1["dtCreatedOn"]) - new Date(obj2["dtCreatedOn"]));
                
                let objCurrentTransactionData = { Transaction: "CurrentTransaction" }, objPrevTransactionData = { Transaction: "PreviousTransaction" }, intCurrentindex;
                arrFTPAuditData.forEach((objAuditData, index) => {
                    if (objAuditData.vTransactionId == objContext.props.Data.TransactionId) {
                        objCurrentTransactionData = { ...objAuditData, ...objCurrentTransactionData };
                        intCurrentindex = index;
                    }
                })
                if (objCurrentTransactionData && intCurrentindex != 0 ) {
                    objPrevTransactionData = { ...arrFTPAuditData[intCurrentindex - 1], ...objPrevTransactionData };
                }
                
                objContext.dispatch({ type: "SET_STATE", payload: { "arrFTPAuditData": arrFTPAuditData, arrFTPAuditDataToCompare: [objPrevTransactionData, objCurrentTransactionData], isAuditDataPresent : true} });
            }
            else {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            }
        })
    }    
}

export default FTPAuditPopup_ModuleProcessor;