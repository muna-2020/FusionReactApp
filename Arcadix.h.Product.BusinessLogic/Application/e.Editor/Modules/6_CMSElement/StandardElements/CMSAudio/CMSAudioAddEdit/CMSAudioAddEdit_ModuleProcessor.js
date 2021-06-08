//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Editor_TaskContent_CMSAudioAddEdit_Module from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudioAddEdit/CMSAudioAddEdit_Module';

//Helper classes.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';



/**
* @name AudioAddEdit_ModuleProcessor
* @summary Class for AudioAddEdit popup display.
*/
class CMSAudioAddEdit_ModuleProcessor extends Base_ModuleProcessor {

    constructor() {
        super();
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo +"/e.Editor/Modules/6_CMSElement/CMSAudio/CMSAudioAddEdit", "Editor_TaskContent_CMSAudioAddEdit_Module"];
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

        //CMSAudioAddEdit object
        Editor_TaskContent_CMSAudioAddEdit_Module.Initialize({});
        arrDataRequest = [...arrDataRequest, Editor_TaskContent_CMSAudioAddEdit_Module];

        // Text Resource
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSAudio/CMSAudioAddEdit"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }



    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @name OkClick
     * @param {object} objContext { state, props, dispatch }
     * @summary sends selected audio element json to the parent
     */
    OkClick(objContext) {
        if (objContext.props.PassedEvents.GetElementJson) {
            objContext.props.PassedEvents.GetElementJson(objContext.state.objSelectedAudio);
            objContext.props.ClosePopup(objContext.props.ObjModal);
        }
    }

    getDate(strDate) {
        var objDate = new Date(strDate);
        return objDate.getDay() + ":" + objDate.getMonth() + ":" + objDate.getFullYear();
    }

}

export default CMSAudioAddEdit_ModuleProcessor;