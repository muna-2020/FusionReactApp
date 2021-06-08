//Objects required for module.
import ImportPupilPopUp_Module from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp_Module';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';

/**
 * @name ImportPupilPopup_ModuleProcessor
 * @summary Class for ImportPupilPopup_ModuleProcessor module display and manipulate.
 */
class ImportPupilPopup_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of store objects used in the module
    * @returns {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Pupil_Pupil"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/ImportDataPupil.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        return [];
    }

    /**
     * @name ImportData
     * @param {*} objContext objContext
     * @param {*} strFiles strFiles
     * @summary Imports the pupil from pupil import sheet. 
     */
    ImportData(objContext, strFiles) {
        let arrFiles = JSON.parse(strFiles);
        let strFileName = arrFiles[0] ? arrFiles[0].FileName : "";
        let objClass = objContext.props.Data.ClassData;
        let strClassId = objClass["uClassId"];
        let iStateId = this.GetStateIdByApplicationType(objContext);
        let strTeacherId = objClass["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"];
        let objParamsImportPupil = {
            "Params": {
                ["ClassId"]: strClassId,
                ["ImportExcelName"]: strFileName,
                ["TeacherId"]: strTeacherId,
                ["StateId"]: iStateId,
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                    "Type": "nested"
                },
                "SortKeys": [
                    {
                        "dtCreatedOn": {
                            "order": "asc"
                        }
                    }
                ]
            }
        };
        if (strFileName !== "") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsFileUploadAttempted": true } });
            ImportPupilPopUp_Module.SavePupilDetailsFromExcel(objParamsImportPupil, (objReturnData) => {
                if (objReturnData) {
                    let strStateId = this.GetStateIdByApplicationType(objContext);
                    let objReturn = objReturnData["Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId];
                    let objCacheData = {
                        Filter: "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + strStateId,
                        Value: {
                            Data: objReturn["Data"],
                            TimeStamp: "",
                            PrimaryKeyName: "uPupilId",
                            Count: objReturn["Data"].length
                        }
                    };

                    this.UpdatePupilCount(objContext, [strClassId])

                    ArcadixCacheData.EditData("Object_Extranet_Pupil_Pupil", objCacheData, () => {
                        if (strClassId == ApplicationState.GetProperty("SelectedClassId")) {
                            ApplicationState.SetProperty("ImportedPupil", true)
                        }
                    });
                    if (strClassId == ApplicationState.GetProperty("SelectedClassId")) {
                        ApplicationState.SetProperty("ImportedPupil", true)
                    }
                    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsFileUploadAttempted": false, "objFileImported": objReturnData, "strReportFilePath": objReturnData["ReportFilePath"], "blnShowReportHref": true, "blnIsReportGenerated": true } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }
            });
        }
    }

    /**
     * @name UpdatePupilCount
     * @summary updates the pupil count to store
     * @param {any} objContext
     * @param {any} objResponse
     */
    UpdatePupilCount(objContext, arrClass) {
        let objParams = {
            ClassList: arrClass
        }
        Object_Extranet_Teacher_Class.UpdatePupilCount(objParams, (objResponse) => {
            let arrClassData = DataRef(objResponse, "Object_Extranet_Teacher_Class")["Data"];
            let strEnityKey = '';
            if (objContext.props.JConfiguration.ApplicationTypeId === "1")
                strEnityKey = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + ClientUserDetails.UserId;
            else
                strEnityKey = "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uSchoolId;" + this.GetSchoolIdByApplicationType(objContext.props);

            let objClassData = {
                Filter: strEnityKey,
                Value: {
                    Data: arrClassData,
                    TimeStamp: "",
                    PrimaryKeyName: "uClassId",
                    Count: arrClassData.length
                }
            };
            ArcadixCacheData.EditData("Object_Extranet_Teacher_Class", objClassData, () => {
            });
        })
    }

    /**
     * @name GetSchoolIdByApplicationType
     * @param {any} props props
     * @summary Get the selected School id based on applicationtype id
     * @returns {*} returns a string
     */
    GetSchoolIdByApplicationType(props) {
        let strUserId = ClientUserDetails.UserId;
        if (ClientUserDetails.ApplicationTypeId === "1") {
            strUserId = ClientUserDetails.TeacherDetails.uSchoolId;
        }
        return strUserId;
    }

    /**
     * @name ShowNextSlide
     * @param {*} objContext objContext
     * @summary Shows next slide on the click of arrow right button
     */
    ShowNextSlide(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "classContent": "hideContent", "classNextSlideContent": "" } });
    }

    /**
     * @name ShowPreviousSlide
     * @param {*} objContext objContext
     * @summary Shows next slide on the click of arrow left button
     */
    ShowPreviousSlide(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "classContent": "", "classNextSlideContent": "hideContent" } });
    }

    /**
     * @name GetResourceData
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceData(objTextResource) {
        let Text = {
            "UploadButtonText": Localization.TextFormatter(objTextResource, 'AddAttachmentText') // Button text
        };

        let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory

        return {
            Text,
            SkinPath
        };
    }

    /**
    * @name GetMetaData
    * @summary it returns the object of metadata
    * @returns {array} MetaData
    */
    GetMetaData() {
        return {
            ShowUploadedFiles: true, // To show details of uploaded files.
            UploadSingle: 'N', //restrict to select only one file if Y,
            ShowFileSize: 'Y'
        };
    }

    /**
    * @name GetStateIdByApplicationType
    * @summary returns the stateid based on Applicationtype.
    * @param {any} objContext
    */
    GetStateIdByApplicationType(objContext) {
        if (JConfiguration.ApplicationTypeId == "1") {
            return ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0]["iStateId"]
        } else {
            return ClientUserDetails.SchoolDetails["iStateId"]
        }
    }
}

export default ImportPupilPopup_ModuleProcessor;
