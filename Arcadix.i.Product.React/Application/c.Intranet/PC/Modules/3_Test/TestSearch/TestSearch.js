//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as TestSearch_Hook from '@shared/Application/c.Intranet/Modules/3_Test/TestSearch/TestSearch_Hook';
import TestSearch_ModuleProcessor from "@shared/Application/c.Intranet/Modules/3_Test/TestSearch/TestSearch_ModuleProcessor";

import SearchImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Search.gif?inline';
import SearchCancelImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/SearchCancel.svg?inline';

/**
* @name TestSearch
* @param {object} props props
* @summary This component displays the Test data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Test details.
*/
const TestSearch = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TestSearch_Hook.GetInitialState(props));

    /**
   * @name objContext
   * @summary Groups state.dispatch and module object(s) in objContext.
   * @returns {object} objContext
   */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestSearch", ["TestSearch_ModuleProcessor"]: new TestSearch_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestSearch_ModuleProcessor.Initialize(objContext, objContext.TestSearch_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TestSearch_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the jsx required for the FilterBlock in the Top.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let objTextResource = props.Resource.Text;
        return <div className="filter" id="FilterBlock">
            <div className="filter-block">
                <span className="filter-label">{objTextResource.Search}: </span>
                <input
                    className="text-input"
                    id=""
                    type="text"
                    onChange={(e) => {
                        objContext.TestSearch_ModuleProcessor.HandleChange(objContext, e.target.value, "SearchInput")
                    }}
                    value={state.strSearchText} />
            </div>
            <div className="filter-block">
                <span className="filter-label">{objTextResource.Where} </span>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="OptionId"
                    Data={{
                        DropdownData: objContext.TestSearch_ModuleProcessor.GetSearchDropDownData(objContext),
                        SelectedValue: objContext.state.blnSearchFromSameFolder ? 1 : 0
                    }}
                    Meta={{
                        ValueColumn: "OptionId",
                        DisplayColumn: "OptionText",
                        //DefaultOptionValue: - 1,
                        //ShowDefaultOption: "false"
                    }}
                    Resource={{
                        Text: {
                            // DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                        },
                        JConfiguration: props.ParentProps.JConfiguration,
                        SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.TestSearch_ModuleProcessor.HandleChange(objContext, objChangeData, "SearchOption"),
                        CheckDeletedDropDownData: objContext.TestSearch_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props.ParentProps }}
                />
            </div>
            <div className="filter-block">
                <span className="filter-label">{objTextResource.View} </span>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="TestType"
                    Data={{
                        DropdownData: objContext.TestSearch_ModuleProcessor.GetTestTypeDropDownData(objContext),
                        SelectedValue: objContext.state.strTestUsageId ? objContext.state.strTestUsageId : -1
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
                        JConfiguration: props.ParentProps.JConfiguration,
                        SkinPath: props.ParentProps.JConfiguration.IntranetSkinPath
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.TestSearch_ModuleProcessor.HandleChange(objContext, objChangeData, "TestType"),
                    }}
                    ParentProps={{ ...props.ParentProps  }}
                />
            </div>

            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "InternalTesting")}</span>
                <label className="checkbox">
                    <input id="cIsInternalTesting"
                        name="check"
                        type="checkbox"
                        checked={objContext.state.blnInternalTesting}//{blnIsActive}
                        onChange={(e) => {
                            objContext.TestSearch_ModuleProcessor.HandleChange(objContext, e.target.checked, "InternalTesting")
                        }} />
                    <span className="checkmark" />
                </label>
            </div>

            <div className="filter-block">
                {!state.blnSearchMode ? <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: SearchImage
                    }}
                    Events={{
                        OnClickEventHandler: () => { objContext.TestSearch_ModuleProcessor.Search(objContext) }
                    }}
                    ParentProps={objContext.props.ParentProps}
                />
                    :
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: SearchCancelImage
                        }}
                        Events={{
                            OnClickEventHandler: () => { objContext.TestSearch_ModuleProcessor.SearchCancel(objContext) }
                        }}
                        ParentProps={objContext.props.ParentProps}
                    />
                }
            </div>
        </div>;
    }

    return GetContent();
}

export default connect(IntranetBase_Hook.MapStoreToProps(TestSearch_ModuleProcessor.StoreMapList()))(TestSearch);