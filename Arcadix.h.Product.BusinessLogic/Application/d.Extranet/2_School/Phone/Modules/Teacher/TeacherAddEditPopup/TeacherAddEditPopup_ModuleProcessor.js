/**
 * @name TeacherAddEditPopup_ModuleProcessor.
 * @summary business layer for teacher import data.
 * */
class TeacherAddEditPopup_ModuleProcessor  extends ExtranetBase_ModuleProcessor {

    
    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Teacher"];
    }


    // /**
    // * @name GetDynamicStlyes
    // * @param {object} props props
    // * @returns {object} DynamicStlyes
    // */
    // GetDynamicStyles(props) {
    //     return [
    //         props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/Teacher/Teacher.css"
    //     ];
    // }

    
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
    * @name GetFormMetaData
    * @param {object} objContext Passes context object
    * @summary Forms the meta data required by the form
    * @returns {object} Meta Data
    */
     GetFormMetaData(objContext) {
        let arrMetaData = [];
        let arrObjectGenerator = DataRef(objContext.props.Data.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;PhoneTeacherAddEdit")["Data"];

        if (arrObjectGenerator !== undefined && arrObjectGenerator.length > 0) {
            const objConfigurationData = DataRef(objContext.props.Data.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;PhoneTeacherAddEdit")["Data"][0];
            arrMetaData = JSON.parse(JSON.stringify(objConfigurationData.t_Framework_ObjectConfiguration_Column));
        }

        //When edit mode - check if object is activated (cIsDeleted == 'N') then blnReadOnly is true. else, If deactivated then it's false. 
        //when add mode - blnReadOnly is false
        let blnReadOnly = objContext.props.Data.blnIsEdit ?
             objContext.props.Data.objData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "N" ? false : true  
             : false
        if(blnReadOnly) {
            arrMetaData = arrMetaData.map(objMetaData =>  { 
              return  {...objMetaData, cIsDisabled : 'Y'}
            })
        }
        return {
            HeaderData: arrMetaData,
            ValidationDivName: "divAddEditTeacherErrorMessage",
            AddForm: true
        };
    }

    /**
    * @name GetFormData
    * @param {object} objContext Passes context object
    * @summary Forms the data required by the form
    * @returns {object} Form Data
    */
    GetFormData(objContext) {
        let objTeacher = objContext.props.Data.objData
        return {
            FormData: objTeacher,
            // LabelData: objContext.TeacherAddEditPopup_ModuleProcessor.GetLabelData(objContext),
            DropDownData: objContext.TeacherAddEditPopup_ModuleProcessor.GetDropDownData(objContext)
        };
    }

     /**
    * @name GetDropDownData
    * @param {object} objContext Passes context object
    * @summary Returns the dropdown data required for the form. 
    * @returns {object} DropDown Data
    */
    GetDropDownData(objContext) {
        const arrTitleData = DataRef(objContext.props.Data.Object_Extranet_School_Title)["Data"];
        
        return {
            iTitleId: {
                "ValueColumn": "iTitleId",
                "DisplayColumn": "vTitleName",
                "cISLanguageDependent": "Y",
                "DependingTableName": "t_TestDrive_Member_Title_Data",
                "Data": arrTitleData
            }
        };
    }

    /**
    * @name GetFormResourceData
    * @param {object} objTextResource Passes Text resource object
    * @summary Forms the resource data required by the form
    * @returns {object} Resource Data
    */
    GetFormResourceData(objTextResource) {
        return {
            Text: objTextResource,
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    
    /**
    * @name SaveMethod
    * @param {object} objContext Passes context object
    * @param {object} objEditedData Passes EditedData object
    * @param {function} funCallBack CallBack function
    * @summary On click save button this method will get called. in this method calling  EditData or AddData basedon cIsNew property from recieved params
    */
    SaveMethod(objContext, RefMethods) {
        var blnIsFormValid = RefMethods.IsValid().blnIsValid;
        if (blnIsFormValid) {
            var objEditedData = RefMethods.GetSaveData();

            objEditedData["current"] = null;

            if (objEditedData != undefined) {
                if (objContext.props.Data.blnIsEdit) {
                    let objSaveData = DataRef(objContext.props.Data.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.Data.ClientUserDetails.UserId)["Data"].find(x => x.uTeacherId == objEditedData.uTeacherId);
                    if (objSaveData != undefined) {
                        objContext.TeacherAddEditPopup_ModuleProcessor.EditData(objContext, { ...objSaveData, ...objEditedData });
                    }
                }
                else {
                    let objNewTeacher = {
                        iTitleId: objEditedData.iTitleId,
                        vFirstName: objEditedData.vFirstName,
                        vName: objEditedData.vName,
                        vPhoneSchool: objEditedData.vPhoneSchool,
                        vPhonePrivate: objEditedData.vPhonePrivate,
                        vEmail: objEditedData.vEmail,
                        uSchoolId: objContext.props.Data.ClientUserDetails.UserId,
                        vShortCut: objEditedData.vShortCut,
                        cIsSubjectExpertTeacherMarkedBySchool: objEditedData.cIsSubjectExpertTeacherMarkedBySchool,
                        t_TestDrive_Member_Teacher_School: [{
                            "uSchoolId": objContext.props.Data.ClientUserDetails.UserId,
                            "cIsAdmin": 'N'
                        }]
                    };
                    objContext.TeacherAddEditPopup_ModuleProcessor.AddData(objContext, objNewTeacher);
                }
            }
        } else {
            if (!RefMethods.IsValid().blnIsPasswordMatching) {
                objContext.dispatch({ type: 'SET_STATE', payload: { strPasswordMessage: Localization.TextFormatter(objTextResource, 'PasswordValidationMessage'), strImagePath: RefMethods.IsValid().strImagePath } });
            }
        }
    }

     /**
    * @name AddData
    * @param {object} objContext Passes context object
    * @param {object} data Teacher data
    * @param {function} funCallBack CallBack function
    * @summary Activating and deactivating teacher
    */
    AddData(objContext, data) {
        let objCallParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.Data.ClientUserDetails.UserId
            },
            "vAddData": data,
            "uUserId": objContext.props.Data.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Data.Object_Extranet_Teacher_Teacher.AddData(objCallParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                Popup.ClosePopup(objContext.props.Id);
            }
        });
    }

    /**    
    * @name EditData
    * @param {object} objContext Passes context object
    * @param {object} data Teacher data
    * @param {function} funCallBack CallBack function
    * @summary Edit teacher
    */
    EditData(objContext, data) {
        let objCallParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.Data.ClientUserDetails.UserId
            },
            "vEditData": [data],
            "uUserId": objContext.props.Data.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Data.Object_Extranet_Teacher_Teacher.EditData(objCallParams, (objReturn, cIsNewData) => {
            //this.SetRowsToSelect(objContext, data);
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                Popup.ClosePopup(objContext.props.Id);
            }
        });
    }

    
    /** 
    * @name Activate
    * @param {object} objContext Passes context object
    * @param {object} ActionObject passes ActionObject
    * @param {function} GetDisplayMode CallBackFunction to let the grid know that edit mode has changed to display mode
    * @summary Calling Activate method
    */
     Activate(objContext, ActionObject) {
        let arrEditData = {
            "uTeacherId": ActionObject["uTeacherId"],
            t_TestDrive_Member_Teacher_School: [
                { "uTeacherId": ActionObject["uTeacherId"], "uSchoolId": ActionObject["uSchoolId"], "cIsDeleted": "N" }
            ]
        };
        objContext.TeacherAddEditPopup_ModuleProcessor.EditData(objContext, arrEditData);
    }

    /** 
    * @name DeActivate
    * @param {object} objContext Passes context object
    * @param {object} ActionObject Passes ActionObject
    * @param {function} GetDisplayMode CallBackFunction to let the grid know that edit mode has changed to display mode
    * @summary Calling DeActivate method
    */
    DeActivate(objContext, ActionObject) {
        let arrDelete = [
            { "uTeacherId": ActionObject["uTeacherId"], "uSchoolId": ActionObject["uSchoolId"], "cIsDeleted": "Y" }
        ];
        objContext.TeacherAddEditPopup_ModuleProcessor.DeleteData(objContext, arrDelete);
    }

     /** 
    * @name DeleteData
    * @param {object} objContext Passes context object
    * @param {object} data Teacher data
    * @param {function} GetDisplayMode CallBackFunction to let the grid know that edit mode has changed to display mode
    * @summary Activating and deactivating teacher
    */
    DeleteData(objContext, data) {
        let objCallParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.Data.ClientUserDetails.UserId
            },
            "vDeleteData": [{
                t_TestDrive_Member_Teacher_School: data
            }]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Data.Object_Extranet_Teacher_Teacher.DeleteData(objCallParams, (objReturn, cIsNewData) => {
            // this.SetRowsToSelect(objContext, objReturn);
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                Popup.ClosePopup(objContext.props.Id);
            }
        });
    }


}

export default TeacherAddEditPopup_ModuleProcessor;