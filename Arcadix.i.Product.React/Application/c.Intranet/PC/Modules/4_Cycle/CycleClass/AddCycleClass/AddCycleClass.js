// React related imports.
import React, { useReducer } from 'react';

//Module related fies...
import * as AddCycleClass_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleClass/AddCycleClass/AddCycleClass_Hook';
import AddCycleClass_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleClass/AddCycleClass/AddCycleClass_ModuleProcessor';

/**
* @name Cycle
* @param {object} props props
* @summary This component displays Popup for CycleClass.
* @returns {object} React.Fragement that contains dropdowns to select State, School, Teacher and Class.
*/
const AddCycleClass = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddCycleClass_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["AddCycleClass_ModuleProcessor"]: new AddCycleClass_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to laod the custom hooks.
     * @returns null
     */
    AddCycleClass_Hook.Initialize(objContext);

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
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddCycleClass_ModuleProcessor.HandleDropDownChange("state", objChangeData, objContext),
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
                    SelectedValue: props.Data.DropdownData.SelectedSchool["uSchoolId"] ? props.Data.DropdownData.SelectedSchool["uSchoolId"] : -1
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddCycleClass_ModuleProcessor.HandleDropDownChange("school", objChangeData, objContext)
                }}
                ParentProps={{ ...props.ParentProps }}
            />
        );
    }

    /**
     * @name GetTeacherDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetTeacherDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uTeacherId"
                Data={{
                    DropdownData: state.arrTeacherData,
                    SelectedValue: -1
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "uTeacherId",
                    DisplayColumn: "vName",
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddCycleClass_ModuleProcessor.HandleDropDownChange("teacher", objChangeData, objContext)
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetClassDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetClassDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="uClassId"
                Data={{
                    DropdownData: state.arrClassData,
                    SelectedValue: -1
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "uClassId",
                    DisplayColumn: "vClassName",
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddCycleClass_ModuleProcessor.HandleDropDownChange("class", objChangeData, objContext)
                }}
                ParentProps={{ ...props }}
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

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "Teacher")}:	</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown" Id="uTeacherId">
                                {GetTeacherDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "Class")}:	</span>
                        </div>
                        <div className="row-right">
                            <div className="intranet-dropdown" Id="uClassId">
                                {GetClassDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="popup-footer">
                <button className="btn" onClick={() => objContext.AddCycleClass_ModuleProcessor.SetSelectedClass(objContext)}>
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

///**
// * @name GetDimensions
// * @param {any} objPopupData     
// * @summary adds new popup by updating the local state with new popup details.
// */
//AddCycleClass.GetDimensions = (objPopupData) => {
//    return {
//        Height: objPopupData && objPopupData.Meta.Height ? objPopupData.Meta.Height : 662,
//        Width: objPopupData && objPopupData.Meta.Width ? objPopupData.Meta.Width : 950
//    };
//};

export default AddCycleClass;