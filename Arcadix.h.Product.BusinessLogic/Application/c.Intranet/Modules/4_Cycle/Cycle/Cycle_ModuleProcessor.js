//Objects required for module.
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';

//Module related imports
import * as Cycle_MetaData from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/Cycle_MetaData';
import * as Cycle_ContextMenuData from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/Cycle_ContextMenuData';
import * as Cycle_OfficeRibbon from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/Cycle_OfficeRibbon';

/**
 * @name Cycle_ModuleProcessor
 * @param NA
 * @summary Class for Cycle module display.
 * @return NA
 */
class Cycle_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Cycle_Cycle",     
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/4_Cycle/Cycle",   
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);       
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];
        let objParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        // Cycle
        Object_Intranet_Cycle_Cycle.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        // SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize(objParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];
               
        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/4_Cycle/Cycle"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }
   
    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetGridData(objContext) {
        //let intApplicationTypeForLanguageData = 2;
        let objData = {
            RowData: DataRef(objContext.props.Object_Intranet_Cycle_Cycle)["Data"] ?? [],          
            AdditionalPaddingIds: ["FilterBlock"],
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary it returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData(objContext) {
        return {
            ...Cycle_MetaData.GetMetaData()           
        };
    }

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} Object with callback methods
     */
    GetGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name OnBeforeGridRowRender
    * @param {object} objRow
    * @param {object} objContext
    * @summary returns the modified row data
    * @return {object} modified objRow data.
    */
    OnBeforeGridRowRender(objRow, objContext) {

        let objReturnRow = {
            ...objRow,
            ActiveInactiveIcon: objRow.cIsActive == "Y" ? "ActiveCycleImage" : "InActiveCycleImage"
        }
        return objReturnRow;
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {};        
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetGridEvents(objContext) {
        let objEvents = {
            //OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
            OnContextMenuClick: (objRowData, event, arrCheckedRows) => this.OnContextMenuClick(objRowData, event, objContext, arrCheckedRows),            
        };
        return objEvents;
    }

    /**
     * @name OnContextMenuClick
     * @param {object} objRowData
     * @param {object} event
     * @param {object} objContext
     * @summary Handles the click event of the grid.
     */
    OnContextMenuClick(objRowData, objEvent, objContext, arrCheckedRows) {
        let objContextMenu = {
            Data: this.GetContextMenuData(objRowData, objContext, arrCheckedRows),
            objEvent: { clientX: objEvent.clientX, clientY: objEvent.clientY }
        };     
        let fnShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
        fnShowContextMenu(objContextMenu);
    }

    /**
     * @name GetContextMenuData
     * @param {any} objRowData
     * @param {any} objContext
     * @summary Forms the data for Context menu.
     * @return {array} arrContextListSample
     */
    GetContextMenuData(objRowData, objContext, arrCheckedRows) {
        let objData = {
            objContext,
            OpenAddEditTaskPopup: () => this.OpenAddEditTaskPopup(objContext, true, objRowData),
            OpenAddImplementation: () => { },
            OpenAssignTestToCycle: () => { this.OpenAssignTestToCycle(objRowData, objContext)},
            OpenDeleteCycle: () => this.OpenDeletePopup(objContext, objRowData),           
            OpenTranslateCycle: () => { },           
        };
        let arrContextListSample = Cycle_ContextMenuData.GetCycleContextMenuData(objData);    

        return arrContextListSample;
    }

    /**
     * @name OpenAssignTestToCycle
     * @param {any} objRowData
     * @param {any} objContext
     * @summary Opens AssignTestToCycle popup
     */
    OpenAssignTestToCycle(objRowData, objContext) {
        Popup.ShowTabbedPopup({
            Data: {
                CycleId: objRowData.uCycleId
            },
            Meta: {
                PopupName: "AssignTestToCycle",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {},
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: objContext.props
        });
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {};
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["CycleGrid"] : 0;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        //else {
        //    blnShowErrorPopup = objContext.state.objSearchFilters["iStateId"] == -1
        //}
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    IsEdit: blnIsEdit,
                    Object_Intranet_Cycle_Cycle: DataRef(objContext.props.Object_Intranet_Cycle_Cycle),
                    SchoolYearData: DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"]
                },
                Meta: {
                    PopupName: "AddEditCycle",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    JConfiguration: objContext.props.JConfiguration
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
            });
        } else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: blnIsEdit ? "ErrorPopup" : "AddErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {};
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["CycleGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vCycleName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteCycle(arrSelectedRows, strPopupId, objContext)
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteCycle
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close popup on success
     * @returns null
     */
    DeleteCycle(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Cycle_Cycle.DeleteData({ vDeleteData: arrDeleteRow, "uUserId": objContext.props.ClientUserDetails.UserId }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "CycleGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name CreateItemEventHandler
     * @param {*} objItem objItem
     * @summary   To filter the dropdown data based on the condition
     * @return {bool} boolean
     */
    CreateItemEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @name GetYesOrNo
     * @param {*} objTextResource
     * @param {*} strValue
     * @summary returns corresponding string for "Y" and "N".
     */
    GetYesOrNo(objTextResource, strValue) {
        return strValue === "Y" ? Localization.TextFormatter(objTextResource, 'Yes') : Localization.TextFormatter(objTextResource, 'No');
    }

    /**
     * @name GetSearchFolderDropDownData
     * @param {object} objContext objContext
     * @summary   Gets data for search based on folder
     * @return {array} arrDropDownData
     */
    GetSearchFolderDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {};
        var arrDropDownData = [
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "This_Folder") + "(-NI-)"
            },
            {
                "OptionId": 1,
                "OptionText": Localization.TextFormatter(objTextResource, "All_Folder") + "(-NI-)"
            }
        ]
        return arrDropDownData;
    }

    /**
     * @name GetSearchViewDropDownData
     * @param {object} objContext objContext
     * @summary   Gets data for search based on folder
     * @return {array} arrDropDownData
     */
    GetSearchViewDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {};
        var arrDropDownData = [
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "ArchivedSchool") + "(-NI-)"
            },
            {
                "OptionId": 1,
                "OptionText": Localization.TextFormatter(objTextResource, "ArchivedTeacher") + "(-NI-)"
            },
            {
                "OptionId": 2,
                "OptionText": Localization.TextFormatter(objTextResource, "DeletedExecutions") + "(-NI-)"
            }
        ]
        return arrDropDownData;
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.Cycle_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Cycle_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Cycle_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Cycle_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
        ]
    }  
    
    /**
   * @name GetPrefetchFiles
   * @param {object} props props
   * @returns {object} PrefetchFiles
   */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"]
        }
    }
}

export default Cycle_ModuleProcessor;