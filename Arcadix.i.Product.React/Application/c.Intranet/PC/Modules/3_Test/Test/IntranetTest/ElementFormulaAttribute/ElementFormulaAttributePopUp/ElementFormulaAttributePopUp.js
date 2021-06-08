// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as ElementFormulaAttribute_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttribute_Hook';
import ElementFormulaAttribute_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttribute_ModuleProcessor';

/**
 * @name ElementFormulaAttributePopUp
 * @param {object} props props
 * @summary This component is used to Assign a names to template
 * @returns {object} React.Fragement that contains the content to be added in popup required for ElementFormulaAttribute.
 */
const ElementFormulaAttributePopUp = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ElementFormulaAttribute_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ElementFormulaAttribute_ModuleProcessor"]: new ElementFormulaAttribute_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTask_Hook, that contains all the custom hooks.
      * @returns null
      */
    //ElementFormulaAttribute_Hook.Initialize(objContext);

    /**
   * @summary JSX for ElementFormulaAttributePopUp
   */
    function GetContent() {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute", objContext.props);
        return <div className="delete-popup-parent">
            <div className="delete-popup-header">
                <h3>{objTextResource.Title}</h3>
                <span>{objTextResource.SubTitle}</span>
            </div>
            <div className="delete-popup-content-flex">
                <div className="col">{objTextResource.Message}</div>
                <div className="col">
                    <input className="text-input"
                        id="vTemplateName"
                        type="text"
                        onChange={(e) => {
                            objContext.ElementFormulaAttribute_ModuleProcessor.onTemplateTextChange("vTemplateName", e.target.value, objContext)
                        }}
                        value={state.objData["vTemplateName"]} />
                </div>
            </div>
            <div className="delete-popup-footer">
                <button className="delete-btn" onClick={() =>
                    props.Data.strMethodType == "SaveAs" ?
                        objContext.ElementFormulaAttribute_ModuleProcessor.onTemplatePopUpSave(objContext, props.Data["objContext"].state.objselectedElementAttribute, props.Data["objContext"].state.arrElementAttributeData, props.Data["objContext"]) :
                        objContext.ElementFormulaAttribute_ModuleProcessor.SaveData(objContext)
                }
                >
                    {objTextResource.ToSave}
                </button>
                <button className="delete-btn" onClick={() => { props.Events.CloseEvent ? props.Events.CloseEvent(props.Id) : Popup.ClosePopup(props.Id); }}>
                    {objTextResource.DeletePopupConfirmButtonText}
                </button>
            </div>
        </div>
    }

    return GetContent(); //props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;

}

export default connect(IntranetBase_Hook.MapStoreToProps(ElementFormulaAttribute_ModuleProcessor.StoreMapList()))(ElementFormulaAttributePopUp);

