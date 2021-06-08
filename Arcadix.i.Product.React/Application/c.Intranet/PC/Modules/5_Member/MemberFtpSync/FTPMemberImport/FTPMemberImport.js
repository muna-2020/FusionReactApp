//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as FTPMemberImport_Hook from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport/FTPMemberImport_Hook';
import FTPMemberImport_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport/FTPMemberImport_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import DetailsImage from '@inlineimage/Common/ReactJs/PC/Icons/details.svg?inline';
import CompareImage from '@inlineimage/Common/ReactJs/PC/Icons/compare1.svg?inline';

/**
* @name FTPMemberImport
* @param {object} props props
* @summary This component displays the FTPMemberImport data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with FTPMemberImport details.
*/
const FTPMemberImport = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, FTPMemberImport_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "FTPMemberImport", ["FTPMemberImport_ModuleProcessor"]: new FTPMemberImport_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.FTPMemberImport_ModuleProcessor.Initialize(objContext, objContext.FTPMemberImport_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    FTPMemberImport_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        return <div className="file-explorer-container">
            <PerformanceProfiler ComponentName="FTPMemberImportGrid" JConfiguration={JConfiguration}>
                <Grid
                    Id="FTPMemberImportGrid"
                    Meta={objContext.FTPMemberImport_ModuleProcessor.GetMetaData(objContext)}
                    Data={objContext.FTPMemberImport_ModuleProcessor.GetGridData(objContext)}
                    Resource={objContext.FTPMemberImport_ModuleProcessor.GetResourceData(objContext)}
                    Events={objContext.FTPMemberImport_ModuleProcessor.GetGridEvents(objContext)}
                    CallBacks={objContext.FTPMemberImport_ModuleProcessor.GetGridCallBacks(objContext)}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
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
        CompareImage: CompareImage,
        DetailsImage: DetailsImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(FTPMemberImport_ModuleProcessor.StoreMapList()))(FTPMemberImport);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = FTPMemberImport_ModuleProcessor; 