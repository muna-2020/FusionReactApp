//Module Objects
import Extranet_School_TeacherLogin from '@shared/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/TeacherLogin_Module';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';


/**
 * @name TeacherLogin_ModuleProcessor
 * @summary Class for TeacherLogin module display and manipulate.
 */
class TeacherLogin_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_Teacher",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/TeacherLogin"];
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
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //TextResource
        let arrResourceParams = ["/d.Extranet/2_School/Modules/TeacherLogin"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Teacher
        let objParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SortKeys": [
                {
                    "vName": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_Teacher.Initialize(objParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];
        return arrDataRequest;
    }


    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/TeacherLogin/TeacherLogin.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css"
        ];
    }


    /**
     * @name MarkAll
     * @param {Boolean} blnCheckedEvent blnCheckedEvent
     * @param {Array} arrTeacherData TeacherData
     * @param {object} objContext objContext
     * @summary MarkAll function will add all the teacher id to the state.arrSelectedTeachers array and all the checkboxes will be checked and on uncheck the state array will be empty.
     */
    MarkAll(blnCheckedEvent, arrTeacherData, objContext) {
        let arrSelectedIds = [];
        if (blnCheckedEvent) {
            arrTeacherData.map(objTeacher => {
                arrSelectedIds = [...arrSelectedIds, objTeacher.uTeacherId];
            });
        } else {
            arrSelectedIds = [];
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { arrSelectedTeachers: arrSelectedIds } });
    }

    /**
     * @name CheckOrUncheckMainChaekbox
     * @param {Array} arrTeacherData arrTeacherData
     * @param {object} objContext objContext
     * @summary This method is to check and uncheck the main checkbox
     * @returns {*} Boolean Value
     */
    CheckOrUncheckMainCheckbox(arrTeacherData, objContext) {
        if (arrTeacherData.length > 0 && arrTeacherData.length === objContext.state.arrSelectedTeachers.length) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
      * @name OnClickCheckBox
      * @param {Boolean} blnCheckedEvent blnCheckedEvent
      * @param {Integer} intTeacherId intTeacherId
      * @param {object} objContext objContext
      * @summary On click of the checkbox event.target.value and teacher id is passed to update the state.arrSelectedTeachers array either add or delete the id passed based on blnCheckedEvent
      */
    OnClickCheckBox(blnCheckedEvent, intTeacherId, objContext) {
        let arrTempTeacherData = [];
        if (blnCheckedEvent) {
            if (!objContext.state.arrSelectedTeachers.includes(intTeacherId)) {
                arrTempTeacherData = [...objContext.state.arrSelectedTeachers, intTeacherId];
            }
        }
        else {
            arrTempTeacherData = objContext.state.arrSelectedTeachers.filter(objTempTeacherDataId => objTempTeacherDataId !== intTeacherId);
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { arrSelectedTeachers: arrTempTeacherData } });
    }

    /**
     * @name CheckOrUncheck
     * @param {Integer} intTeacherId intTeacherId
     * @param {object} objContext objContext
     * @summary This function returns a boolean value depending on state.arrSelectedTeachers array consists of the id passed in the function and based on the value checkbox will be checked or unchecked
     * @returns {*} Boolean value
     */
    CheckOrUncheck(intTeacherId, objContext) {
        if (objContext.state.arrSelectedTeachers.includes(intTeacherId)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name OnClickEmailPoup
     * @param {object} objContext objContext
     * @param {object} objTextResource objTextResource
     * @summary Popup call if any of the checkboxes are checked 
     */
    OnClickEmailPopup(objContext, objTextResource) {
        if (objContext.state.arrSelectedTeachers.length > 0) {
            Popup.ShowProgressBarPopup({
                "Data": {},
                "Meta": {
                    "Height": "auto",
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "Y",
                    "HasCancelButton": "Y",
                    "StartProgressOnLoad": true,
                    "CloseProgessBarOnComplete": "N"
                },
                "Resource": {
                    "Text": objTextResource,
                    "TextResourcesKey": "TeacherLoginProgressBarPopup",
                    "SkinPath": objContext.props.JConfiguration.ExtranetSkinPath
                },
                "Events": {
                    StartProgress: strProgressBarID => { objContext.TeacherLogin_ModuleProcessor.GenerateLogins(objContext, strProgressBarID); },
                    OnProgressComplete: (objProgressDetails) => {
                        objContext.dispatch({ type: 'SET_STATE', payload: { "arrSelectedTeachers": [] } });
                    }
                },
                "CallBacks": {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": "380px",
                    "Height": "auto",
                    "ShowHeader": true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.ExtranetSkinPath,
                    TextResourcesKey: "TeacherLoginErrorPopup"
                },
                Events: {},
                CallBacks: {}
            });
        }
    }

    /**
     * @name GenerateLogins
     * @param {object} objContext objContext
     * @param {String} strProgressBarID strProgressBarID
     * @summary Makes api call to send email
     */
    GenerateLogins(objContext, strProgressBarID) {
        var strSelectedTeacherIds = "";
        objContext.state.arrSelectedTeachers.map(objTeacher => {
            strSelectedTeacherIds += objTeacher + ",";
        });
        strSelectedTeacherIds = strSelectedTeacherIds.substring(0, strSelectedTeacherIds.length - 1);
        var objDataParamsProgressBarMethod = {
            ["TeacherIds"]: strSelectedTeacherIds,//"E92A7F5F-5C82-43E7-8743-001C5855F6CD,C0550931-94C2-429F-BD03-F70B141FDFF7,5C9808A6-4F53-4FC8-8396-3CB6AE7783C3",
            ["ProgressBarId"]: strProgressBarID,
            ["SchoolId"]: objContext.props.ClientUserDetails.UserId //"48A04201-9D1F-4533-8327-C69F2D4BDFBB",    
        };
        Extranet_School_TeacherLogin.SendEmail(objDataParamsProgressBarMethod, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name GetFillHeightMetaData
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "TopSpacing"],
            FooterIds: ["FooterTeacherLogin"]
        };
    }
}

export default TeacherLogin_ModuleProcessor;