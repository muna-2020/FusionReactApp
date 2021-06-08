//Objects required for module.
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_School_Title from '@shared/Object/d.Extranet/2_School/Title/Title';
import Object_Cockpit_ObjectGenerator from '@shared/Object/c.Cockpit/ObjectGenerator/ObjectGenerator';
import Object_Cockpit_UserPreference from '@shared/Object/c.Cockpit/UserPreference/UserPreference';
import ApplicationState from '../../../../../../Framework/DataService/ApplicationState/ApplicationState';

/**
* @name Teacher_ModuleProcessor
* @summary Class for Teacher module display and manipulate.
*/
class Teacher_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return [
            "Object_Cockpit_ObjectGenerator",
            "Object_Extranet_School_Title",
            "Object_Extranet_Teacher_Teacher",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Teacher"
        ];
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

        //ObjectGenerator
        Object_Cockpit_ObjectGenerator.Initialize(["SchoolTeacherGrid"], 'Y');
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
    * @param {object} props Passes props
    * @returns {Array} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Teacher/Teacher.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css"
        ];
    }

    /**
* @name GetPrefetchFiles
* @param {object} props props
* @returns {object} PrefetchFiles
*/
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown", "Grid"],
            "Files": []
        }
    }

    /**
    * @name GetParentDropDownValues
    * @param {object} objTextResource Passes TextResource object
    * @summary Gets parent dropdown values
    * @returns {Array} Array of dropdown values
    */
    GetParentDropDownValues(objTextResource) {
        return [
            {
                "valueKey": "All",
                "textKey": Localization.TextFormatter(objTextResource, 'dropDownOptionAll')
            },
            {
                "valueKey": "Active",
                "textKey": Localization.TextFormatter(objTextResource, 'dropDownOptionActive')
            },
            {
                "valueKey": "InActive",
                "textKey": Localization.TextFormatter(objTextResource, 'dropDownOptionInActive')
            }
        ];
    }

    /** 
    * @name OnDropDownValueChange
    * @param {object} objContext Passes context object
    * @param {object} objItem objItem
    * @summary On change of filter dropdown calling FilterData method  by sending status active or inactive
    */
    OnDropDownValueChange(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { strFilterStatus: objItem.valueKey } });
    }

    /**
    * @name OpenImportPopup
    * @param {object} objContext Passes context object
    * @param {object} objTextResource Passes TextResource object
    * @summary Opens Import popup
    */
    OpenImportPopup(objContext, objTextResource) {
        Popup.ShowPopup({
            Data: {},
            Meta: {
                PopupName: 'ImportData',
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

    /**
    * @name GetDropDownValues
    * @param {Array} arrTitleData Passes TitleData array
    * @summary Manipulating data for dropdowns
    * @returns {object} objDropDownData
    */
    GetDropDownValues(arrTitleData) {
        return {
            "DependingTableName": "t_TestDrive_Member_Title_Data",
            iTitleId: {
                "cISLanguageDependent": "Y",
                "ValueColumn": "iTitleId",
                "DisplayColumn": "vTitleName",
                "DependingTableName": "t_TestDrive_Member_Title_Data",
                "Data": arrTitleData
            }
        };
    }

    /**
    * @name GetActionButtons
    * @param {object} objContext Passes context object
    * @param {object} objTextResource Passes TextResource object
    * @summary Returing activate and deactivate buttons
    * @returns {object} Action buttons
    */
    GetActionButtons(objContext, objTextResource) {
        return [
            {
                "Key": "Activate",
                "Type": "Activate",
                "Text": Localization.TextFormatter(objTextResource, 'activateButtonText'),
                "ImagePath": "/Images/Common/Icons/GridDelete.svg",
                "Action": (objTeacher, GetDisplayMode) => { objContext.Teacher_ModuleProcessor.Activate(objContext, objTeacher, GetDisplayMode); }
            },
            {
                "Key": "Deactivate",
                "Type": "Deactivate",
                "Text": Localization.TextFormatter(objTextResource, 'deActivateButtonText'),
                "ImagePath": "/Images/Common/Icons/GridDelete.svg",
                "Action": (objTeacher, GetDisplayMode) => { objContext.Teacher_ModuleProcessor.DeActivate(objContext, objTeacher, GetDisplayMode); }
            }
        ];
    }

    /**
    * @name GetMetaData
    * @param {object} objContext objContext
    * @param {object} objTextResource objTextResource
    * @summary It returns the metadata
    * @returns {Array} MetaData
    */
    GetGridMetaData(objContext, objTextResource) {
        let arrColumns = [];
        try {
            arrColumns = DataRef(objContext.props.Object_Cockpit_ObjectGenerator, "Object_Cockpit_ObjectGenerator;vObjectName;SchoolTeacherGrid")["Data"][0]["t_Framework_ObjectConfiguration_Column"];
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
    * @name GetTeacherData
    * @param {object} objContext Passes context object
    * @summary Forms the TeacherData for Grid
    * @returns {object} RowData and DropDownData
    */
    GetTeacherData(objContext) {
        return {
            RowData: DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"],
            DropDownData: objContext.Teacher_ModuleProcessor.GetDropDownValues(DataRef(objContext.props.Object_Extranet_School_Title)["Data"])
        };
    }

    /**
    * @name GetGridData
    * @param {object} objContext objContext
    * @summary Forms the Grid data
    * @returns {object} Grid data
    */
    GetGridData(objContext) {
        return {
            ...objContext.Teacher_ModuleProcessor.GetTeacherData(objContext),
            RenderGrid: objContext.state.strFilterStatus,
            AdditionalPaddingIds: ["Header", "TopSpacing", "TopHead", "TeacherHeaderText"]
        };
    }

    /**
    * @name GetGridResourceData
    * @param {object} objContext Passes context object
    * @param {object} objTextResource Text Resource object
    * @summary Forms the Resource data for grid
    * @returns {object} Returns resource object. 
    */
    GetGridResourceData(objContext, objTextResource) {
        return {
            Text: {
                ...Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Teacher", objContext.props),
                EmptyDataMessage: Localization.TextFormatter(objTextResource, 'EmptyDataMessage'),
                Date: Localization.TextFormatter(objTextResource, 'DateValidationMessage'),
                Email: Localization.TextFormatter(objTextResource, 'EmailValidationMessage'),
                Number: Localization.TextFormatter(objTextResource, 'NumberValidationMessage'),
                Required: Localization.TextFormatter(objTextResource, 'RequiredValidationMessage')
            },
            SkinPath: JConfiguration.ExtranetSkinPath,
            "ImagePathDetails": {
                "ActiveImageIcon_Check_Green": "/Images/Common/Icons/check_green.svg",
                "ActiveImageIcon_ErrorDeactive": "/Images/Common/Icons/errorDeactive.svg",
                "HeaderButtonImage_PlusWhite": "/Images/Common/Icons/pluswhite.svg",
                "HeaderButtonImage_GridUpload": "/Images/Common/Icons/GridUpload.svg"
            }
        };
    }




    /** 
    * @name DeleteData
    * @param {object} objContext Passes context object
    * @param {object} data Teacher data
    * @param {function} GetDisplayMode CallBackFunction to let the grid know that edit mode has changed to display mode
    * @summary Activating and deactivating teacher
    */
    DeleteData(objContext, data, GetDisplayMode) {
        let objCallParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.ClientUserDetails.UserId
            },
            "vDeleteData": [{
                t_TestDrive_Member_Teacher_School: data
            }]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Teacher_Teacher.DeleteData(objCallParams, (objReturn, cIsNewData) => {
            // this.SetRowsToSelect(objContext, objReturn);
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                GetDisplayMode();
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
    Activate(objContext, ActionObject, GetDisplayMode) {
        let arrEditData = {
            "uTeacherId": ActionObject["uTeacherId"],
            t_TestDrive_Member_Teacher_School: [
                { "uTeacherId": ActionObject["uTeacherId"], "uSchoolId": ActionObject["uSchoolId"], "cIsDeleted": "N" }
            ]
        };
        objContext.Teacher_ModuleProcessor.EditData(objContext, arrEditData, GetDisplayMode);
    }

    /** 
    * @name DeActivate
    * @param {object} objContext Passes context object
    * @param {object} ActionObject Passes ActionObject
    * @param {function} GetDisplayMode CallBackFunction to let the grid know that edit mode has changed to display mode
    * @summary Calling DeActivate method
    */
    DeActivate(objContext, ActionObject, GetDisplayMode) {
        let arrDelete = [
            { "uTeacherId": ActionObject["uTeacherId"], "uSchoolId": ActionObject["uSchoolId"], "cIsDeleted": "Y" }
        ];
        objContext.Teacher_ModuleProcessor.DeleteData(objContext, arrDelete, GetDisplayMode);
    }

    /**
    * @name AddData
    * @param {object} objContext Passes context object
    * @param {object} data Teacher data
    * @param {function} funCallBack CallBack function
    * @summary Activating and deactivating teacher
    */
    AddData(objContext, data, funCallBack) {
        let objCallParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.ClientUserDetails.UserId
            },
            "vAddData": data,
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Teacher_Teacher.AddData(objCallParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                funCallBack();
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
    EditData(objContext, data, funCallBack) {
        let objCallParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.ClientUserDetails.UserId
            },
            "vEditData": [data],
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Teacher_Teacher.EditData(objCallParams, (objReturn, cIsNewData) => {
            //this.SetRowsToSelect(objContext, data);
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                funCallBack();
            }
        });
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
                    "Type": "Add",
                    "Text": Localization.TextFormatter(objTextResource, 'addButtonText'),
                    "ImageType": "HeaderButtonImage_PlusWhite"
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
    * @name SaveMethod
    * @param {object} objContext Passes context object
    * @param {object} objEditedData Passes EditedData object
    * @param {function} funCallBack CallBack function
    * @summary On click save button this method will get called. in this method calling  EditData or AddData basedon cIsNew property from recieved params
    */
    SaveMethod(objContext, objEditedData, funCallBack) {
        if (objEditedData != undefined) {
            if (!objEditedData["IsNewRow"]) {
                let objSaveData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"].find(x => x.uTeacherId == objEditedData.uTeacherId);
                if (objSaveData != undefined) {
                    objContext.Teacher_ModuleProcessor.EditData(objContext, { ...objSaveData, ...objEditedData }, funCallBack);
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
                    uSchoolId: objContext.props.ClientUserDetails.UserId,
                    vShortCut: objEditedData.vShortCut,
                    cIsSubjectExpertTeacherMarkedBySchool: objEditedData.cIsSubjectExpertTeacherMarkedBySchool,
                    t_TestDrive_Member_Teacher_School: [{
                        "uSchoolId": objContext.props.ClientUserDetails.UserId,
                        "cIsAdmin": 'N'
                    }]
                };
                objContext.Teacher_ModuleProcessor.AddData(objContext, objNewTeacher, funCallBack);
            }
        }
    }

    /**
    * @name GetActiveStatus
    * @param {object} objRowData objRowData
    * @param {object} objContext Context object
    * @summary Executes before everything else when Grid row is formed
    * @returns {object} extra row data
    */
    GetActiveStatus(objRowData, objContext) {
        if (objRowData.IsNewRow) {
            return {
                ...objRowData,
                "ActiveImageIcon": "ActiveImageIcon_Check_Green"
            };
        }
        if (objContext.state.strFilterStatus === "Active") {
            if (objRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "N") {
                return {
                    ...objRowData,
                    "ActiveImageIcon": "ActiveImageIcon_Check_Green"
                };
            } else {
                return null;
            }
        }
        else if (objContext.state.strFilterStatus === "InActive") {
            if (objRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "Y") {
                return {
                    ...objRowData,
                    "ActiveImageIcon": "ActiveImageIcon_ErrorDeactive"
                };
            } else {
                return null;
            }
        } else {
            var strStatusImage = objRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === 'N' ? "ActiveImageIcon_Check_Green" : "ActiveImageIcon_ErrorDeactive";
            return {
                ...objRowData,
                "ActiveImageIcon": strStatusImage
            };
        }
    }

    /**
    * @name OnBeforeEditRow
    * @param {object} objEditRowData EditRowData object
    * @summary Executes before everything else when Edit Row is clicked
    * @returns {object} extra row data
    */
    OnBeforeEditRow(objEditRowData) {
        if (objEditRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "N") {
            return { "AllowEdit": true, "ButtonKeys": ["Deactivate"] };
        } else {
            return { "AllowEdit": false, "ButtonKeys": ["Activate"] };
        }
    }

    /**
    * @name GetGridCallBacks
    * @param {object} objContext objContext
    * @param {object} objTextResource objTextResource
    * @summary it returns the array of metadatas
    * @returns {array} MetaData
    */
    GetGridCallBacks(objContext, objTextResource) {
        return {
            GridActionButtons: objContext.Teacher_ModuleProcessor.GetHeaderButtons(objContext, objTextResource),
            SaveMethod: (objData, funCallBack) => objContext.Teacher_ModuleProcessor.SaveMethod(objContext, objData, funCallBack),
            OnBeforeGridRowRender: (objRowData) => objContext.Teacher_ModuleProcessor.GetActiveStatus(objRowData, objContext),
            OnBeforeEditRow: (objEditRowData) => { return objContext.Teacher_ModuleProcessor.OnBeforeEditRow(objEditRowData, objContext); }
        };
    }

    /**
    * @name GetResourceDataSchoolTeacherDropdown
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceDataSchoolTeacherDropdown(objTextResource) {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath,
            Text: objTextResource
        };
    }

    /**
    * @name GetMetaDataSchoolTeacherDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataSchoolTeacherDropdown() {
        return {
            DisplayColumn: "textKey",
            ValueColumn: "valueKey"
        };
    }

    /**
    * @name GetDataSchoolTeacherDropdown
    * @param {object} objContext Context object
    * @param {object} objTextResource objTextResource
    * @summary It returns the dropdown data
    * @returns {object} Dropdown data
    */
    GetDataSchoolTeacherDropdown(objContext, objTextResource) {
        return {
            DropdownData: objContext.Teacher_ModuleProcessor.GetParentDropDownValues(objTextResource),
            SelectedValue: objContext.state.strFilterStatus ? objContext.state.strFilterStatus : "All"
        };
    }

    /**
    * @name GetEventsDataSchoolTeacherDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    GetEventsDataSchoolTeacherDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.Teacher_ModuleProcessor.OnDropDownValueChange(objContext, objItem)
        };
    }

    /**
    * @name ShowOnlineHelp
    * @summary Set the OnlineHelpGroupObject application state for OnlineHelp
    */
    ShowOnlineHelp() {
        let objOnlineHelpObject = {
            HelpAction: "Open",
            HelpGroup: "TeacherStartPage",
            HelpKey: "TeacherStartPage"
        };
        ApplicationState.SetProperty("HelpData", objOnlineHelpObject);
    }

    /**
     * @name UpdateInformationPopupStatus
     * @summary updates the ShowInformation bar status
     * @param {any} objContext
     */
    UpdateInformationPopupStatus(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: [
                {
                    vValue: objContext.state.blnShowInformationBar ? "N" : "Y", //changing status here
                    vKey: "ShowInformationBar_SchoolTeacher"
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
            ApplicationState.SetProperty("blnShowAnimation", false);
        })

    }

    /**
     * @name SetRowsToSelect
     * @param {any} objContext
     * @param {any} objTeacher
     */
    SetRowsToSelect(objContext, objTeacher) {
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        let index = 0;
        if (Array.isArray(objTeacher)) {
            objTeacher = objTeacher[0];
        }
        arrTeacherData.map((item, i) => {
            if (objTeacher["uTeacherId"] == item["uTeacherId"]) {
                index = i;
            }
        })
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        let arrSelectedTeachers = [...objSelectedRows["TeacherGrid"], objTeacher];
        objSelectedRows = {
            ...objSelectedRows,
            TeacherGrid: arrSelectedTeachers
        }
        ApplicationState.SetProperty("SelectedRows", objSelectedRows);

        let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
        objSelectedRowsIndices = {
            ...objSelectedRowsIndices,
            TeacherGrid: [index]
        }
        ApplicationState.SetProperty("SelectedRowsIndices", objSelectedRowsIndices);

        //Grid Hook code
        //let objSelectedIndices = ApplicationState.GetProperty("SelectedRowsIndices");
        //if (objSelectedIndices && objSelectedIndices[objContext.props.Id] && objSelectedIndices[objContext.props.Id].length > 0) {
        //    intIndex = objSelectedIndices[objContext.props.Id][0];
        //}
    }
}

export default Teacher_ModuleProcessor;