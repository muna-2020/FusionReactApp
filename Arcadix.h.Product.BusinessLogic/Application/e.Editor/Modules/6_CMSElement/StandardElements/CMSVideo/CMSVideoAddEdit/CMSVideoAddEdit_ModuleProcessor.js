//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Editor_TaskContent_CMSVideoAddEdit_Module from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideoAddEdit/CMSVideoAddEdit_Module';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
* @name VideoAddEdit_ModuleProcessor
* @summary Class for VideoAddEdit popup display.
*/
class CMSVideoAddEdit_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Editor_TaskContent_CMSVideoAddEdit_Module",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSVideo/CMSVideoAddEdit"
        ];
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

        //CMSVideoAddEdit object
        Editor_TaskContent_CMSVideoAddEdit_Module.Initialize({});
        arrDataRequest = [...arrDataRequest, Editor_TaskContent_CMSVideoAddEdit_Module];

        // Text Resource
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSVideo/CMSVideoAddEdit"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    OkClick(objContext) {
        if (objContext.props.PassedEvents.GetElementJson) {
            objContext.props.PassedEvents.GetElementJson(objContext.state.objSelectedVideo);
            objContext.props.ClosePopup(objContext.props.ObjModal);
        }
    }

    getDate(strDate) {
        var objDate = new Date(strDate);
        return objDate.getDay() + ":" + objDate.getMonth() + ":" + objDate.getFullYear();
    }
}

export default CMSVideoAddEdit_ModuleProcessor;
