//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Module related imports
import * as CMSContainer_Editor_MetaData from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_MetaData';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
* @name ContainerTemplateSelection_ModuleProcessor
* @summary Class for ContainerTemplateSelection  display.
*/
class ContainerTemplateSelection_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection"];
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
        let arrResourceParams = ["/e.Editor/Modules/5_CMSContainer/ContainerTemplateSelection"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
    * @name UpdateActiveContainer
    * @param {object} objContext {props, state, dispatch} 
    * @param {object} objContainer selected container object
    * @summary updates active container
    */
    UpdateActiveContainer(objContext, objContainer) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "activeContainer": objContainer
            }
        });
    }

    /**
     * @name SelectContainer
     * @param {object} objContext {props, state, dispatch} 
     * @param {int} intTemplateId selected template id
     * @summary update the active container on selecting container
     */
    async SelectContainer(objContext, intTemplateId) {
        let objContainer = await CMSContainer_Editor_MetaData.GetDefaultContainerJson(intTemplateId);
        this.UpdateActiveContainer(objContext, objContainer);
    }

    /**
    * @name RemovePopUp
    * @param {object} objContext { props, state, dispatch }
    * @param {event} event event
    * @summary   Closes the popup
    */
    RemovePopUp(objContext, event) {
        event.preventDefault();
        editorPopup.ClosePopup(objContext.props.Id);
    }

    /**
     * @name HandleTabSelectedItem
     * @param {object} objContext { props, state, dispatch }
     * @param {int} intTabIndex selected tab index
     * @summary handles tab selection
     */
    async HandleTabSelectedItem(objContext, intTabIndex) {
        var intContainerTemplateId = objContext.state.arrTabInfo[intTabIndex]["TabContent"].length > 0 ? objContext.state.arrTabInfo[intTabIndex]["TabContent"][0]["iContainerTemplateId"] : "";
        objContext.dispatch({ "type": "SET_STATE", "payload": { "intSelectedTabIndex": intTabIndex, "intSelectedTemplateId": intContainerTemplateId } });
        await this.SelectContainer(objContext, intContainerTemplateId);
    }

    /**
     * @name HandleContainerSelectedItem
     * @param {any} objContext { props, state, dispatch }
     * @param {any} intContainerTemplateId selected container template id]
     * @summary handles container selection
     */
    HandleContainerSelectedItem(objContext, intContainerTemplateId) {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "intSelectedTemplateId": intContainerTemplateId } });
    }

    /**
    * @name handleOnClick
    * @param {object} objContext { props, state, dispatch }
    * @summary adds respective container and closes the popup.
    */
    handleOnClick(objContext) {
        if (objContext.state.activeContainer) {
            objContext.props.CallBacks.AddContainer(objContext.state.activeContainer);
            editorPopup.ClosePopup(objContext.props.Id);
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/5_CMSContainer/ContainerTemplateSelection/ContainerTemplateSelection.css"];
    }
}

export default ContainerTemplateSelection_ModuleProcessor;