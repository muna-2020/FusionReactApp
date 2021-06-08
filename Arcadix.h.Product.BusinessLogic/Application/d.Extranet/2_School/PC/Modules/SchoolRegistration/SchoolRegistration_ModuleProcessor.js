//Objects required for module.
import SchoolRegistration_Module from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolRegistration/SchoolRegistration_Module';

/**
* @name SchoolRegistration_ModuleProcessor
* @summary Class for SchoolRegistration module display and manipulate.
*/
class SchoolRegistration_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_School_SchoolRegistration"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        SchoolRegistration_Module.GetData({}, objReturnData => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSchoolRegistration": objReturnData["Arcadix_Extranet_School_SchoolRegistration"] } });
        });
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
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolRegistration/SchoolRegistration.css",
            JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
            JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/DropDown/DropDown.css",
            JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/Button/Button.css"
        ];
    }

    /**
* @name GetPrefetchFiles
* @param {object} props props
* @returns {object} PrefetchFiles
*/
    GetPrefetchFiles(props) {
        return {
            "Components": ["Form"],
            "Files": []
        }
    }

    /**
    * @name GetDropDownData
    * @param {object} objContext Passes context object
    * @summary Returns the dropdown data required for the form. 
    * @returns {object} DropDown Data
    */
    GetDropDownData(objContext) {
        const arrSchoolTypeData = [{
            iSchoolTypeId: -1,
            iDisplayOrder: 0,
            t_TestDrive_Member_School_SchoolType_Data: [{ iLanguageId: 3, vSchoolTypeName: "bitte wählen" }]
        },
        ...objContext.state.objSchoolRegistration.Object_Extranet_School_SchoolType];

        const arrTitleData = [{
            iTitleId: -1,
            iDisplayOrder: 0,
            t_TestDrive_Member_Title_Data: [{ iTitleId: -1, vTitleName: "bitte wählen", iLanguageId: 3 }]
        },
        ...objContext.state.objSchoolRegistration.Object_Extranet_School_Title];
        let blnStellwerk = QueryString.GetQueryStringValue("Stellwerk") == 'Y';
        let arrTempStateData = objContext.state.objSchoolRegistration.Object_Extranet_State_State;
        if (objContext.props.JConfiguration.MainClientid == "115" && !blnStellwerk) {
            arrTempStateData = arrTempStateData.filter(item => item["iStateId"] != "598")
        }
        let arrStateData = [{
            iStateId: -1,
            iDisplayOrder: 0,
            t_TestDrive_Member_State_Data: [{ iLanguageId: 3, vShortStateName: "bitte wählen", vStateName: "bitte wählen" }]
        },
        ...arrTempStateData];

        return {
            iSchoolTypeId: {
                "ValueColumn": "iSchoolTypeId",
                "DisplayColumn": "vSchoolTypeName",
                "cISLanguageDependent": "Y",
                "DependingTableName": "t_TestDrive_Member_School_SchoolType_Data",
                "Data": arrSchoolTypeData
            },
            iTitleId: {
                "ValueColumn": "iTitleId",
                "DisplayColumn": "vTitleName",
                "cISLanguageDependent": "Y",
                "DependingTableName": "t_TestDrive_Member_Title_Data",
                "Data": arrTitleData
            },
            iStateId: {
                "ValueColumn": "iStateId",
                "DisplayColumn": "vStateName",
                "cISLanguageDependent": "Y",
                "DependingTableName": "t_TestDrive_Member_State_Data",
                "Data": arrStateData
            }
        };
    }

    /**
    * @name GetFormMetaData
    * @param {object} objContext Passes context object
    * @summary Forms the meta data required by the form
    * @returns {object} Meta Data
    */
    GetFormMetaData(objContext) {
        const objConfigurationData = objContext.state.objSchoolRegistration.Object_Cockpit_ObjectGenerator[0];
        let arrMetaData = JSON.parse(JSON.stringify(objConfigurationData.t_Framework_ObjectConfiguration_Column));
        return {
            HeaderData: arrMetaData,
            ValidationDivName: "divSchoolProfileErrorMessage",
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
        return {
            FormData: {
                "vSchoolName": "",
                "iStateId": -1,
                "iTitleId": -1,
                "vFirstName": "",
                "vName": "",
                "vStreet": "",
                "iZIPCode": null,
                "vTown": "",
                "vPhone": "",
                "vEmail": "",
                "vAnnotation": "",
                "cIsDeleted": "N",
                "iSchoolTypeId": -1
            },
            DropDownData: objContext.SchoolRegistration_ModuleProcessor.GetDropDownData(objContext)
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
            SkinPath: JConfiguration.ExtranetSkinPath,
            DropDownImagePath: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/angle_down_white.png"
        };
    }

    /**
    * @name SaveData
    * @param {object} objContext Context object
    * @param {object} RefMethods Passes RefMethods
    * @summary Adds the school entity
    */
    SaveData(objContext, RefMethods) {
        var blnIsFormValid = RefMethods.IsValid().blnIsValid;
        if (blnIsFormValid) {
            let blnStellwerk = QueryString.GetQueryStringValue("Stellwerk") == 'Y';
            var objSaveData = RefMethods.GetSaveData();
            objSaveData["current"] = "";
            objSaveData["cIsStellwerk"] = blnStellwerk ? 'Y' : 'N';
            let objParams = {
                "Params": {
                    "vAddData": objSaveData,
                    uUserId: "00000000-0000-0000-0000-000000000000"
                }

            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            SchoolRegistration_Module.AddData(objParams, (objReturn) => {
                console.log("objReturn ", objReturn);
                if (objReturn["Arcadix_Extranet_School_SchoolRegistration"].IsSchoolExists && objReturn["Arcadix_Extranet_School_SchoolRegistration"].IsSchoolExists == "Y") {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: 'SET_STATE', payload: { blnEmailAlreadyRegistered: true } });
                } else {
                    if (objReturn["Arcadix_Extranet_School_SchoolRegistration"].length > 0) {
                        ApplicationState.SetProperty("blnShowAnimation", false);
                        objContext.dispatch({ type: 'SET_STATE', payload: { blnShowLoginLink: true } });
                    }
                }

            });
        }

    }

}

export default SchoolRegistration_ModuleProcessor;