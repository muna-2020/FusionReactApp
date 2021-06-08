// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';


//Module related fies.
import * as SchoolType_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolType/SchoolType_Hook';
import SchoolType_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/SchoolType/SchoolType_ModuleProcessor';

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
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, SchoolType_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SchoolYear", ["SchoolType_ModuleProcessor"]: new SchoolType_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SchoolType_ModuleProcessor.Initialize(objContext, objContext.SchoolType_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in SchoolType_Hook, that contains all the custom hooks.
     * @returns null
     */
    SchoolType_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/SchoolType", props) ?? [];
        return (
            <div className="subject-container">
                    <Grid
                        Id="SchoolTypeGrid"
                    Meta={objContext.SchoolType_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.SchoolType_ModuleProcessor.GetGridResource(objContext, objTextResource)}
                    Data={objContext.SchoolType_ModuleProcessor.GetGridData(objContext)}
                    ParentProps={{ ...props }}
                    />
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

export default connect(IntranetBase_Hook.MapStoreToProps(SchoolType_ModuleProcessor.StoreMapList()))(SchoolYear);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolType_ModuleProcessor;