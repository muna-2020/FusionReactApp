//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name MultiPageFeatures_ModuleProcessor
 * @summary Contains the MultiPageSidebar's editor version module specific methods.
 * */
class MultiPageFeatures_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSMultiPageElement/MultiPageFeatures"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.MultiPageFeatures_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSMultiPageElement/MultiPageFeatures"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name HandleInputOnChange
     * @param {object} objContext
     * @param {string} strContainerProperty container property
     * @param {int} iValue
     */
    HandleInputOnChange(objContext, strContainerProperty, iValue) {
        if (iValue === "" || /^[0-9]{1,3}$/.test(iValue)) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "vContainerElementProperties": {
                        ...objContext.state.vContainerElementProperties,
                        [strContainerProperty]: iValue
                    },
                    "blnShowError": false
                }
            });
        }
    }

    /**
     * @name HandleSave
     * @param {object} objContext {state, props, dispatch}
     * @summary updates container element properties
     * */
    HandleSave(objContext) {
        if (objContext.state.vContainerElementProperties.iElementHeight > 0 && objContext.props.PassedEvents.SetContainerProperties) {
            objContext.props.PassedEvents.SetContainerProperties(objContext.state.vContainerElementProperties);
        }
        else {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "blnShowError": true } });
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            //props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMultiPageElement/MultiPageFeatures/MultiPageFeatures.css"
        ]
    };
}

export default MultiPageFeatures_ModuleProcessor;
