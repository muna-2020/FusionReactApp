//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Module Objects imports
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes/methods
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name InteractionTypeSidebar_ModuleProcessor
 * @summary Contains the InteractionTypeSidebar's editor version module specific methods.
 * */
class InteractionTypeSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo 
        + "/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(objContext.InteractionTypeSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext {props, state, dispatch, InteractionTypeSidebar_ModuleProcessor}
     * @summary Extracts the meta data from the props
     * @returns {array} meta data
     */
    GetMetaData(objContext) {
        let arrMetaData = objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + 
        "/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar"].Data[0]["InteractionTypeSidebar"]["Configuration"];
        return arrMetaData;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/2_OfficeRibbon/InteractionElements/InteractionTypeSidebar/InteractionTypeSidebarStyles.css"];
    }

}

export default InteractionTypeSidebar_ModuleProcessor;
