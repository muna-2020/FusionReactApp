//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes...
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Module related imports
import OffineExecutionDisplay_ModuleProcessor from "@shared/Application/c.Intranet/LoginAndMaster/Master/OffineExecutionDisplay/OffineExecutionDisplay_ModuleProcessor";
import ViewOfflineExecution from '@root/Framework/Controls/Offline/ViewOffineExecution/ViewOffineExecution';
import * as OfflineExecutionDisplay_Hook from '@shared/Application/c.Intranet/LoginAndMaster/Master/OffineExecutionDisplay/OfflineExecutionDisplay_Hook';

/**
 * @name OfflineExecutionDisplay
 * @param {any} props
 */
const OfflineExecutionDisplay = (props) => {
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, OfflineExecutionDisplay_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "OfflineExecutionDisplay", ["OffineExecutionDisplay_ModuleProcessor"]: new OffineExecutionDisplay_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in OfflineExecutionDisplay_Hook, that contains all the custom hooks.
    * @returns null
    */
    OfflineExecutionDisplay_Hook.Initialize(objContext);

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.OffineExecutionDisplay_ModuleProcessor.Initialize(objContext, objContext.OffineExecutionDisplay_ModuleProcessor);
    //props.OfflineExecutionData

    const GetContent = () => {
        let cIsOfflineClosed = ApplicationState.GetProperty("cIsOfflineClosed") ? ApplicationState.GetProperty("cIsOfflineClosed") : "";
        return <ViewOfflineExecution
            {...props}
            Data={{
                ModuleName: "ViewOfflineExecution",
                IsEdit: false,
                Id: "ViewOfflineExecution",
                objContext: objContext,
                OfflineExecutionData: props.OfflineExecutionData, //objContext.props.Data.OfflineExecutionData,
                uOfflineProcessExecutionId: "00000000-0000-0000-0000-000000000000",//uOfflineProcessExecutionId,
                cIsShowAll: true,//uOfflineProcessExecutionId == "00000000-0000-0000-0000-000000000000" ? true : false
                cIsOfflineClosed:"N"
            }}            
        />
    }

    return props.OfflineExecutionData ? GetContent() : <React.Fragment></React.Fragment>;
}

export default connect(IntranetBase_Hook.MapStoreToProps(OffineExecutionDisplay_ModuleProcessor.StoreMapList()))(OfflineExecutionDisplay);
