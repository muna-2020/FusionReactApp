//Objects required for module.
import Extranet_Teacher_ImportData from '@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/ImportData/ImportData_Module';

/**
* @name ImportData_ModuleProcessor
* @summary Class for ImportData module display and manipulate.
*/
class ImportData_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Teacher"];
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Teacher/ImportData.css"
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
       * @name LoadInitialData
       * @param {object} objContext context object
       * @summary Calls the Queue and Execute method
       */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name ShowNextSlide
    * @param {object} objContext Passes Context object
    * @summary Shows next slide
    */
    ShowNextSlide(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strClassContent": "hideContent", "strClassNextSlideContent": "" } });
    }

    /**
    * @name ShowPreviousSlide
    * @param {object} objContext Passes Context object
    * @summary Shows previous slide
    */
    ShowPreviousSlide(objContext) {
        if (!objContext.state.blnShowReportHref) {
            objContext.dispatch({ type: "SET_STATE", payload: { "strClassContent": "", "strClassNextSlideContent": "hideContent" } });
        }
    }

    /**
    * @name ImportData
    * @param {object} objContext Passes Context object
    * @param {string} strFiles strFiles
    * @summary Imports data
    */
    ImportData(objContext, strFiles) {
        var arrFiles = JSON.parse(strFiles);
        var strFileName = arrFiles[0] ? arrFiles[0].FileName : "";
        var strSchoolId = ClientUserDetails.UserId;
        var objDataParamsGetProgressBarStatus =
        {
            "URL": "API/Object/Extranet/Teacher/Teacher/SaveTeacherDetailsFromExcel",
            "Params": {
                //to be used by the c# method
                ["SchoolId"]: ClientUserDetails.UserId,
                ["ImportExcelName"]: strFileName,
                //To update in redux
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Teacher_School.uSchoolId": strSchoolId,
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
            Extranet_Teacher_ImportData.SaveTeacherDetailsFromExcel(objDataParamsGetProgressBarStatus, (objReturnData) => {
                if (objReturnData) {
                    let objReturn = objReturnData["Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId];
                    let objCacheData = {
                        Filter: "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId,
                        Value: {
                            Data: objReturn["Data"],
                            TimeStamp: "",
                            PrimaryKeyName: "uTeacherId",
                            Count: objReturn["Data"].length
                        }
                    };
                    ArcadixCacheData.EditData("Object_Extranet_Teacher_Teacher", objCacheData, () => { });
                    objContext.dispatch({ type: "SET_STATE", payload: { "blnIsFileUploadAttempted": false, "objFileImported": objReturnData, "strReportFilePath": objReturn["ReportFilePath"], "blnShowReportHref": true, "blnIsReportGenerated": true } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }
            });
        }
    }

    /**
    * @name GetResourceData
    * @param {object} objContext Context object
    * @param {object} objTextResource objTextResource
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext, objTextResource) {
        let Text = {
            "UploadButtonText": Localization.TextFormatter(objTextResource, 'ImportFileUploadText') // Button text
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
            UploadSingle: 'N' //restrict to select only one file if Y
        };
    }

}

export default ImportData_ModuleProcessor;