// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as BusinessUnit_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/BusinessUnit_Hook';
import * as BusinessUnit_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/BusinessUnit_MetaData';
import BusinessUnit_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/BusinessUnit_ModuleProcessor';

/**
* @name BusinessUnit
* @param {object} props props
* @summary This component displays the BusinessUnit  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with BusinessUnit  details.
*/
const BusinessUnit = props => {
    

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, BusinessUnit_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "BusinessUnit", ["BusinessUnit_ModuleProcessor"]: new BusinessUnit_ModuleProcessor() };


    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in BusinessUnit_Hook, that contains all the custom hooks.
    * @returns null
    */
    BusinessUnit_Hook.Initialize(objContext);

    /**
* @name  InitializeDataForSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.BusinessUnit_ModuleProcessor.Initialize(objContext, objContext.BusinessUnit_ModuleProcessor);


    /**
    * @name GetContent
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit", objContext.props);
        objTextResource = objTextResource ? objTextResource : {}
        return (
            <div className="subject-container">
                <PerformanceProfiler ComponentName={"BusinessUnitGrid"} JConfiguration={props.JConfiguration}>
                    <Grid
                        Id='BusinessUnitGrid'
                        Meta={{ ...BusinessUnit_MetaData.GetMetaData(), Filter: { "cIsDeleted": "N"} }}
                        Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                        Data={objContext.BusinessUnit_ModuleProcessor.GetGridData(objContext)}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(BusinessUnit_ModuleProcessor.StoreMapList()))(BusinessUnit);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = BusinessUnit_ModuleProcessor; 