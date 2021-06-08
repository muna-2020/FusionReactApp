// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as EssayBilling_Hook from '@shared/Application/c.Intranet/Modules/7_Report/Essay/EssayBilling/EssayBilling_Hook';
import EssayBilling_ModuleProcessor from '@shared/Application/c.Intranet/Modules/7_Report/Essay/EssayBilling/EssayBilling_ModuleProcessor';

//In-line Image imports...
import ExportOnlineImage from '@inlineimage/Common/ReactJs/PC/JNavigation/ExportOnlineTest.svg?inline';

/**
 * * @name Import
* @param {object} props props
* @summary This component EssayBilling the Import.
* @returns {object} React.Fragement that encapsulated the display grid with Import  details.
*/
const EssayBilling = props => {

/**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, EssayBilling_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "EssayBilling", ["EssayBilling_ModuleProcessor"]: new EssayBilling_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.EssayBilling_ModuleProcessor.Initialize(objContext, objContext.EssayBilling_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in EssayBilling_Hook, that contains all the custom hooks.
     * @returns null
     */
    EssayBilling_Hook.Initialize(objContext);

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
                    DropdownData: DataRef(objContext.props.Object_Extranet_State_State)["Object_Extranet_State_State;cIsDeleted;N"]["Data"],
                    SelectedValue: objContext.state.strStateId ? objContext.state.strStateId : -1
                }}
                Meta={{
                    DependingTableName: "t_TestDrive_Member_State_Data",
                    IsLanguageDependent: "Y",
                    ValueColumn: "iStateId",
                    DisplayColumn: "vStateName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true",
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: "PleaseChoose"
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.EssayBilling_ModuleProcessor.HandleDropdownChange(objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetContent
     * @summary return JSX for the page.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/Essay/EssayBilling", objContext.props) ?? {};
        return (
            <div className="data-export">
                <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "OrganizationalUnit")}:	</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            {GetStateDropDown(objTextResource)}
                        </div>
                    </div>
                </div>
                </div>
                <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "IsKeyCloak")}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input id="cIsTestSchool"
                                name="check"
                                type="checkbox"
                                checked={state.blnIsKeyCloak}
                                onChange={(e) => {
                                    objContext.EssayBilling_ModuleProcessor.HandleChange("blnIsKeyCloak", !state.blnIsKeyCloak , objContext)
                                }} />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>
                </div>
            </div >
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        ExportOnlineImage: ExportOnlineImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(EssayBilling_ModuleProcessor.StoreMapList()))(EssayBilling);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = EssayBilling_ModuleProcessor; 

