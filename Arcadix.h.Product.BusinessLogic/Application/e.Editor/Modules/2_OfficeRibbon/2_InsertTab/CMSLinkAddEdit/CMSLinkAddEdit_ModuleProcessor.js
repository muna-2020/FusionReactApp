//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Editor_TaskContent_CMSLinkAddEdit_Module from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/CMSLinkAddEdit/CMSLinkAddEdit_Module';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';



/**
* @name LinkAddEdit_ModuleProcessor
* @summary Class for LinkAddEdit popup display.
*/
class CMSLinkAddEdit_ModuleProcessor extends Base_ModuleProcessor {

    constructor() {
        super();
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Editor_TaskContent_CMSLinkAddEdit_Module",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/2_OfficeRibbon/2_Insert/CMSLinkAddEdit",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSVideo/CMSVideoAddEdit",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageAddEdit"
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

        //CMSLinkAddEdit object
        Editor_TaskContent_CMSLinkAddEdit_Module.Initialize({});
        arrDataRequest = [...arrDataRequest, Editor_TaskContent_CMSLinkAddEdit_Module];

        // Text Resource
        let arrResourceParams = ["/e.Editor/Modules/2_OfficeRibbon/2_Insert/CMSLinkAddEdit", "/e.Editor/Modules/6_CMSElement/CMSVideo/CMSVideoAddEdit", "/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageAddEdit"];
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
     * @param {any} objContext
     * @summry
     */
    OkClick(objContext) {
        if (objContext.props.PassedEvents.GetElementJson) {
            if (objContext.externalLinkRef.current.value != "http://") { // check if externa link is empty else send selected node element json.
                objContext.props.PassedEvents.GetElementJson(objContext, { externalLink: objContext.externalLinkRef.current.value });
            } else {
                objContext.props.PassedEvents.GetElementJson(objContext.props.Data.objContext, objContext.state.objSelectedElementJson);
            }
            objContext.props.ClosePopup(objContext.props.ObjModal);
        }
    }

    getDate(strDate) {
        var objDate = new Date(strDate);
        return objDate.getDay() + ":" + objDate.getMonth() + ":" + objDate.getFullYear();
    }
   

}

export default CMSLinkAddEdit_ModuleProcessor;