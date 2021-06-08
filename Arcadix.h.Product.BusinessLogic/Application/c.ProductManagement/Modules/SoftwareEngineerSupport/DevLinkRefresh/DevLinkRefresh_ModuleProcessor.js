//Helper classes.
import Object_ProductManagement_SoftwareEngineerSupport_DevLinkRefresh from '@shared/Object/c.ProductManagement/SoftwareEngineerSupport/DevLinkRefresh/DevLinkRefresh';

/**
 * @name DevLinkRefresh_ModuleProcessor
 * @param NA
 * @summary Class for DevLinkRefresh module display.
 * @return NA
 */
class DevLinkRefresh_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefresh"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        this.GetServicesStatus(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];    

        // Text Resource
        let arrResourceParams = ["/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefresh"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }


   

    /**
     * @name OnRefreshClick
     * @param {object} event takes event object
     * @summary Handles Search button click event
     */
    OnRefreshClick(objContext, strServiceType) {
        let arrServices = [], blnJsDocRefresh ;
        switch (strServiceType) {
            case "DBDocumentation":
                //arrServices = (!objContext.state.strServiceType || objContext.state.strServiceType == "All") ? ["Arcadix_Cockpit_Export", "Arcadix_Editor_Export", "Arcadix_Extranet_Export", "Arcadix_Intranet_Export", "Arcadix_Test_Export"] : [objContext.state.strServiceType];
                arrServices = ["Arcadix_Fusion_Cockpit_Export", "Arcadix_Fusion_Editor_Export", "Arcadix_Fusion_Extranet_Export", "Arcadix_Fusion_Intranet_Export", "Arcadix_Fusion_Test_Export"];
                break;
            case "JSDoc":
                blnJsDocRefresh = true;
            default:
                arrServices = [strServiceType];
                break;
        }
        //ref approach
        objContext.dispatch({ type: "SET_STATE", payload: { "isServiceStatusLoaded": true } });
        objContext.state.objServiceStatusRefs[strServiceType].current = "Running";
        arrServices.map(strService => {
            objContext.state.objServiceStatusRefs[strService].current = "Running";
        })
        
        if (arrServices) {
            let objParam = {
                Services: arrServices,
                RefreshJsDoc: blnJsDocRefresh
            };
            //ApplicationState.SetProperty("blnShowAnimation", true);
            Object_ProductManagement_SoftwareEngineerSupport_DevLinkRefresh.RefreshLink(objParam, (objReturn) => {
                //ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }        
    }

    /**
     * @name GetServicesStatus
     * @param {object} event takes event object
     * @summary ServiceStatus event
     */
    GetServicesStatus(objContext) {
        let arrServices = ["Arcadix_Fusion_Cockpit_Export", "Arcadix_Fusion_Editor_Export", "Arcadix_Fusion_Extranet_Export", "Arcadix_Fusion_Intranet_Export", "Arcadix_Fusion_Test_Export", "VsDocman"];
        if (arrServices) {
            let objParam = {
                Services: arrServices
            };
            Object_ProductManagement_SoftwareEngineerSupport_DevLinkRefresh.GetServicesStatus(objParam, (objReturn) => {
                objContext.dispatch({ type: "SET_STATE", payload: { "isServiceStatus": true } });
                arrServices.map(strService => {
                    objReturn["Data"].map(strServiceStatus => {
                        if (strService == strServiceStatus["Event"]) {
                            objContext.state.objServiceStatusRefs[strService].current = strServiceStatus["State"];
                        }
                    })
                })
            });
        }
    }

    GetDbDocDropDownProps(objContext) {

        //The data is an array of objects required for dropdown.
        const DropdownData = [
            { id: "1", ServiceType: "All" },
            { id: "2", ServiceType: "Arcadix_Fusion_Cockpit_Export" },
            { id: "3", ServiceType: "Arcadix_Fusion_Editor_Export" },
            { id: "4", ServiceType: "Arcadix_Fusion_Extranet_Export" },
            { id: "6", ServiceType: "Arcadix_Fusion_Intranet_Export" },
            { id: "7", ServiceType: "Arcadix_Fusion_Test_Export" },

        ];

        let Meta = {
            "DisplayColumn": "ServiceType", //As a value, pass the Key of Dropdown data, that need displaying in the Dropdown 
            "ValueColumn": "id"   //As a value, pass the primary key of the Dropdown data
        };

        let Events = {
            OnChangeEventHandler: (objItem) => { objContext.dispatch({ type: "SET_STATE", payload: { "strServiceType": objItem.ServiceType } }); }
        }

        return {
            Data: {
                DropdownData,
                SelectedValue: "1",
            },             
            Meta,
            Events,
            Resource: {
                SkinPath : JConfiguration.IntranetSkinPath
            }
        };
    }



    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ]
    }
}

export default DevLinkRefresh_ModuleProcessor;