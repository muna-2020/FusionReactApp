/**
* @name Example_ModuleProcessor
* @summary Class for Example module display.
*/
class Example_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/4_Example/Example", 
            { "StoreKey": "ApplicationState", "DataKey": "ActiveModuleName" },
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/4_Example/Example"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [ Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name PreviewModule
     * @summary To open Preview of Example in a new window.
     */
    PreviewModule() {
        let strModule = ApplicationState.GetProperty("SelectedRows")?.ModuleGrid[0]?.vModuleName ?? ApplicationState.GetProperty("ActiveModuleName");
        window.open(JConfiguration.BaseUrl + "ModulePreview?PreviewComponent=" + strModule +'&sessionkey='+JConfiguration.SessionKey);
    } 

   /**
    * @name CopyLinkToClipBoard
    * @summary To Copy link of the Example to Clipboard.
    */
    CopyLinkToClipBoard() {
        //------------------------Create a Dummy element in DOM, set the value to it and then using execCommand("copy") to copy the link to Clipboard-------------------
        let objDomElement = document.createElement("input");
        document.body.appendChild(objDomElement);
        objDomElement.value = window.location.href;
        objDomElement.select();
        document.execCommand("copy");
        document.body.removeChild(objDomElement);
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------
    } 

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css"
        ];
    }
}

export default Example_ModuleProcessor;