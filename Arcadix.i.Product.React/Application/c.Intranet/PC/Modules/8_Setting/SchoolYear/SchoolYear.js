// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';


//Module related fies.
import * as SchoolYear_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/SchoolYear_Hook';
import SchoolYear_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolYear/SchoolYear_ModuleProcessor';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler"

/**
 * @name SchoolYear
 * @param {object} props props
 * @summary This component displays the SchoolYear data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with SchoolYear details.
 */
const SchoolYear = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, SchoolYear_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SchoolYear", ["SchoolYear_ModuleProcessor"]: new SchoolYear_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SchoolYear_ModuleProcessor.Initialize(objContext, objContext.SchoolYear_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in SchoolYear_Hook, that contains all the custom hooks.
     * @returns null
     */
    SchoolYear_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/SchoolYear", props) ?? {};
        return (
            <div className="subject-container">
                <PerformanceProfiler ComponentName={"SchoolYearGrid"} JConfiguration={props.JConfiguration}>
                    <Grid
                        Id="SchoolYearGrid"
                        Meta={objContext.SchoolYear_ModuleProcessor.GetMetaData(objContext)}
                        Resource={objContext.SchoolYear_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                        Data={objContext.SchoolYear_ModuleProcessor.GetGridData(objContext)}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            </div>
        );
    };
    return (
        <React.Fragment>{
            props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
        }
        </React.Fragment>
    );
};


export default connect(IntranetBase_Hook.MapStoreToProps(SchoolYear_ModuleProcessor.StoreMapList()))(SchoolYear);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolYear_ModuleProcessor;