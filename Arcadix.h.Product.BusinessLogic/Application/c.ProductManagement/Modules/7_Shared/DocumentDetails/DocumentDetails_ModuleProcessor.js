//Objects required for module.
import Object_DevServer_ProductManagement_ProductDocument from '@shared/Object/c.ProductManagement/Document/Document';
import Object_Editor_TaskContent_CMSPageContent from '@shared/Object/e.Editor/TaskContent/1_CMSPageContent/CMSPageContent';


/**
* @name DocumentDetails_ModuleProcessor
* @summary Class for DocumentDetails module display.
*/
class DocumentDetails_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_ProductDocument",    
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/2_Module/DocumentDetails",
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

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/2_Module/DocumentDetails"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name LoadData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadData(objContext) {
        if (objContext.props.Data.ModuleId) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objDocumentParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        },
                        {
                            "match": {
                                "uDocumentFolderId": objContext.props.Data.ModuleId
                            }
                        }
                    ]
                }
            };
            Object_DevServer_ProductManagement_ProductDocument.GetData(objDocumentParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
    }

    /**
     * @name LoadPageJson(objContext)
     * @param {object} objContext {state, props, dispatch, EditorWorkArea_ModuleProcessor}.
     * @summary Makes call to get the page json from server.
     * @returns {object} Page json.
     */
    LoadPageJson(objContext) {
        if (objContext.props.Data.DisplayData?.iPageId) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iPageId": objContext.props.Data.DisplayData.iPageId
                            }
                        },
                        {
                            "match": {
                                "iLanguageId": JConfiguration.InterfaceLanguageId
                            }
                        }
                    ]
                },
                "cIsForEditor": "Y"
            };
            Object_Editor_TaskContent_CMSPageContent.GetData(objParams, (objResponse) => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let objPageJson = objResponse["Object_Editor_TaskContent_CMSPageContent"]?.["Data"]?.[0];
                objContext.dispatch({ type: "SET_STATE", payload: { "objPageJson": objPageJson } });
            });           
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            //props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/Task/DocumentDetailss/DocumentDetailss.css"
        ];
    }


}

export default DocumentDetails_ModuleProcessor;