//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name CMSImageSavePopup_ModuleProcessor
 * @summary Class for CMSImageSavePopup module display.
 */
class CMSImageSavePopup_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
      * @name StoreMapList     
      * @summary Returns list of objects used in the module
      * @return {Array} Array of object list
      */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageSavePopup"];
    }

    /**
      * @name LoadInitialData
      * @param {object} objContext passes Context object
      * @summary Calls the Queue and Execute method
      */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
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
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageSavePopup"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
    * @name OpenImageAddEditPopup
    * @param {object} objContext {props, state, dispatch, PassedEvents, Data}
    * @summary opens image add edit popup
    * @returns {any} returns promise 
    */
    OpenImageAddEditPopup(objContext) {
        var objImageDetails = {};
        return new Promise((resolve, reject) => {
            editorPopup.ShowPopup({
                "Data": {
                    "PreSelectNode": { ...objContext.state.ElementJson },
                    "MediaType": "Image",
                    "ShowUploadControl": false,
                    "ShowMultiMediaAddEdit": true,
                    "ShowMultiMediaManagement": false,
                    "DisplayOnlyFolders": true,
                    "objContext": objContext
                },
                "Meta": {
                    "PopupName": "MultiMediaPopup",
                    "Height": 'auto',
                    "Width": '800px',
                    "ShowHeader": false,
                    "ShowCloseIcon": true,
                    "ShowToggleMaximizeIcon": true,
                },
                "Resource": {
                    "Text": {},
                    "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
                },
                "Events": {},
                "CallBacks": {
                    "GetElementJson": (objSelectedNodeData) => {
                        resolve({ ["FolderDetails"]: objSelectedNodeData, ["ImageDetails"]: objImageDetails });
                    },
                    "GetAddEditDetails": (objElementJson) => {
                        objImageDetails = objElementJson;
                    }
                }
            });
        });
    }

    /**
     * @name UpdateImageDetails
     * @param {object} objContext {state, props, dispatch}
     */
    UpdateImageDetails(objContext, objImageElementJson) {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "ImageDetails": objImageElementJson } });
    }

    /**
     * @name handleOkClick
     * @param {Object} objContext {state, props, dispatch}
     */
    async handleOkClick(objContext) {
        if (objContext.state.blnSaveAsGlobal === undefined || (objContext.state.blnSaveAsGlobal && objContext.state.blnSaveAsNew === undefined)) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnError": true } });
        }
        else {
            if (objContext.state.blnSaveAsGlobal && objContext.state.blnSaveAsNew) {
                try {
                    var response = await objContext.CMSImageSavePopup_ModuleProcessor.OpenImageAddEditPopup(objContext);
                    var result = await objContext.props.CallBacks.GetSaveDetails({ ...objContext.state, ...response });
                    editorPopup.ClosePopup(objContext.props.Id);
                    return;
                }
                catch (ex) {
                    console.log("Error_Image_Save_Popup", ex);
                }
            }
            var res = await objContext.props.CallBacks.GetSaveDetails({ ...objContext.state, ["ImageDetails"]: objContext.props.Data.ElementJson });
            editorPopup.ClosePopup(objContext.props.Id);
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSImage/CMSImageSavePopup/CMSImageSavePopupStyles.css"
        ];
    }

}

export default CMSImageSavePopup_ModuleProcessor;