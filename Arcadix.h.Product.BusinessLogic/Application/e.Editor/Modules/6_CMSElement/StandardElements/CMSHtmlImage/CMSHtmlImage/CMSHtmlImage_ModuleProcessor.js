//Module related fies.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Object_TaskContent_CMSElement_CMSHtmlImage from '@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSHtmlImage';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name CMSHtmlImage_ModuleProcessor
 * @summary Contains the CMSHtmlImage's module specific methods.
 */
class CMSHtmlImage_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSHtmlImage"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(objContext.CMSHtmlImage_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSHtmlImage"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name GetTextResource
     * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
     * @summary Gets the Text resource from the props.
     * @returns {object} Text resource
     */
    GetTextResource(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/6_CMSElement/CMSHtmlImage", objContext.props);
        return objTextResource;
    }

    /**
     * @name SaveClick
     * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
     * @summary calls the object for saving data.
     * @returns {object} Element Json
     */
    async SaveClick(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objTextElementJson = { ...objContext.state.ElementJson["vElementJson"]["TextElements"][0] };
        if (objTextElementJson.Ref.current && objTextElementJson.Ref.current.GetElementJson) {
            objTextElementJson = await objTextElementJson.Ref.current.GetElementJson();
        }
        let objParams = {
            "ElementJson": {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["TextElements"]: [
                        objTextElementJson
                    ]
                }
            }
        };
        let objSavedJson = await Object_TaskContent_CMSElement_CMSHtmlImage.SaveHtmlAsImage(objParams);
        ApplicationState.SetProperty("blnShowAnimation", false);
        objContext.state.Callback.OnSaveClick(objSavedJson);
    }

    /**
     * @name GetHtmlImageDetails
     * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
     * @summary Gets Html Image Details for Element Id.
     * @returns {object} Element Json
     */
    async GetHtmlImageDetails(intElementId) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objElementJson = await Object_TaskContent_CMSElement_CMSHtmlImage.GetHtmlImageDetails(intElementId);
        ApplicationState.SetProperty("blnShowAnimation", false);
        return objElementJson
    }

    /**
     * @name CancelClick
     * @param {object} objContext {state, props, dispatch, CMSHtmlImage_ModuleProcessor}
     * @summary Calls the Cancel Click in th props.
     * @returns {object} Text resource
     */
    CancelClick(objContext) {
        objContext.state.Callback.OnCancelClick();
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSHtmlImage/CMSHtmlImageStyles.css"
        ];
    }
}

export default CMSHtmlImage_ModuleProcessor;
