//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as FTPMemberImportDemo_Hook from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImportDemo/FTPMemberImportDemo_Hook';
import FTPMemberImportDemo_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImportDemo/FTPMemberImportDemo_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import DetailsImage from '@inlineimage/Common/ReactJs/PC/Icons/details.svg?inline';
import CompareImage from '@inlineimage/Common/ReactJs/PC/Icons/compare1.svg?inline';

/**
* @name FTPMemberImportDemo
* @param {object} props props
* @summary This component displays the FTPMemberImportDemo data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with FTPMemberImportDemo details.
*/
const FTPMemberImportDemo = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, FTPMemberImportDemo_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "FTPMemberImportDemo", ["FTPMemberImportDemo_ModuleProcessor"]: new FTPMemberImportDemo_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.FTPMemberImportDemo_ModuleProcessor.Initialize(objContext, objContext.FTPMemberImportDemo_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    FTPMemberImportDemo_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        return <div className="file-explorer-container">
            <PerformanceProfiler ComponentName="FTPMemberImportDemoGrid" JConfiguration={JConfiguration}>
                <Grid
                    Id="FTPMemberImportDemoGrid"
                    Meta={objContext.FTPMemberImportDemo_ModuleProcessor.GetMetaData(objContext)}
                    Data={objContext.FTPMemberImportDemo_ModuleProcessor.GetGridData(objContext)}
                    Resource={objContext.FTPMemberImportDemo_ModuleProcessor.GetResourceData(objContext)}
                    Events={objContext.FTPMemberImportDemo_ModuleProcessor.GetGridEvents(objContext)}
                    CallBacks={objContext.FTPMemberImportDemo_ModuleProcessor.GetGridCallBacks(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(FTPMemberImportDemo_ModuleProcessor.StoreMapList()))(FTPMemberImportDemo);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = FTPMemberImportDemo_ModuleProcessor; 