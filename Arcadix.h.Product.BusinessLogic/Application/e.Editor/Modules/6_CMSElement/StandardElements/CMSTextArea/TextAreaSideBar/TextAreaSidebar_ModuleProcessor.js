//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name WikiSidebar_ModuleProcessor
 * @summary Contains the WikiSidebar's editor version module specific methods.
 * */
class TextAreaSideBar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSTextArea/TextAreaSideBar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.TextAreaSideBar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSTextArea/TextAreaSideBar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name UpdateToCMSInput
     * @param {object} objContext {state, props, dispatch}
     * @param {object} event event object
     * @summary   Calls the 'UpdateElementJson' method of the CMSTextArea element to update the element json.
     */
    UpdateToCMSTextArea(objContext, event) {
        event.preventDefault();
        objContext.props.PassedEvents.UpdateElementJson(objContext.state.ElementJson);
        objContext.props.HideSidebar();
    }

    /**
     * @name isNumber
     * @param {object} objContext {state, props, dispatch}
     * @param {object} e event object
     * @summary number validator, should be not more than 3 digits
     */
    isNumber(objContext, e) {
        const re = /^[0-9]{1,3}$/;
        // if value is not blank, then test the regex and if true save the value
        if (e.target.value === '' || re.test(e.target.value)) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson.vElementJson,
                            [e.target.id]: e.target.value
                        }
                    }
                }
            });
        }
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSTextArea/TextAreaSideBar/TextAreaSideBar.css"]
    };
}

export default TextAreaSideBar_ModuleProcessor;
