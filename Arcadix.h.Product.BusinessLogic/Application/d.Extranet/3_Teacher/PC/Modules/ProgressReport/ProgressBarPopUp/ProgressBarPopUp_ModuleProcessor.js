/**
* @name ProgressBarPopUp_ModuleProcessor
* @summary Class for ProgressBarPopUp_ModuleProcessor module display and manipulate.
*/
class ProgressBarPopUp_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
       * @name LoadInitialData
       * @param {object} objContext context object
       * @summary Calls the Queue and Execute method
       */
    LoadInitialData(objContext) {        
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/PupilLogin/CreatePdfPopUp.css"
        ];
    }

    /**
       * @name InitialDataParams
       * @param {object} props Passes props
       * @summary Get initial request params for the component.
       * @returns {Array} return arrays of initial request params
       */
    InitialDataParams(props) {
        return [];
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }

}