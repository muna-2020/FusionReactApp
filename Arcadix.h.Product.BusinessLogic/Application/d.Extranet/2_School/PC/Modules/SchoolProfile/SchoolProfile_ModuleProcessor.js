//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_School_SchoolType from '@shared/Object/d.Extranet/2_School/SchoolType/SchoolType';
import Object_Extranet_School_Title from '@shared/Object/d.Extranet/2_School/Title/Title';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Cockpit_ObjectGenerator from '@shared/Object/c.Cockpit/ObjectGenerator/ObjectGenerator';


/**
* @name SchoolProfile_ModuleProcessor
* @summary Class for SchoolProfile module display and manipulate.
*/
class SchoolProfile_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_School_School", "Object_Extranet_School_SchoolType", "Object_Extranet_School_Title",
            "Object_Extranet_State_State", "Object_Cockpit_ObjectGenerator", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolProfile"];
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
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //School
        var objParamsProfileData = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": props.ClientUserDetails.UserId
                        }
                    }]
            }
        };
        Object_Extranet_School_School.Initialize(objParamsProfileData, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

        //SchoolType
        Object_Extranet_School_SchoolType.Initialize({}, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_SchoolType];

        //Title
        Object_Extranet_School_Title.Initialize({}, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Title];

        //State
        Object_Extranet_State_State.Initialize({}, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        //ObjectGenerator        
        Object_Cockpit_ObjectGenerator.Initialize(["SchoolProfile"], 'Y');
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ObjectGenerator];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/2_School/Modules/SchoolProfile"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetDynamicStlyes
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolProfile/SchoolProfile.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/DropDown/DropDown.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Blocks/FormGenerator/FormGenerator.css"
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
        const arrSchoolTypeData = DataRef(objContext.props.Object_Extranet_School_SchoolType)["Data"];
        const arrTitleData = DataRef(objContext.props.Object_Extranet_School_Title)["Data"];
        
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
            }
        };
    }

    /**
    * @name GetLabelData
    * @param {object} objContext Passes context object
    * @summary Returns the label data required for the form. 
    * @returns {object} LabelData
    */
    GetLabelData(objContext) {
        let objprofileData = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        if (objprofileData !== undefined)
            objprofileData = objprofileData[0];
        else
            objprofileData = { iStateId: 0 };

        const arrStateData = DataRef(objContext.props.Object_Extranet_State_State)["Data"];  


        var objStateData = {};

        if (arrStateData !== undefined) {
            arrStateData.map(itemState => {
                if (itemState.iStateId === objprofileData.iStateId) {
                    objStateData = itemState;
                }
            });
        }       

        return {
            iStateId: {
                "ValueColumn": "iStateId",
                "DisplayColumn": "vStateName",
                "cISLanguageDependent": "Y",
                "DependingTableName": "t_TestDrive_Member_State_Data",
                "Data": objStateData
            }
        };
    }

    /**
    * @name SaveData
    * @param {object} objContext Passes context object
    * @param {object} RefMethods Passes RefMethods
    * @summary Edits the school entity
    */
    SaveData(objContext, RefMethods) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolProfile", objContext.props);
        var blnIsFormValid = RefMethods.IsValid().blnIsValid;
         if (blnIsFormValid) {
             var objSaveData = RefMethods.GetSaveData();

             objSaveData["current"] = null;

             let objParams = {
                 "SearchQuery": {
                     "must": [
                         {
                             "match": {
                                 "uSchoolId": objContext.props.ClientUserDetails.UserId
                             }
                         }]
                 },
                 "vEditData": [objSaveData],
                 "uUserId": objContext.props.ClientUserDetails.UserId
             };
             ApplicationState.SetProperty("blnShowAnimation", true);
             Object_Extranet_School_School.EditData(objParams, (objReturn, cIsNewData) => {
                 if (cIsNewData) {
                     ApplicationState.SetProperty("blnShowAnimation", false);
                 }
             });
         }
         else {
             if (!RefMethods.IsValid().blnIsPasswordMatching) {
                 objContext.dispatch({ type: 'SET_STATE', payload: { strPasswordMessage: Localization.TextFormatter(objTextResource, 'PasswordValidationMessage'), strImagePath: RefMethods.IsValid().strImagePath } });
             }
         }
    }

    /**
    * @name GetMetaDataFillheightSchoolProfile
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetMetaDataFillheightSchoolProfile() {
        return {
            HeaderIds: ["Header", "outletBand"]
        };
    }

    /**
    * @name GetFormMetaData
    * @param {object} objContext Passes context object
    * @summary Forms the meta data required by the form
    * @returns {object} Meta Data
    */
    GetFormMetaData(objContext) {
        let arrMetaData = [];
        let arrObjectGenerator = DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;SchoolProfile")["Data"];

        if (arrObjectGenerator !== undefined && arrObjectGenerator.length > 0) {
            const objConfigurationData = DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;SchoolProfile")["Data"][0];
            arrMetaData = JSON.parse(JSON.stringify(objConfigurationData.t_Framework_ObjectConfiguration_Column));
        }
        
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

        let arrSchool = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        if (arrSchool === undefined)
            arrSchool = [];
        return {
            FormData: arrSchool[0],
            LabelData: objContext.SchoolProfile_ModuleProcessor.GetLabelData(objContext),
            DropDownData: objContext.SchoolProfile_ModuleProcessor.GetDropDownData(objContext)
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
}

export default SchoolProfile_ModuleProcessor;