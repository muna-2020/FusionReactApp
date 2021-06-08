//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import Editor_TaskContent_CMSImageAddEdit_Module from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImageAddEdit/CMSImageAddEdit_Module';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
* @name ImageAddEdit_ModuleProcessor
* @summary Class for ImageAddEdit popup display.
*/
class CMSImageAddEdit_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageAddEdit", "Editor_TaskContent_CMSImageAddEdit_Module"];
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

        //CMSImageAddEdit object
        Editor_TaskContent_CMSImageAddEdit_Module.Initialize({});
        arrDataRequest = [...arrDataRequest, Editor_TaskContent_CMSImageAddEdit_Module];

        // Text Resource
        let arrResourceParams = ["/e.Editor/Modules/6_CMSElement/CMSImage/CMSImageAddEdit"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }


    /**
     * @name getRabdomInt
     * @param {number} min minimum
     * @param {number} max maximum
     * @returns {number} returns random integer 
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @name OkClick
     * @param {object} objContext { state, props, dispatch }
     * @summary sends selected image element json to the parent
     */
     async OkClick(objContext) {
        if (objContext.state.strSelectedTab.toLowerCase() === "global") {
            if (objContext.props.PassedEvents.GetElementJson) {
                // Gets the selected Image json and returns it to the element where popup is called
                objContext.props.PassedEvents.GetElementJson(objContext.ImageManagementRef.current.GetSelectedImageJson());
                objContext.props.ClosePopup(objContext.props.ObjModal);
            }
        }
        else {
            // Uploads the file and returns element json on success. This happens inside ImageAddEdit
            let objReponse = await objContext.ImageAddEditRef.current.UploadFile();
            if (objReponse && objContext.props.PassedEvents.GetElementJson) {
                objContext.props.PassedEvents.GetElementJson(objReponse);
                objContext.props.ClosePopup(objContext.props.ObjModal);
            }
        }
    }
}

export default CMSImageAddEdit_ModuleProcessor;