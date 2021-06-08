//Objects required for module.
import Object_Cockpit_ObjectGenerator from '@shared/Object/c.Cockpit/ObjectGenerator/ObjectGenerator';


/**
 * @name Notes_ModuleProcessor
 * @summary Class for ClassAndPupil module display and manipulate.
 */
class ClassAndPupil_ModuleProcessor extends ExtranetBase_ModuleObject {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource", "Object_Cockpit_ObjectGenerator", "Object_Extranet_School_School"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.ClassAndPupil_ModuleProcessor.InitialDataParams(objContext.props));
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
            }
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
            }
        };

        let objClassGridConfigParams = {};
        let objPupilGridConfigParams = {};
        let objClassParams = {};
        if (props.JConfiguration.ApplicationTypeId === "6") {
            let objSchoolParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iMainClientId": props.ClientUserDetails.MainClientId
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                },
                "OutputColumns": ["vName", "vFirstName", "uSchoolId", "dtModifiedOn"]
            };

            Object_Extranet_School_School.Initialize(objSchoolParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];
        }

        if (IsSchoolOrAdminTeacher({ props })) {
            objClassGridConfigParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "vObjectName": "SchoolClassGrid"
                            }
                        }
                    ]
                }
            };
            objPupilGridConfigParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "vObjectName": "SchoolPupilGrid"
                            }
                        }
                    ]
                }
            };
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
                                                    "t_TestDrive_Member_Class_Teacher.uSchoolId": props.ClassAndPupil_ModuleProcessor.GetSchoolIdByApplicationType(props)
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            };
            let objTeacherParams= {
                "ForeignKeyFilter": {
                    "t_TestDrive_Member_Teacher_School.uSchoolId": props.ClassAndPupil_ModuleProcessor.GetSchoolIdByApplicationType(props),
                    "Type": "nested"
                }
            };            
            Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
            arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];
        }

        else if (JConfiguration.ApplicationTypeId === "1") {
            objClassGridConfigParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "vObjectName": "TeacherClassGrid"
                            }
                        }
                    ]
                }
            };
            objPupilGridConfigParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "vObjectName": "TeacherPupilGrid"
                            }
                        }
                    ]
                }
            };
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
                ]
            };
        }

        //TextResource Class
        let arrResourceClassParams = ["/d.Extranet/2_School/Modules/ClassAndPupil/Class"];
        Object_Framework_Services_TextResource.Initialize(arrResourceClassParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //TextResource Pupil
        let arrResourcePupilParams = ["/d.Extranet/2_School/Modules/ClassAndPupil/Pupil"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePupilParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //ObjectGenerator Class        
        Object_Cockpit_ObjectGenerator.Initialize(objClassGridConfigParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ObjectGenerator];

         //ObjectGenerator Pupil        
        Object_Cockpit_ObjectGenerator.Initialize(objPupilGridConfigParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ObjectGenerator];

        //SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        //Class
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //SchoolYearPeriod
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //ClassGroup
        Object_Extranet_Teacher_ClassGroup.Initialize(objClassGroupParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_ClassGroup];

        //Gender
        Object_Extranet_Pupil_Gender.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Gender];

        return arrDataRequest;
    }

    /**
     * 
     * @param {any} objContext
     */
    SchoolDataLoaded(objContext) {
        let blnDataLoaded = false;
        if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
            if (DataRef(objContext.props.school, "school;imainclientid;" + objContext.props.ClientUserDetails.MainClientId + ";cisdeleted;n")) {
                blnDataLoaded = true;
            }
        } else {
            blnDataLoaded = true;
        }
        return blnDataLoaded;
    }

    /**
     * 
     * @param {any} objContext
     */
    GetTextResource(objContext) {
        let objClassTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Class")["Data"][0]["Class"];
        let objPupilTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil")["Data"][0]["Pupil"];
        return {
            "Class": objClassTextResource,
            "Pupil": objPupilTextResource
        };
    }

    /**
     * 
     * @param {any} objContext
     */
    GetGridConfiguration(objContext) {
        let strClassObjectName = "";
        let strPupilbjectName = "";
        if (IsSchoolOrAdminTeacher(objContext)) {
            strClassObjectName = "SchoolClassGrid";
            strPupilbjectName = "SchoolPupilGrid";
        }
        else {
            strClassObjectName = "TeacherClassGrid";
            strPupilbjectName = "TeacherPupilGrid";
        }
        let arrClassGridConfigurationData = DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;" + strClassObjectName).Data;
        let arrPupilGridConfigurationData = DataRef(objContext.props.objectgenerator, "objectgenerator;vobjectname;" + strPupilbjectName).Data;
        let objClassGridConfiguration = arrClassGridConfigurationData[0];
        let objPupilGridConfiguration = arrPupilGridConfigurationData[0];
        return {
            "Class": objClassGridConfiguration,
            "Pupil": objPupilGridConfiguration
        };
    }

    /**
     * 
     * @param {any} props
     */
    GetSchoolIdByApplicationType(props) {
        let strUserId = props.ClientUserDetails.UserId;
        if (props.ClientUserDetails.ApplicationTypeId == "1") {
            strUserId = props.ClientUserDetails.TeacherDetails.uSchoolId;
        }
        return strUserId;
    }

    /**
     * 
     * @param {any} objContext
     */
    IsSchoolOrAdminTeacher(objContext) {
        let blnSchoolOrAdminTeacher = false;
        if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
            blnSchoolOrAdminTeacher = true;
        } else {
            if (objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
                blnSchoolOrAdminTeacher = true;
            }
        }
        return blnSchoolOrAdminTeacher;
    }

}

export default ClassAndPupil_ModuleProcessor;

