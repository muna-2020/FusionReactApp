//Base class imports
import Teacher_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/Teacher/Teacher_ModuleProcessor";

//Objects required for module.
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_School_Title from '@shared/Object/d.Extranet/2_School/Title/Title';
import Object_Cockpit_ObjectGenerator from '@shared/Object/c.Cockpit/ObjectGenerator/ObjectGenerator';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import ApplicationState from '../../../../../../Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name Teacher_ModuleProcessor.
 * @summary business layer for teacher.
 * */
class Teacher_ModuleProcessor extends Teacher_ModuleProcessor_Browser {

     /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
      InitialDataParams(props) {
        let arrDataRequest = [];

        //ObjectGenerator
        Object_Cockpit_ObjectGenerator.Initialize(["SchoolTeacherGrid", "PhoneTeacherDisplay", "PhoneTeacherAddEdit"], 'Y');
        arrDataRequest = [...arrDataRequest, Object_Cockpit_ObjectGenerator];

        // Title
        Object_Extranet_School_Title.Initialize({}, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Title];

        // Teacher
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

        // Text Resource
        let arrResourceParams = ["/d.Extranet/2_School/Modules/Teacher"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams, "Y");
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/Teacher/Teacher.css"
        ];
    }

    /* @name GetMetaData
    * @param {object} objContext objContext
    * @param {object} objTextResource objTextResource
    * @summary It returns the metadata
    * @returns {Array} MetaData
    */
    GetGridMetaData(objContext, objTextResource) {
        let arrColumns = [];
        try {
            arrColumns = DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;PhoneTeacherDisplay")["Data"][0]["t_Framework_ObjectConfiguration_Column"];
        }
        catch (e) {
            let a = e;
        }
        let objMeta = {
            HeaderData: arrColumns,
            PrimaryKey: "uTeacherId",
            Filter: null,
            EditableGrid: true,
            RowActionButtons: objContext.Teacher_ModuleProcessor.GetActionButtons(objContext, objTextResource),
            blnClearApplicationStateOfGrid: true
        };
        return objMeta;
    }

     /**
    * @name GetHeaderButtons
    * @param {object} objContext Passes context object
    * @param {object} objTextResource Passes Text Resource object
    * @summary Buttons to display on grid header
    * @returns {Array} Array of header buttons
    */
      GetHeaderButtons(objContext, objTextResource) {
        if (objContext.state.strFilterStatus === "InActive") {
            return [];
        } else {
            return [
                {
                    "Type": "ModuleAdd",
                    "Text": Localization.TextFormatter(objTextResource, 'addButtonText'),
                    "ImageType": "HeaderButtonImage_PlusWhite",
                    "Action": () => { objContext.Teacher_ModuleProcessor.AddEditPopup(objContext, objTextResource); }
                },
                {
                    "Type": "Type",
                    "Text": Localization.TextFormatter(objTextResource, 'ImportData'),
                    "ClassName": "grey-button",
                    "ImageType": "HeaderButtonImage_GridUpload",
                    "Action": () => { objContext.Teacher_ModuleProcessor.OpenImportPopup(objContext, objTextResource); }
                }
            ];
        }
    }

    /**
    * @name GetGridPhoneCallBacks
    * @param {object} objContext objContext
    * @param {object} objTextResource objTextResource
    * @summary it returns the array of metadatas
    * @returns {array} MetaData
    */
     AddEditPopup(objContext, objTextResource, objData = {}, blnIsEdit = false) {
        // return {
        //     AddEditPopup: (objData) => objContext.Teacher_ModuleProcessor.AddEditPopup(objContext, objTextResource, objData, true)
        // };
        Popup.ShowPopup({
            Data: {
                objData: objData,
                Object_Cockpit_ObjectGenerator: objContext.props.Object_Cockpit_ObjectGenerator,
                Object_Extranet_School_Title: objContext.props.Object_Extranet_School_Title,
                Object_Extranet_Teacher_Teacher: objContext.props.Object_Extranet_Teacher_Teacher,
                ClientUserDetails: objContext.props.ClientUserDetails,
                blnIsEdit: blnIsEdit
            },
            Meta: {
                PopupName: 'TeacherAddEditPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                Width: '85%',
                Height: 'auto'
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
        
    }

    // AddEditPopup(objContext, objTextResource, objData = {},  blnIsEdit = false) {
    //     console.log("objData", objData)
    //     Popup.ShowPopup({
    //         Data: {
    //             objData: objData,
    //             Object_Cockpit_ObjectGenerator: objContext.props.Object_Cockpit_ObjectGenerator,
    //             Object_Extranet_School_Title: objContext.props.Object_Extranet_School_Title,
    //             Object_Extranet_Teacher_Teacher: objContext.props.Object_Extranet_Teacher_Teacher,
    //             ClientUserDetails: objContext.props.ClientUserDetails,
    //             blnIsEdit: blnIsEdit
    //         },
    //         Meta: {
    //             PopupName: 'TeacherAddEditPopup',
    //             ShowHeader: false,
    //             ShowCloseIcon: false,
    //             Width: '85%',
    //             Height: 'auto'
    //         },
    //         Resource: {
    //             Text: objTextResource,
    //             SkinPath: JConfiguration.ExtranetSkinPath
    //         },
    //         Events: {},
    //         CallBacks: {}
    //     });
    // }

}

export default Teacher_ModuleProcessor;