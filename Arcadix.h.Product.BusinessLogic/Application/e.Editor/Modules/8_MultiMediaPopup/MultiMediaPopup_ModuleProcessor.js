//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
* @name MultiMediaPopup_ModuleProcessor
* @summary Class for MultiMediaPopup.
*/
class MultiMediaPopup_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList    
     * @param {object} props component prop
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    //static StoreMapList(props) {
    //    return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + `/e.Editor/Modules/6_CMSElement/CMS${props.Data.MediaType}/CMS${props.Data.MediaType}AddEdit`];
    //}

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];
        if (!props.IsPrefetch) {
            if (props.Data.MediaType.toLowerCase() !== "usecase") {
                // Text Resource
                let arrResourceParams = [`/e.Editor/Modules/6_CMSElement/CMS${props.Data.MediaType}/CMS${props.Data.MediaType}AddEdit`];
                Object_Framework_Services_TextResource.Initialize(arrResourceParams);
                arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
            }
            else {
                let arrResourceParams = [`/c.ProductManagement/Modules/3_UseCase/UseCase`];
                Object_Framework_Services_TextResource.Initialize(arrResourceParams);
                arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
            }
        }
        return arrDataRequest;
    }

    /**
     * @name getRandomInt
     * @param {number} min minimum
     * @param {number} max maximum
     * @returns {number} returns random integer 
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @name OkClick
     * @param {object} objContext { state, props, dispatch }
     * @summary returns selected element json to the parent
     */
    async OkClick(objContext) {
        if (objContext.state.strSelectedTab.toLowerCase() === "global" && objContext.state.blnShowMultiMediaManagement) {
            if (objContext.props.CallBacks.GetElementJson) {
                // Gets the selected element json and returns it to the element where popup is called
                var objSelectedNode = objContext.MultiMediaManagementRef.current.GetSelectedNodeJson();
                if (objContext.props.Data.ShowContainerForExternalLink) {
                    var objLinkProperties = objContext.MultiMediaManagementRef.current.GetLinkProperties();
                    if (objLinkProperties && objLinkProperties.cIsExternalLink.toUpperCase() === "Y" && objLinkProperties.vLinkURL.length > 0) {
                        objSelectedNode = {
                            ...objSelectedNode,
                            ["LinkProperties"]: objLinkProperties
                        }
                    }
                }
                if (objSelectedNode) {
                    objContext.props.CallBacks.GetElementJson(objSelectedNode);
                    editorPopup.ClosePopup(objContext.props.Id);
                }
            }
        }
        else {
            // Uploads the file and returns element json on success.
            if (objContext.state.blnShowMultiMediaAddEdit) {
                if (objContext.state.blnShowUploadControl) {
                    let objReponse = await objContext.MultiMediaAddEditRef.current.UploadFile();
                    if (objReponse && objContext.props.CallBacks.GetElementJson) {
                        editorPopup.ClosePopup(objContext.props.Id);
                        objContext.props.CallBacks.GetElementJson(objReponse);
                    }
                }
                else {
                    // displays management tab to select a folder to save element.
                    let objElementDetails;
                    objContext.dispatch({ type: "SET_STATE", "payload": { "blnShowMultiMediaAddEdit": false, "blnShowMultiMediaManagement": true, "strSelectedTab": "Global" } });
                    if (objContext.props.CallBacks && objContext.props.CallBacks.GetAddEditDetails) {
                        if (objContext.MultiMediaAddEditRef.current && objContext.MultiMediaAddEditRef.current.GetUpdatedElementDetails) {
                            objElementDetails = objContext.MultiMediaAddEditRef.current.GetUpdatedElementDetails();
                            objContext.props.CallBacks.GetAddEditDetails(objElementDetails);
                        }
                    }
                }
            }
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        let arrStyles = [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/8_MultiMediaPopup/MultiMediaPopup.css"
        ];
        return arrStyles;
    }
}

export default MultiMediaPopup_ModuleProcessor;