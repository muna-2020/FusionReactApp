//Objects required for module.
import Object_Cockpit_ObjectGenerator from '@shared/Object/c.Cockpit/ObjectGenerator/ObjectGenerator';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Gender from '@shared/Object/d.Extranet/4_Pupil/Gender/Gender';
import Object_Extranet_Teacher_ClassGroup from '@shared/Object/d.Extranet/3_Teacher/ClassGroup/ClassGroup';
import Object_Extranet_Teacher_Teacher, { GetIsAdminTeacher } from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';


/**
 * @name ClassAndPupil_ModuleProcessor
 * @summary Class for ClassAndPupil module display and manipulate.
 */
class ClassAndPupil_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Class",
        "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil",
            "Object_Cockpit_ObjectGenerator",
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name GetSchoolIdByApplicationType
     * @param {any} props props
     * @summary Gets school id based on the application type
     * @returns {*} id
     */
    GetSchoolIdByApplicationType(props) {
        let strUserId = props.ClientUserDetails.UserId;
        if (props.ClientUserDetails.ApplicationTypeId == "1") {
            strUserId = props.ClientUserDetails.TeacherDetails.uSchoolId;
        }
        return strUserId;
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //SchoolYear
        let objSchoolYearParams = {
            "SearchQuery": {
                "must":
                    [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        //SchoolYearPeriod
        let objSchoolYearPeriodParams = {
            "SearchQuery": {
                "must":
                    [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
            }
        };

        //ClassGroup
        let objClassGroupParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let arrObjectGeneratorParams = [];

        let objClassParams = {};

        if (this.IsSchoolOrAdminTeacher(props)) {
            arrObjectGeneratorParams = ["SchoolClassGrid", "SchoolPupilGrid"];
            objClassParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "nested": {
                                "path": "t_TestDrive_Member_Class_Teacher",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_TestDrive_Member_Class_Teacher.uSchoolId": this.GetSchoolIdByApplicationType(props)
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                "OutputColumns": ["uClassId", "vClassName", "cIsDeleted", "iSchoolYear", "uUserId", "iPupilCount", "cIsTestClass", "t_TestDrive_Member_Class_Teacher", "uSchoolYearPeriodId"]

            };
            let objTeacherParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Teacher_School.uSchoolId": this.GetSchoolIdByApplicationType(props),
                    "Type": "nested"
                },
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
                                                    "t_TestDrive_Member_Teacher_School.cIsDeleted": "N"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "vFirstName": {
                            "order": "asc"
                        }
                    }
                ],
                "OutputColumns": ["uTeacherId", "uSchoolId", "vFirstName", "vName", "iMainClientId", "vShortCut", "cIsExternalMember", "cIsExternal", "uUserId", "t_TestDrive_Member_Teacher_School", "iTitleId"]

            };
            Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams, 'Y');
            arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];
        }
        else if (props.JConfiguration.ApplicationTypeId === "1") {
            arrObjectGeneratorParams = ["TeacherClassGrid", "TeacherPupilGrid"];
            objClassParams = {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                    "Type": "nested"
                },
                "SortKeys": [
                    {
                        "dtCreatedOn": {
                            "order": "desc"
                        }
                    }
                ],
                "OutputColumns": ["uClassId", "vClassName", "cIsDeleted", "iSchoolYear", "uUserId", "iPupilCount", "cIsTestClass", "t_TestDrive_Member_Class_Teacher", "uSchoolYearPeriodId"]

            };
        }

        //TextResource Class and Pupil
        let arrResourceClassandPupilParams = ["/d.Extranet/2_School/Modules/ClassAndPupil/Class", "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil"];
        Object_Framework_Services_TextResource.Initialize(arrResourceClassandPupilParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //ObjectGenerator Class and Pupil        
        Object_Cockpit_ObjectGenerator.Initialize(arrObjectGeneratorParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ObjectGenerator];

        //SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        //Class
        Object_Extranet_Teacher_Class.Initialize(objClassParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //SchoolYearPeriod
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //ClassGroup
        Object_Extranet_Teacher_ClassGroup.Initialize(objClassGroupParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_ClassGroup];

        //Gender
        Object_Extranet_Pupil_Gender.Initialize({}, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Gender];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/ClassAndPupil.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css"
        ];
    }

    /**
    * @name IsSchoolOrAdminTeacher
    * @param {any} props props
    * @summary Checks if its school or teacher admin
    * @returns {*} returns boolean value
    */
    IsSchoolOrAdminTeacher(props) {
        let blnSchoolOrAdminTeacher = false;
        if (props.JConfiguration.ApplicationTypeId === "6" || props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
            blnSchoolOrAdminTeacher = true;
        }
        return blnSchoolOrAdminTeacher;
    }

    /**
     * @name GetTextResource
     * @param {any} objContext objContext
     * @summary Get the textresource and assign to an object as class and pupil property
     * @returns {*} returns object  
     */
    GetTextResource(objContext) {
        let objClassTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/ClassAndPupil/Class", objContext.props);
        let objPupilTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/ClassAndPupil/Pupil", objContext.props);
        return {
            "Class": objClassTextResource,
            "Pupil": objPupilTextResource
        };
    }

    /**
     * @name GetGridConfiguration
     * @param {any} objContext objContext
     * @summary This method gets the objectgenerator for class and pupil and assign it to the object
     * @returns {*} returns object
     */
    GetGridConfiguration(objContext) {
        let strClassObjectName = "";
        let strPupilbjectName = "";
        if (objContext.ClassAndPupil_ModuleProcessor.IsSchoolOrAdminTeacher(objContext.props)) {
            strClassObjectName = "SchoolClassGrid";
            strPupilbjectName = "SchoolPupilGrid";
        }
        else {
            strClassObjectName = "TeacherClassGrid";
            strPupilbjectName = "TeacherPupilGrid";
        }
        let arrClassGridConfigurationData = DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;" + strClassObjectName).Data;
        let arrPupilGridConfigurationData = DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;" + strPupilbjectName).Data;
        let objClassGridConfiguration = arrClassGridConfigurationData !== undefined ? arrClassGridConfigurationData[0] : {};
        let objPupilGridConfiguration = arrPupilGridConfigurationData !== undefined ? arrPupilGridConfigurationData[0] : {};
        return {
            "Class": objClassGridConfiguration,
            "Pupil": objPupilGridConfiguration
        };
    }

    /**
     * @name UpdateInformationPopupStatus
     * @summary updates the ShowInformation bar status
     * @param {any} objContext
     */
    UpdateInformationPopupStatus(objContext) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [
                {
                    vValue: objContext.state.blnShowInformationBar ? "N" : "Y", //changing status here
                    vKey: "ShowInformationBar_ClassPupil"
                }
            ]
        };
        let objUserPreferenceEditParams = {
            "ForeignKeyFilter": {
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            ["vEditData"]: objNewUserPreference
        };
        Object_Cockpit_UserPreference.EditData(objUserPreferenceEditParams, (response) => {
            ApplicationState.SetProperty("UserPreferenceObject", response[0]);
            objContext.dispatch({ type: 'SET_STATE', payload: { blnShowInformationBar: !objContext.state.blnShowInformationBar } });
        })

    }


    /**
     * @name IsGridEditable
     * @param {any} objContext
     * @summary Checks if the logged in user is Of Non Admin External User and returns if Class and Pupil grids should be editable or not
     */
    IsGridEditable(objContext) {
        let blnEditableGrid = true;
        if (objContext.props.ClientUserDetails.TeacherDetails != undefined && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == 'Y') {
            let blnIsAdminTeacher = GetIsAdminTeacher(objContext.props.ClientUserDetails.TeacherDetails, "");
            if (!blnIsAdminTeacher) {
                blnEditableGrid = false;
            }
        }
        return blnEditableGrid;
    }

    /**
     * @name GetYellowBarTextForClass
     * @param {any} objClassTextResource
     * @summary Gets Information Text for YellowBar
     */
    GetYellowBarTextForClass(objContext, objClassTextResource) {
        let stryellowBarText = objClassTextResource["YellowBarText"];
        if (objContext.props.JConfiguration.ApplicationTypeId === "1" && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y") {
            let blnIsAdminTeacher = GetIsAdminTeacher(objContext.props.ClientUserDetails.TeacherDetails, "");
            if (blnIsAdminTeacher) {
                yellowBarText = objClassTextResource["YellowBarTextForExternalAdminUser"];
            } else {
                yellowBarText = objClassTextResource["YellowBarTextForExternalUser"];
            }
        }
        return stryellowBarText;
    }

}

export default ClassAndPupil_ModuleProcessor;

