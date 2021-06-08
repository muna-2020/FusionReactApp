//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TestTaskProperties_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/TestTaskProperties_Hook';
import TestTaskProperties_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/TestTaskProperties_ModuleProcessor';
import Hierarchy from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/Hierarchy';
import Index from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/Index';
import Navigation from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Navigation/Navigation';
import Time from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/Time';

/**
* @name TestTaskProperty.
* @param {object} props props.
* @summary This component is used to Add/Edit the TestTaskProperty.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const TestTaskProperty = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TestTaskProperties_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "TestTaskProperties_ModuleProcessor": new TestTaskProperties_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource};

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestTaskProperties_ModuleProcessor.Initialize(objContext, objContext.TestTaskProperties_ModuleProcessor);

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in Subject_Hook, that contains all the custom hooks.
      * @returns null
      */
    TestTaskProperties_Hook.Initialize(objContext);

    /**
    * JSX for subject
    */
    function GetContent() {
        //var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalPropertyValue", objContext.props);
        return (
            <div>
                {state.strDivToShow == "Hierarchy" ? (<div id="Hierarchy" className="hierarchy" >
                    <Hierarchy
                        Resource={{
                            Text: objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props)
                        }}
                        Callbacks={{
                            SetOfficeRibbonData: objContext.props.SetOfficeRibbonData
                        }}
                        arrtasktotestData={objContext.state.arrtasktotestData}
                     Event={
                            {
                             onEditComplete: (objReturn) => {
                                    objContext.TestTaskProperties_ModuleProcessor.GetDataForGrid(objContext, objReturn)
                             }
                            }
                        }
                        {...props}
                    />
                </div>) : null}
                {
                    state.strDivToShow == "Index" ? (<div id="Index" className="hierarchy" style={{ display: (state.strDivToShow == "Index" ? "block" : "none") }}>
                        <Index
                            Resource={{
                                Text: objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props)
                            }}
                            Callbacks={{
                                SetOfficeRibbonData: objContext.props.SetOfficeRibbonData
                            }}
                            arrtasktotestData={objContext.state.arrtasktotestData}
                            Event={
                                {
                                    onEditComplete: () => {
                                        objContext.TestTaskProperties_ModuleProcessor.GetDataForGrid(objContext, {})
                                    }
                                }
                            }
                            {...props}
                        />
                    </div>):null
                }
                {
                    state.strDivToShow == "Navigation" ? (<div id="Index" className="hierarchy" style={{ display: (state.strDivToShow == "Navigation" ? "block" : "none") }}>
                        <Navigation
                            Resource={{
                                Text: objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props)
                            }}
                            Callbacks={{
                                SetOfficeRibbonData: objContext.props.SetOfficeRibbonData
                            }}
                            arrtasktotestData={objContext.state.arrtasktotestData}
                            Event={
                                {
                                    onEditComplete: () => {
                                        objContext.TestTaskProperties_ModuleProcessor.GetDataForGrid(objContext, {})
                                    }
                                }
                            }
                            {...props}
                        />
                    </div>) : null
                }
                {
                    state.strDivToShow == "Time" ? (<div id="Index" className="hierarchy" style={{ display: (state.strDivToShow == "Time" ? "block" : "none") }}>
                        <Time
                            Resource={{
                                Text: objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props)
                            }}
                            Callbacks={{
                                SetOfficeRibbonData: objContext.props.SetOfficeRibbonData
                            }}
                            arrtasktotestData={objContext.state.arrtasktotestData}
                            Event={
                                {
                                    onEditComplete: () => {
                                        objContext.TestTaskProperties_ModuleProcessor.GetDataForGrid(objContext, {})
                                    }
                                }
                            }
                            {...props}
                        />
                    </div>) : null
                }
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );

}

////required for SSR
//TestTaskProperty.InitialDataParams = (props) => {
//    return (new ObjectQueue()).Queue((new TestTaskProperties_ModuleProcessor()).InitialDataParams(props));
//};

export default connect(IntranetBase_Hook.MapStoreToProps(TestTaskProperties_ModuleProcessor.StoreMapList()))(TestTaskProperty);
