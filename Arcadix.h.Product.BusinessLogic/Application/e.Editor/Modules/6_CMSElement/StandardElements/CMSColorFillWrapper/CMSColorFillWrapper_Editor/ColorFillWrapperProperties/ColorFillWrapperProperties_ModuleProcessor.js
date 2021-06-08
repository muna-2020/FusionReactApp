//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name ColorFillWrapperProperties_ModuleProcessor
 * @summary Contains the ColorFillWrapper sidebar's editor version module specific methods.
 * */
class ColorFillWrapperProperties_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSColorFillWrapper/ColorFillWrapperProperties"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.ColorFillWrapperProperties_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSColorFillWrapper/ColorFillWrapperProperties"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name HandleHotspotMinimumCorrect
     * @param {object} objContext
     * @param {int} iValue
     */
    HandleHotspotMinimumCorrect(objContext, iValue) {
        if (iValue === "" || /^[0-9]{1,2}$/.test(iValue)) {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "iMinimumToBeCorrect": iValue
                }
            });
        }
        objContext.dispatch({ "type": "SET_STATE", "payload": { "blnShowError": false } });
    }

    /**
     * @name HandleHotspotMinimumSave
     * @param {object} objContext {state, props, dispatch}
     * @summary updates iMinimumToBeCorrect to hotspot element json
     * */
    HandleHotspotMinimumSave(objContext) {
        if (objContext.state.iMinimumToBeCorrect === "" || parseInt(objContext.state.iMinimumToBeCorrect) <= parseInt(objContext.props.ElementJson.vElementJson.Values.length)) {
            objContext.props.PassedEvents.UpdateElementJson(objContext.state.iMinimumToBeCorrect);
        }
        else {
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "blnShowError": true
                }
            })
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            //props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/MoAAAdules/6_CMSElement/CMSColorFill/ColorFillProperties/ColorFillProperties.css"
        ]
    };
}

export default ColorFillWrapperProperties_ModuleProcessor;
