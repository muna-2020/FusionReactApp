//React related imports 
import React, { useEffect, useReducer } from 'react';

//Base module imports
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook.js';

//Module related imports
import * as SignalRDemo_Hook from '@shared/SupportApplication/Demo/Modules/SignalRDemo/SignalRDemo_Hook';
import SignalRDemo_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/SignalRDemo/SignalRDemo_ModuleProcessor';

//global variable for SignalR Hub connection.
window.objConnection = null;

/**
 * @name SignalRDemo
 * @param {object} props props
 * @summary This component shows connect to SignalR hub and listen to the events .
 * @returns {object} React.Fragement that encapsulated the sample View to send data to server and listen to the event.
 */
const SignalRDemo = (props) => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dspatch
      */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, SignalRDemo_Hook.GetInitialState());

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, ["SignalRDemo_ModuleProcessor"]: new SignalRDemo_ModuleProcessor()};

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in SignalRDemo_Hook, that contains all the custom hooks.
      * @returns null
      */
    SignalRDemo_Hook.Initialize(objContext);

    /**
      * @name GetContent
      * @summary Forms the whole jsx required for the module.
      * @returns {object} jsx, React.Fragment
      */
    const GetContent = () => {
        return (
            <React.Fragment>
                <table>
                    <tr>
                        <td>Enter data to save </td>
                        <td><input type="Text" value={state.DataToSave} onChange={(objEvent) => { objContext.SignalRDemo_ModuleProcessor.onChangeHandler(objContext, objEvent) }} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onClick={() => { objContext.SignalRDemo_ModuleProcessor.onClickHandler(objContext, state.DataToSave) }}>Save</button></td>
                    </tr>
                    <tr>
                        <td>Data</td>{
                            state.Data != undefined ?
                                <td>{state.Data.Params}</td> :
                                <td></td>
                        } 
                    </tr>
                </table>
            </React.Fragment>)
    };

    return (
        <React.Fragment>
            {state.Data != undefined ? GetContent() : <React.Fragment></React.Fragment>}
        </React.Fragment>);
}

export default SignalRDemo;