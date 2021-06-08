//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

class CMSContainer_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name ShowCalculator
     * @param {any} objContext { state, props, SelectionRef, dispatch, Ref: SubElementState, TextDomRef, ["Text_Editor_ModuleProcessor"] }.
     */
    ShowCalculatorPopup(objContext) {
        var objCalculatorPopup = {
            "Data": {
                ...objContext.props,
                //["CalculatorType"]: "Scientific"
            },
            "Meta": {
                "PopupName": "Calculator",
                "Height": '462px',
                "Width": '265px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": false,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {}
        };

        if (typeof TestApplicationPopup !== "undefined" && TestApplicationPopup) {
            TestApplicationPopup.ShowPopup(objCalculatorPopup);
        }
        else {
            editorPopup.ShowPopup(objCalculatorPopup); // preview mode
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/5_CMSContainer/ContainerTemplates/ContainerTemplates.css"];
    }

}

export default CMSContainer_TestApplication_ModuleProcessor;