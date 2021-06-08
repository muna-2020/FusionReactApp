//React related imports 
import React, { useReducer } from 'react';

//Base module imports
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook.js';

//Module related imports
import * as ExternalAPITest_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/ExternalAPITest/ExternalAPITest_Hook';
import ExternalAPITest_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/ExternalAPITest/ExternalAPITest_ModuleProcessor';


/**
 * @name ExternalAPITest
 * @param {object} props props
 * @summary shows the example of connecting the external APIs .
 * @returns {jsx} React.Fragement that encapsulated the sample View to send data to server and listen to the event.
 */
const ExternalAPITest = (props) => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dspatch
      */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ExternalAPITest_Hook.GetInitialState());

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, ["ExternalAPITest_ModuleProcessor"]: new ExternalAPITest_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in ExternalAPITest_Hook, that contains all the custom hooks.
      * @returns null
      */
    ExternalAPITest_Hook.Initialize(objContext);

    /**
      * @name GetContent
      * @summary Forms the whole jsx required for the module.
      * @returns {object} jsx, React.Fragment
      */
    const GetContent = () => {
        return (
                <div>
                    <table>
                        <tr>
                            <td>
                                <span>Get</span>
                                <input type="radio" checked={!state.blnIsPostData} onChange={() => objContext.ExternalAPITest_ModuleProcessor.OnCheckBoxClick(objContext, false)} />
                                <span>Post</span>
                                <input type="radio" checked={state.blnIsPostData} onChange={() => objContext.ExternalAPITest_ModuleProcessor.OnCheckBoxClick(objContext, true)} />
                            </td>
                        </tr>
                        <tr>
                            <td><input type="Text" style={{ width: "370px" }} value={state.DataToSave}
                                onChange={(objEvent) => { objContext.ExternalAPITest_ModuleProcessor.OnChangeHandler(objContext, objEvent) }} />
                                &nbsp;
                            <button onClick={() => { objContext.ExternalAPITest_ModuleProcessor.OnClickHandler(objContext) }}>Submit</button></td>
                        </tr>
                        <tr>
                            <td>{state.blnIsPostData ? "Body" : "Header"}</td>
                        </tr>
                        <tr>
                            <td>
                                <textarea rows="12" cols="60" value={state.RequestBody} onChange={(objEvent) => objContext.ExternalAPITest_ModuleProcessor.OnReuestBodyUpdate(objContext, objEvent)}>
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>Response</td>
                        </tr>
                        <tr>
                            <td>
                                <textarea rows="12" cols="100" value={state.ResponseJson != null ? JSON.stringify(state.ResponseJson) : ""}>
                                </textarea>
                            </td>
                        </tr>
                    </table>
                </div>
        );
    };

    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>);
}

export default ExternalAPITest;