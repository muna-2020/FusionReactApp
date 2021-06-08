// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as StateAdministrator_Hook from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/StateAdministrator_Hook';
import StateAdministrator_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/StateAdministrator/StateAdministrator_ModuleProcessor';

//In-line Image imports...
import SendLoginImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SendLogin_Large.svg?inline';

/**
 * @name StateAdministrator
 * @param {object} props props
 * @summary This component displays the StateAdministrator  data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with StateAdministrator  details.
 */
const StateAdministrator = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, StateAdministrator_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "StateAdministrator", ["StateAdministrator_ModuleProcessor"]: new StateAdministrator_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.StateAdministrator_ModuleProcessor.Initialize(objContext, objContext.StateAdministrator_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in StateAdministrator_Hook, that contains all the custom hooks.
     * @returns null
     */
    StateAdministrator_Hook.Initialize(objContext);

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
                    DropdownData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                    SelectedValue: state.strStateId ? state.strStateId : -1
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
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "All")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.StateAdministrator_ModuleProcessor.OnStateDropDownChange(objContext, objChangeData),
                    CheckDeletedDropDownData: objContext.StateAdministrator_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetContent
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/StateAdministrator", objContext.props) ?? {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "OrganizationalUnit")}</span>
                        {GetStateDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <Grid
                        Id='StateAdministratorGrid'
                        Meta={objContext.StateAdministrator_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.StateAdministrator_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                        Data={objContext.StateAdministrator_ModuleProcessor.GetGridData(objContext)}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        SendLoginImage: SendLoginImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(StateAdministrator_ModuleProcessor.StoreMapList()))(StateAdministrator);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = StateAdministrator_ModuleProcessor; 