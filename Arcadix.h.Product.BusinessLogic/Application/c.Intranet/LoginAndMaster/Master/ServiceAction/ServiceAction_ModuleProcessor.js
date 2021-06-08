class ServiceAction_ModuleProcessor extends IntranetBase_ModuleProcessor {

    constructor() {
        super();
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "RunningOfflineProcesses" },
            { "StoreKey": "ApplicationState", "DataKey": "TotalOfflineProcesses" }
        ];
    }

    /**
     * @name ShowOfflinePopup
     * @param {object} objContext passes Context object
     * @summary opens the offline popup
     */
    ShowOfflinePopup(objContext) {
        Popup.ShowPopup({
            Data: {
                ModuleName: "OfflineExecutionDisplay",
            },
            Meta: {
                PopupName: "OfflineExecutionDisplay",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: "550px",
                Width: 843,
                HeaderData: []
            },
            Resource: {
                Text: {},
                SkinPath: JConfiguration.CockpitSkinPath,
            },
            Events: {
                OnClosePopup: objContext.props.Events.OnCloseOfflinePopup
            },
            CallBacks: {},
            ParentProps: objContext.props
        });
    }
}

export default ServiceAction_ModuleProcessor;