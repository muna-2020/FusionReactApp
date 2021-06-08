//React imports
import React from 'react';

//Module related fies.
import CMSTrueFalse_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_Editor/CMSTrueFalse_Editor_ContextMenu";

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";


/**
  * @name CMSTrueFalse_Editor_ModuleProcessor
  * @summary Contains the checkbox's editor version module specific methods.
  */
class CMSTrueFalse_Editor_ModuleProcessor extends CMSTrueFalse_Editor_ContextMenu {

    /**
      * @name CloseSidebar
      * @summary Closes the side bar.
      */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }    

    /**
      * @name OnCheckChange
      * @param {object} objContext {state, props, dispatch, CMSTrueFalse_Editor_ModuleProcessor}
      * @param {object} objValue checkbox value object
      * @summary Triggered when the checkbox is checked/unchecked.
      */
    OnCheckChange(objContext, objValue) {
        let arrValues = objContext.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
            if (objTempValue["iElementTrueFalseValueId"] === objValue["iElementTrueFalseValueId"]) {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: objTempValue["cIsCorrectValue"] === "N" ? "Y" : "N"
                };
            }
            else {
                return {
                    ...objTempValue,
                    ["cIsCorrectValue"]: "N"};
            }
        });
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["vElementJson"]: {
                ...objContext.state.ElementJson["vElementJson"],
                ["Values"]: arrValues
            }
        };
        objContext.dispatch({ type: "SET_STATE", payload: { "ElementJson": objElementJson } });
    }

    /**
      * @name GetDynamicStyles
      * @param {object} props component props.
      * @summary this returns the styles for the SSR.
      */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSTrueFalse/CMSTrueFalseStyles.css"
        ];
    }
}

export default CMSTrueFalse_Editor_ModuleProcessor;
