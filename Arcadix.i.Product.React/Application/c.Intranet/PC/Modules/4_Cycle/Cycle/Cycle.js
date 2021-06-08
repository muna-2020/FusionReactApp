//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as Cycle_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/Cycle_Hook';
import Cycle_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/Cycle_ModuleProcessor';
import CyclePropertyDetails from '@root/Application/c.Intranet/PC/Modules/4_Cycle/Cycle/CyclePropertyDetails/CyclePropertyDetails';

//Component used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import ActiveCycleImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/4_Cycle/Cycle/ActiveCycle.gif?inline';
import InActiveCycleImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/4_Cycle/Cycle/InActiveCycle.gif?inline';

/**
* @name Cycle
* @param {object} props props
* @summary This component displays the Cycle data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Cycle details.
*/
const Cycle = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Cycle_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Cycle", ["Cycle_ModuleProcessor"]: new Cycle_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Cycle_ModuleProcessor.Initialize(objContext, objContext.Cycle_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    Cycle_Hook.Initialize(objContext);

    /**
     * @name GetFilterBlock
     * @summary Forms the jsx required for the FilterBlock in the Top.
     * @returns {object} jsx
     */
    const GetFilterBlock = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {};
        return <div className="filter" id="FilterBlock">
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "Search")} </span>
                <input
                    className="text-input"
                    id=""
                    type="text"
                    onChange={(e) => {
                        //objContext.Cycle_ModuleProcessor.HandleChange(objContext, e.target.value, "SearchInput")
                    }}
                    value={state.strSearchText} />
            </div>
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "Where")} </span>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="OptionId"
                    Data={{
                        DropdownData: objContext.Cycle_ModuleProcessor.GetSearchFolderDropDownData(objContext),
                        SelectedValue: objContext.state.blnSearchFromSameFolder ? 1 : 0
                    }}
                    Meta={{
                        ValueColumn: "OptionId",
                        DisplayColumn: "OptionText",
                    }}
                    Resource={{
                        Text: {
                        },
                        JConfiguration: props.JConfiguration,
                        SkinPath: props.JConfiguration.IntranetSkinPath
                    }}
                    Events={{
                    }}
                    ParentProps={{ ...props }}
                />

            </div>
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "View")} </span>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="OptionId"
                    Data={{
                        DropdownData: objContext.Cycle_ModuleProcessor.GetSearchViewDropDownData(objContext),
                        SelectedValue: -1
                    }}
                    Meta={{
                        ValueColumn: "OptionId",
                        DisplayColumn: "OptionText",
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
                    Events={{
                        CheckDeletedDropDownData: objContext.Cycle_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />

            </div>
            <div className="filter-block">
                {!state.blnSearchMode ? <img
                    src={props.JConfiguration.IntranetSkinPath + "/Images/Common/CMS/ObjectBrowserMenu/Search.gif"}
                    alt=""
                    className="search"
                /> :
                    <img
                        src={props.JConfiguration.IntranetSkinPath + "/Images/Common/CMS/ObjectBrowserMenu/SearchCancel.svg"}
                        alt=""
                        className="search"
                    />
                }
                (-NI-)
            </div>
        </div>;
    }

    /**
     * @name GetDetailsBlock
     * @summary Forms the jsx required for the Details in the Right side.
     * @returns {object} jsx
     */
    const GetDetailsBlock = () => {
        let objSelectedRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["CycleGrid"] ? ApplicationState.GetProperty("SelectedRows")["CycleGrid"][0] : null;
        if (objContext.props.IsForServerRenderHtml) {
            objSelectedRow = {
                ["CycleGrid"]: [objContext.Cycle_ModuleProcessor.GetGridData(objContext)?.["RowData"]?.[0]] ?? []
            };
        }
        return objSelectedRow ?
            <CyclePropertyDetails
                {...props}
                Data={{
                    CycleData: objSelectedRow
                }}
                Resource={{
                    Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objContext.props) ?? {},
                    JConfiguration: objContext.props.JConfiguration
                }}
                Events={{
                    GetYesOrNo: (objTextResource, strText) => objContext.Cycle_ModuleProcessor.GetYesOrNo(objTextResource, strText)
                }}
                ComponentController={props.ComponentController}
            />
            :
            <div className="file-explorer-detail-empty-message">Empty Message</div>
    }

    /**
     * @name GetContent
      * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return <div className="file-explorer-container">
                {GetFilterBlock()}
            <div className="file-explorer-flex">
                <SplitPane Meta={{ SplitDirection: "vertical", MinSize: 600, MaxSize: 1200, DefaultSize: "70%" }}> 
                    <PerformanceProfiler ComponentName="CycleGrid" JConfiguration={JConfiguration}>
                        <Grid
                            Id="CycleGrid"
                            Meta={objContext.Cycle_ModuleProcessor.GetMetaData(objContext)}
                            Data={objContext.Cycle_ModuleProcessor.GetGridData(objContext)}
                            Resource={objContext.Cycle_ModuleProcessor.GetResourceData(objContext)}
                            Events={objContext.Cycle_ModuleProcessor.GetGridEvents(objContext)}
                            CallBacks={objContext.Cycle_ModuleProcessor.GetGridCallBacks(objContext)}
                            ParentProps={{ ...props }}
                            ImageMeta={GetImageMeta()}
                        />
                    </PerformanceProfiler>
                    {GetDetailsBlock()}
                </SplitPane>
                </div>
        </div>;
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
        ActiveCycleImage: ActiveCycleImage,
        InActiveCycleImage: InActiveCycleImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(Cycle_ModuleProcessor.StoreMapList()))(Cycle);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Cycle_ModuleProcessor; 