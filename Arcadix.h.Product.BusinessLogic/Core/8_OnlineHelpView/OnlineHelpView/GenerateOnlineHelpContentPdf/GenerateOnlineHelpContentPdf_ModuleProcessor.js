//Objects required for module.
import Framework_Core_OnlineHelpView_Module from '@shared/Core/8_OnlineHelpView/OnlineHelpView/GenerateOnlineHelpContentPdf/GenerateOnlineHelpContentPdf_Module';

/**
* @name GenerateOnlineHelpContentPdf_ModuleProcessor
* @summary Class for GenerateOnlineHelpContentPdf module popup.
*/
class GenerateOnlineHelpContentPdf_ModuleProcessor extends IntranetBase_ModuleProcessor {

    GenerateOnlineHelpContentPdf(objContext) {
        let objParams = {
            ...objContext.props,
            "PageJson": objContext.props.Data.PageJson,
            "FileName": "GenerateOnlineHelpContentPdf" + "_" + Date.now() + "_" + objContext.props.ParentProps.ClientUserDetails.UserId
        };
        Framework_Core_OnlineHelpView_Module.GenerateOnlineHelpContentPdf(objParams, (objResponse) => {
            //objContext.state.refProgressPercentage.current = 100;
            objContext.dispatch({ type: 'SET_STATE', payload: { "strFilePath": objResponse.FileName, "strPerCentage": 100} });
        });
    };

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }
}

export default GenerateOnlineHelpContentPdf_ModuleProcessor;