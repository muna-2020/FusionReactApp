//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

class CMSPageContent_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module.
     * @return {Array} Array of object list.
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/1_EditorFrame/Common"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext {state, props, dispatch, EditorFrame_ModuleProcessor}.
     * @summary Calls the Queue and Execute method.
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props.
     * @summary Get initial request params for the component.
     * @returns {Array } return arrDataRequest.
     */
    InitialDataParams(props) {
        let arrResourceParams = [
            "/e.Editor/Modules/1_EditorFrame/Common"
        ];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/4_CMSPageContent/CMSPageContentStyles.css",
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/5_CMSContainer/ContainerTemplates/ContainerTemplates.css"];
    }
}

export default CMSPageContent_TestApplication_ModuleProcessor;
