//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as FTPServiceStatus_Hook from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus/FTPServiceStatus_Hook';
import FTPServiceStatus_ModuleProcessor from "@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus/FTPServiceStatus_ModuleProcessor";

/**
* @name FTPServiceStatus
* @param {object} props props
* @summary This component displays the FTPServiceStatus data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with FTPServiceStatus details.
*/
const FTPServiceStatus = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, FTPServiceStatus_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "FTPServiceStatus", ["FTPServiceStatus_ModuleProcessor"]: new FTPServiceStatus_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.FTPServiceStatus_ModuleProcessor.Initialize(objContext, objContext.FTPServiceStatus_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in FTPServiceStatus_Hook, that contains all the custom hooks.
    * @returns null
    */
    FTPServiceStatus_Hook.Initialize(objContext);

    /**
     * JSX for FTPServiceStatus
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPServiceStatus", objContext.props);
        return (
            <div className="ftp-service-status">
                <div className="ftp-status-text">
                    <b>{Localization.TextFormatter(objTextResource, "FtpProcessStatus")}</b> : <span>{Localization.TextFormatter(objTextResource, objContext.state.strFtpProcessStatus)}</span>
                </div>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default connect(IntranetBase_Hook.MapStoreToProps(FTPServiceStatus_ModuleProcessor.StoreMapList()))(FTPServiceStatus);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = FTPServiceStatus_ModuleProcessor; 