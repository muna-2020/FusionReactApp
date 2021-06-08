// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as IntranetAdministrator_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/IntranetAdministrator_Hook';
import IntranetAdministrator_ModuleProcessor from "@shared/Application/c.Intranet/Modules/8_Setting/IntranetAdministrator/IntranetAdministrator_ModuleProcessor";

//In-line Image imports...
import SendLoginImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SendLogin_Large.svg?inline';

/**
* @name IntranetAdministrator
* @param {object} props props
* @summary This component displays the IntranetAdministrator data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with IntranetAdministrator details.
*/

const IntranetAdministrator = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, IntranetAdministrator_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "IntranetAdministrator", ["IntranetAdministrator_ModuleProcessor"]: new IntranetAdministrator_ModuleProcessor(), ["ImageMeta"]: GetImageMeta()  };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in IntranetAdministrator_Hook, that contains all the custom hooks.
    * @returns null
    */
    IntranetAdministrator_Hook.Initialize(objContext);

    /**
* @name  InitializeDataForSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.IntranetAdministrator_ModuleProcessor.Initialize(objContext, objContext.IntranetAdministrator_ModuleProcessor);

    /**
 * @name GetMainClientDropDown
 * @summary Forms the  jsx required for the dropdown.
 * @returns {object} jsx, React.Fragment
 */
    const GetMainClientDropDown = (objTextResource) => {
        return (
            <div className="filter-block">
                <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectMainClient"]}</span>
                <PerformanceProfiler ComponentName={"MainClientDropDown"} JConfiguration={props.JConfiguration}>
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="MainClientDropDown"
                        Data={{
                            DropdownData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"] ? DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"] : [],
                            SelectedValue: state.strMainClientId
                        }}
                        Meta={{
                            IsLanguageDependent: "N",
                            ValueColumn: "iMainClientId",
                            DisplayColumn: "vMainClientIdentifier",
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
                            OnChangeEventHandler: (objChangeData, props) => objContext.IntranetAdministrator_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
                            CheckDeletedDropDownData: objContext.IntranetAdministrator_ModuleProcessor.CheckDeletedDropDownDataEventHandler
                        }}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            </div>
        );
    }


    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/IntranetAdministrator", objContext.props);
        objTextResource = objTextResource ? objTextResource : {};
        return (
            <div className="subject-container">
                {(objContext.props.ClientUserDetails.MainClientId == 0 && objContext.props.ClientUserDetails.ApplicationTypeId == 7) ?
                    <div className="filter" id="filterHeader">
                            {GetMainClientDropDown(objTextResource)}
                    </div>
                    : <React.Fragment />
                }
                <div>
                    <PerformanceProfiler ComponentName={"IntranetAdministratorGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='IntranetAdministratorGrid'
                            Meta={objContext.IntranetAdministrator_ModuleProcessor.GetMetaData(objContext)}                            
                            Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                            Data={objContext.IntranetAdministrator_ModuleProcessor.GetGridData(objContext)}
                            CallBacks={objContext.IntranetAdministrator_ModuleProcessor.GetCallBacks(objContext)}                            
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
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

export default connect(IntranetBase_Hook.MapStoreToProps(IntranetAdministrator_ModuleProcessor.StoreMapList()))(IntranetAdministrator);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = IntranetAdministrator_ModuleProcessor; 