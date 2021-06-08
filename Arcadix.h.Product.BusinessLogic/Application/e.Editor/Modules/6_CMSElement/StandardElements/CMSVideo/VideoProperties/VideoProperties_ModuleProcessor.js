//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module related imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name WikiSidebar_ModuleProcessor
 * @summary Contains the VideoSidebar's editor version module specific methods.
 * */
class VideoProperties_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSVideo/VideoProperties"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.VideoProperties_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSVideo/VideoProperties"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name HandleInputOnChange
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objParams
     */
    HandleInputOnChange(objContext, objParams) {
        let { type, value } = objParams;
        if (/^[0-9]+$/.test(value) || value === "") {
            objContext.dispatch({ "type": "SET_STATE", "payload": { [type]: value } });
        }
    }

    /**
     * @name SetPlayerWidthAndHeight
     * */
    SetPlayerWidthAndHeight(objContext) {
        if (objContext.state.iElementWidth && objContext.state.iElementHeight) {
            objContext.props.PassedEvents.SetPlayerWidthHeight({ "height": objContext.state.iElementHeight, "width": objContext.state.iElementWidth });
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSVideo/VideoProperties/VideoProperties.css"]
    };
}

export default VideoProperties_ModuleProcessor;
