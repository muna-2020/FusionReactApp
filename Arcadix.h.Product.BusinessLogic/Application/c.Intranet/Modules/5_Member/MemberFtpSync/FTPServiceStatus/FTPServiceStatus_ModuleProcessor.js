//Module Objects
import Intranet_Member_MemberFtpSync_FTPServiceStatus from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus/FTPServiceStatus_Module';

/**
 * @name FTPServiceStatus_ModuleProcessor
 * @param NA
 * @summary Class for FTPServiceStatus module display.
 * @return NA
 */
class FTPServiceStatus_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus",
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            //  props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
        ];
    }

    /**
     * @name GetFtpServiceStatus
     * @param {any} objContext
     */
    GetFtpServiceStatus(objContext) {
        Intranet_Member_MemberFtpSync_FTPServiceStatus.GetFtpServiceStatus({}, (objResponse) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "strFtpProcessStatus": objResponse.Status } });
        });
    }

}

export default FTPServiceStatus_ModuleProcessor;