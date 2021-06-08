//Objects required for module.
import Object_Extranet_School_TimeTableClassTime from '@shared/Object/d.Extranet/2_School/TimeTableClassTime/TimeTableClassTime';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Extranet_School_SchoolSubject from '@shared/Object/d.Extranet/2_School/SchoolSubject/SchoolSubject';


/**
* @name TimeTableSettings_ModuleProcessor
* @summary Class for TimeTableSettings module display and manipulate.
*/
class TimeTableSettings_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject"];
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

        //Text Resource for TimeTableClassTime & TimeTableSubject
        //let arrResourceParams = ["/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime","/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject"];
        let arrResourceParams = [{ FilePath: "/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableClassTime", ReturnDataOnServerRender: "Y" }, { FilePath: "/d.Extranet/2_School/Modules/TimeTableSettings/TimeTableSubject", ReturnDataOnServerRender: "N" }];
        //Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        Object_Framework_Services_TextResource.InitializeDataReturnWithSSR(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];


        let strUserId = props.ClientUserDetails.UserId;
        if (props.ClientUserDetails.ApplicationTypeId === "1")
            strUserId = props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId;


        //TimeTableClassTime
        let objTimeTableClassTimeParams = {
            "ForeignKeyFilter": {
                "uUserId": strUserId
            },
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
            ],
            "OutputColumns": []
        };
        Object_Extranet_School_TimeTableClassTime.Initialize(objTimeTableClassTimeParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_TimeTableClassTime];

        //Subject 
        let objDefaultSubjectsParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iParentSubjectId": 0
                        }
                    },
                    {
                        "match": {
                            "cIsLearnCoacherSubject": "Y"
                        }
                    },
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
        Object_Intranet_Taxonomy_Subject.Initialize(objDefaultSubjectsParams,"Y");
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];        

        //SchoolSubject
        let objParamsForSchoolSubjects = {
            "ForeignKeyFilter": {
                "uUserId": strUserId
            },
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
        Object_Extranet_School_SchoolSubject.Initialize(objParamsForSchoolSubjects, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_SchoolSubject];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/TimeTableSettings/TimeTableSettings.css"
        ];
    }

    /**
     * @name GetMetaData
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetTimeTableFillHeightMetaData(){
        return {
            HeaderIds: ["Header", "TopSpacing", "ErrorMsg"]
        };
    }
}

export default TimeTableSettings_ModuleProcessor;