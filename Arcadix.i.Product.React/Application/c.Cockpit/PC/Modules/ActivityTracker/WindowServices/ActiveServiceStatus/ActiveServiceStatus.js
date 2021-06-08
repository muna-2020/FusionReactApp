//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as ActiveServiceStatus_Hook from '@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/ActiveServiceStatus/ActiveServiceStatus_Hook';
import ActiveServiceStatus_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/ActivityTracker/WindowServices/ActiveServiceStatus/ActiveServiceStatus_ModuleProcessor";

/**
* @name ActiveServiceStatus
* @param {object} props props
* @summary This component displays the ActiveServiceStatus data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with ActiveServiceStatus details.
*/
const ActiveServiceStatus = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ActiveServiceStatus_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ActiveServiceStatus", ["ActiveServiceStatus_ModuleProcessor"]: new ActiveServiceStatus_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.ActiveServiceStatus_ModuleProcessor.Initialize(objContext, objContext.ActiveServiceStatus_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in ActiveServiceStatus_Hook, that contains all the custom hooks.
    * @returns null
    */
    ActiveServiceStatus_Hook.Initialize(objContext);

    /**
     * JSX for ActiveServiceStatus
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/ActiveServiceStatus", objContext.props);
        return (
            <FillHeight
                ParentProps={{ ...props }}
                id="ActiveServiceFillHeight" Meta={{ HeaderIds: ["Header", "BreadCrumb"], FooterIds: ["FooterTeacherLogin"], AdditionalPadding: 150 }} className="bgStyle" scrollStyle={{ overflow: "auto" }}>
                <div className="ftp-service-status">
                    {
                        objContext.state.arrServiceStatus.map((objService) => {
                            return (
                                <div>
                                    <b>Server Name:{objService.ServerName}</b>
                                    <div className="flex">
                                        {
                                            objService.ServiceStatus.map((objServiceDisplayDetails) => {
                                                return (
                                                    <div className="ftp-status-text">
                                                        <div>Service Name: <span>{objServiceDisplayDetails.ServiceName}</span></div>
                                                        <div>Status: <span style={{ "color": objServiceDisplayDetails.Status == "Running" ? "green" : "red" }}>{objServiceDisplayDetails.Status}</span></div>
                                                        <div>Startup Type: <span>{objServiceDisplayDetails.StartType}</span></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </FillHeight>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default ActiveServiceStatus;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ActiveServiceStatus_ModuleProcessor; 