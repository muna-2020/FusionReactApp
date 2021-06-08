
//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_School_Title from '@shared/Object/d.Extranet/2_School/Title/Title';
import Object_Cockpit_ObjectGenerator from '@shared/Object/c.Cockpit/ObjectGenerator/ObjectGenerator';



/**
* @name TeacherProfile_ModuleProcessor
* @summary Class for TeacherProfile module display and manipulate.
*/
class TeacherProfile_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Teacher", "Object_Extranet_School_School", "Object_Extranet_School_Title", "Object_Cockpit_ObjectGenerator",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherProfile"
        ];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherProfile/TeacherProfile.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Blocks/FormGenerator/FormGenerator.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/DropDown/DropDown.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        // Teacher
        let objParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_Teacher.Initialize(objParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //School
        var objSchoolParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                        }
                    }]
            }
        };
        Object_Extranet_School_School.Initialize(objSchoolParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

        //Title
        Object_Extranet_School_Title.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Title];

        //ObjectGenerator
        Object_Cockpit_ObjectGenerator.Initialize(["TeacherProfile"]);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ObjectGenerator];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/3_Teacher/Modules/TeacherProfile"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }


    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "outletBand"]
        };
    }

    /**
    * @name GetDropDownData
    * @param {object} objContext Passes context object
    * @summary Returns the dropdown data required for the form. 
    * @returns {object} DropDown Data
    */
    GetDropDownData(objContext) {
        let arrTitleData = [];
        if (DataRef(objContext.props.Object_Extranet_School_Title)["Data"]) {
            arrTitleData = DataRef(objContext.props.Object_Extranet_School_Title)["Data"];
        }

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
    * @name GetLabelData
    * @param {object} objContext Passes context object
    * @summary Returns the label data required for the form. 
    * @returns {object} LabelData
    */
    GetLabelData(objContext) {
        let objTeacherData = {};
        let objSchoolData = {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            objTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"][0];
        }
        if (DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId)) {
            objSchoolData = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId)["Data"][0];
        }

        let objResourceData = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherProfile", objContext.props);
        objResourceData = objResourceData ? objResourceData : {};
        let strRole = "";
        if (objTeacherData.cIsExternalMember && objTeacherData.cIsExternalMember == "Y") {//  checking for external user.
            if (objTeacherData.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
                strRole = objResourceData["Admin"];
            } else {
                strRole = objResourceData["Admin_Normal"];
            }
        }
        return {
            "uSchoolId": objSchoolData.vSchoolName,
            "vRole": strRole
        };
    }

    /**
    * @name IsExternalUser
    * @param {object} objContext Passes context object
    * @summary Returns string "Y" if ExternalUser, else returns string "N"
    * @returns {object} strExternal
    */
    IsExternalUser(objContext) {
        let objTeacherData = {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            objTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"][0];
        }
        let strExternal = "N";
        if (objTeacherData.cIsExternalMember && objTeacherData.cIsExternalMember == "Y") {//  checking for external user.
            strExternal = "Y";
        }
        return strExternal;
    }

    /**
    * @name GetMetaData
    * @param {object} objContext Passes context object
    * @summary Returns the meta data for the teacher profile form
    * @returns {Array} arrColumnData
    */
    GetMetaData(objContext) {
        let objColumnData = {};
        let objTeacherData = {};
        if (DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;TeacherProfile")) {
            objColumnData = DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;TeacherProfile")["Data"][0];
        }
        if (DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            objTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"][0];
        }

        let arrColumnData = objColumnData.t_Framework_ObjectConfiguration_Column;

        if (objTeacherData.cIsExternalMember && objTeacherData.cIsExternalMember == "Y") {//  checking for external user.
            arrColumnData = [...arrColumnData,
            {
                vColumnName: "vRole",
                vDataType: "string",
                iDisplayOrder: 10,
                vTextResourcePage: "TeacherProfile",
                vTextResourceKey: "Role",
                vControlType: "label",
                TextResourceValue: "Role",
                IsMandatory: null,
                vValidationType: null,
                cShowMultiLanguage: null,
                vValidationKey: null
            }
            ];

            arrColumnData = arrColumnData ? arrColumnData.map(objColumnData => {
                switch (objColumnData.vColumnName) {
                    case 'vPhonePrivate':
                    case 'vPhoneSchool':
                    case 'vPassword':
                        return {
                            ...objColumnData,
                            cIsDisabled: "Y",
                            cIsHide: "Y"
                        };
                    default:
                        return {
                            ...objColumnData,
                            cIsDisabled: "Y",
                            cIsHide: "N"
                        };
                }
            }) : [];
        }

        return arrColumnData;
    }

    /**
    * @name EditData
    * @param {object} objContext Passes context object
    * @param {object} RefMethods Passes RefMethods
    * @summary Edits the Teacher data
    */
    EditData(objContext, RefMethods, objTextResourceData) {
        var blnIsFormValid = RefMethods.IsValid().blnIsValid;
        if (blnIsFormValid) {
            var objSaveData = { ...RefMethods.GetSaveData() };
            objSaveData["current"] = "";
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Teacher_School",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Teacher_School.uTeacherId": objContext.props.ClientUserDetails.UserId
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                "vEditData": [objSaveData],
                "uUserId": objContext.props.ClientUserDetails.UserId
            };
            objContext.dispatch({ type: 'SET_STATE', payload: { strPasswordMessage: "" } });
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Extranet_Teacher_Teacher.EditData(objParams, (objReturn, cIsNewData) => {
                if (cIsNewData) {
                    // objContext.dispatch({ type: 'SET_STATE', payload: { strPasswordMessage: "" } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }
            });
        }
        else {
            if (!RefMethods.IsValid().blnIsPasswordMatching) {
                objContext.dispatch({ type: 'SET_STATE', payload: { strPasswordMessage: Localization.TextFormatter(objTextResourceData, 'PasswordValidationMessage'), strImagePath: RefMethods.IsValid().strImagePath } });
            }
        }
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown" ],
            "Files": []
        }
    }
}

export default TeacherProfile_ModuleProcessor;