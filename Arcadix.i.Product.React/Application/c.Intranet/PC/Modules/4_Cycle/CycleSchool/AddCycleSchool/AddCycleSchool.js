// React related imports.
import React, { useReducer } from 'react';

//Module related fies...
import * as AddCycleSchool_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchool/AddCycleSchool/AddCycleSchool_Hook';
import AddCycleSchool_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchool/AddCycleSchool/AddCycleSchool_ModuleProcessor';


/**
* @name Cycle
* @param {object} props props
* @summary This component displays Pop up for CycleSchool.
* @returns {object} React.Fragement that contains drop downs to select State and School.
*/
const AddCycleSchool = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddCycleSchool_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["AddCycleSchool_ModuleProcessor"]: new AddCycleSchool_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    AddCycleSchool_Hook.Initialize(objContext);

    /**
     * @name GetStateDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iStateId"
                Data={{
                    DropdownData: objContext.props.Data.DropdownData.StateData,
                    SelectedValue: props.Data.DropdownData.SelectedState["iStateId"] ? props.Data.DropdownData.SelectedState["iStateId"] : -1
                }}
                Meta={{
                    DependingTableName: "t_TestDrive_Member_State_Data",
                    IsLanguageDependent: "Y",
                    ValueColumn: "iStateId",
                    DisplayColumn: "vStateName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.CockpitSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddCycleSchool_ModuleProcessor.HandleDropDownChange("state", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetSchoolDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetSchoolDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="vSchoolName"
                Data={{
                    DropdownData: state.arrSchoolData,
                    SelectedValue: state.strSchoolId ? state.strSchoolId : -1
                }}
                Meta={{
                    ValueColumn: "uSchoolId",
                    DisplayColumn: "vSchoolName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.ParentProps.JConfiguration,
                    SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddCycleSchool_ModuleProcessor.HandleDropDownChange("school", objChangeData, objContext)
                }}
                ParentProps={{ ...props.ParentProps }}
            />
        );
    }

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the Popup.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = props.Resource.Text;
        return <div className="add-cycle-school">
            <div className="add-cycle-content">
                <h3>{Localization.TextFormatter(objTextResource, "PopupNote")}</h3>


                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "State")}:	</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown" Id="iStateId">
                                {GetStateDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "School")}:	</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown" Id="uSchoolId">
                                {GetSchoolDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popup-footer">
                <button className="btn" onClick={() => objContext.AddCycleSchool_ModuleProcessor.SetSelectedSchool(objContext)}>
                    OK
                </button>
                <button className="btn" onClick={() => { props.Events.CloseEvent ? props.Events.CloseEvent(props.Id) : Popup.ClosePopup(props.Id); }}>
                    CANCEL
                </button>
            </div>

        </div>
    }

    return GetContent();

}

export default AddCycleSchool;