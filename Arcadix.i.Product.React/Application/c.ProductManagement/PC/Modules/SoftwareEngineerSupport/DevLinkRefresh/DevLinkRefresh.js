// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as DevLinkRefresh_Hook from '@shared/Application/c.ProductManagement/Modules/SoftwareEngineerSupport/DevLinkRefresh/DevLinkRefresh_Hook';
import DevLinkRefresh_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/SoftwareEngineerSupport/DevLinkRefresh/DevLinkRefresh_ModuleProcessor';


/**
* @name DevLinkRefresh
* @param {object} props props
* @summary This component displays the DevLinkRefresh data
* @returns {object} React.Fragement that contains DevLinkRefresh details.
*/
const DevLinkRefresh = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, DevLinkRefresh_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "DevLinkRefresh", ["DevLinkRefresh_ModuleProcessor"]: new DevLinkRefresh_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.DevLinkRefresh_ModuleProcessor.Initialize(objContext, objContext.DevLinkRefresh_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    DevLinkRefresh_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefresh", objContext.props);
 
        return <div className="add-edit-test-table">
            <table>
                <tr className="mb-10">
                    <td>{Localization.TextFormatter(objTextResource, "VSDoc")}</td>
                    <td>{state.objServiceStatusRefs.VsDocman.current}</td>
                    <td>
                         <button className ="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "VsDocman")}
                >{Localization.TextFormatter(objTextResource, "Refresh")}
                </button>
                    </td>                   
                </tr>

                <tr className="mb-10">
                    <td>{Localization.TextFormatter(objTextResource, "JSDoc")}</td>
                    <td>{state.objServiceStatusRefs.JSDoc.current}</td>
                    <td>
                         <button className ="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "JSDoc")}
                >{Localization.TextFormatter(objTextResource, "Refresh")}
                </button>
                    </td>                   
                </tr>

                <tr className="mb-10">
                    <td><b>{Localization.TextFormatter(objTextResource, "DBDocumentation")}</b></td>
                    <td>
                        <button className="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "DBDocumentation")}
                        >{"RefreshAll"}
                        </button>
                    </td>
                </tr>

                <tr className="mb-10">
                    <td>{"Arcadix_Fusion_Cockpit_Export"}</td>
                    <td>{state.objServiceStatusRefs.Arcadix_Fusion_Cockpit_Export.current}</td>
                    <td>
                        <button className="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "Arcadix_Fusion_Cockpit_Export")}
                        >{Localization.TextFormatter(objTextResource, "Refresh")}
                        </button>
                    </td>
                </tr>

                <tr className="mb-10">
                    <td>{"Arcadix_Fusion_Editor_Export"}</td>
                    <td>{state.objServiceStatusRefs.Arcadix_Fusion_Editor_Export.current}</td>
                    <td>
                        <button className="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "Arcadix_Fusion_Editor_Export")}
                        >{Localization.TextFormatter(objTextResource, "Refresh")}
                        </button>
                    </td>
                </tr>

                <tr className="mb-10">
                    <td>{"Arcadix_Fusion_Extranet_Export"}</td>
                    <td>{state.objServiceStatusRefs.Arcadix_Fusion_Extranet_Export.current}</td>
                    <td>
                        <button className="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "Arcadix_Fusion_Extranet_Export")}
                        >{Localization.TextFormatter(objTextResource, "Refresh")}
                        </button>
                    </td>
                </tr>

                <tr className="mb-10">
                    <td>{"Arcadix_Fusion_Intranet_Export"}</td>
                    <td>{state.objServiceStatusRefs.Arcadix_Fusion_Intranet_Export.current}</td>
                    <td>
                        <button className="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "Arcadix_Fusion_Intranet_Export")}
                        >{Localization.TextFormatter(objTextResource, "Refresh")}
                        </button>
                    </td>
                </tr>

                <tr className="mb-10">
                    <td>{"Arcadix_Fusion_Test_Export"}</td>
                    <td>{state.objServiceStatusRefs.Arcadix_Fusion_Test_Export.current}</td>
                    <td>
                        <button className="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "Arcadix_Fusion_Test_Export")}
                        >{Localization.TextFormatter(objTextResource, "Refresh")}
                        </button>
                    </td>
                </tr>

                {/*
                <tr className="mb-10">
                    <td>{Localization.TextFormatter(objTextResource, "DBDocumentation")}</td>
                    <td><Dropdown
                        Id={"Dropdown_Sample"}
                        {...objContext.DevLinkRefresh_ModuleProcessor.GetDbDocDropDownProps(objContext)}
                        ParentProps={{ ...props }}
                    /></td>
                    <td>
                         <button className ="btn"
                            onClick={() => objContext.DevLinkRefresh_ModuleProcessor.OnRefreshClick(objContext, "DBDocumentation")}
                        >{Localization.TextFormatter(objTextResource, "Refresh")}                
                        </button>
                    </td>                   
                </tr>
                */}
            </table>
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(DevLinkRefresh_ModuleProcessor.StoreMapList()))(DevLinkRefresh);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = DevLinkRefresh_ModuleProcessor;