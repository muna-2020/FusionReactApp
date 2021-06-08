import * as React from "react";
import { connect } from "react-redux";

//Module related imports
import ServiceAction_ModuleProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Master/ServiceAction/ServiceAction_ModuleProcessor";

const ServiceAction = props => {

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { props, ["ModuleName"]: props.Id, ["ServiceAction_ModuleProcessor"]: new ServiceAction_ModuleProcessor() };

    return (
        <div className="top-right">
            <ul>
              
                <li>
                    <img
                        src={
                            props.ParentProps.JConfiguration.IntranetSkinPath +
                            "/Images/Common/Icons/UserTop.svg"
                        }
                    />
                    <span>{
                        props.ParentProps.ClientUserDetails != undefined?
                        Localization.TextFormatter(props.Resource.Text, "UserName") + ": " + props.ParentProps.ClientUserDetails != undefined ? props.ParentProps.ClientUserDetails.UserName : '':''
                    }</span>                   
                    <li>
                        <img src={props.ParentProps.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/FileStatus.svg"} title={props.RunningOfflineProcesses + " processes running of " + props.TotalOfflineProcesses} />
                        <span onClick={() => objContext.ServiceAction_ModuleProcessor.ShowOfflinePopup(objContext)}>{props.RunningOfflineProcesses + "/" + props.TotalOfflineProcesses}</span>
                    </li>
                </li>
                <li>
                    <img
                        src={
                            props.ParentProps.JConfiguration.IntranetSkinPath +
                            "/Images/Common/Icons/Help.svg"
                        }
                        onClick={props.Events.OnHelpClick}
                    />
                </li>
                <li>
                    <img
                        src={
                            props.ParentProps.JConfiguration.IntranetSkinPath +
                            "/Images/Common/Icons/SignoutTop.svg"
                        }

                    />
                    {/* Text from TextResources, Implement Logout*/}
                    <span onClick={props.Events.OnLogoutClick}>{Localization.TextFormatter(props.Resource.Text, "LogOut")}</span>
                    {
                        //<span>Abmelden</span>
                    }
                </li>
            </ul>
        </div>
    );
};

export default connect(IntranetBase_Hook.MapStoreToProps(ServiceAction_ModuleProcessor.StoreMapList()))(ServiceAction);
