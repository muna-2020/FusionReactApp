//React related imports 
import React, { useReducer } from 'react';

//Base module imports
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook.js';

//Module related imports
import * as ServerSideCall_Hook from '@shared/SupportApplication/Demo/Modules/ExternalAPITest/ServerSideCall/ServerSideCall_Hook';



/**
 * @name ServerSideCall
 * @param {object} props props
 * @summary Component shows the steps for external API server side call.
 * @returns {object} React.Fragement that encapsulated the sample View to send data to server and listen to the event.
 */
const ServerSideCall = (props) => {

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { props};

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in ExternalAPITest_Hook, that contains all the custom hooks.
      * @returns null
      */
    ServerSideCall_Hook.Initialize(objContext);

    /**
      * @name GetContent
      * @summary Forms the whole jsx required for the module.
      * @returns {object} jsx, React.Fragment
      */
    const GetContent = () => {
        let strContent = "";
        return (
            <div>
                <div>
                    <span>Step:1</span>                    
                </div>
                <div>
                    <span>Use the below code to do post call get the Token </span>
                </div>
                <br/>
                <div>
                    &nbsp;
                    <span>{
                    `
                        using (HttpClient objHttpCLient = new HttpClient())
                            {
                                HttpResponseMessage objMessage = objHttpCLient.PostAsync(new Uri(http://localhost:9007/API/ApiAccessAuthentication/ValidateUser), new StringContent({
                                                                                         ["Params"] : {
                                                                                                        ["UserName"]:"Cockpit"
                                                                                                        ["Password"]: "dsashgas62103"        
                                                                                                       }   
                                                                                        }, Encoding.UTF8, "application/JSON")).Result;
                    `
                    }</span>
                </div>
                <br/>
                <div>
                    <span>Step:2</span>
                </div>
                <br/>
                <div>
                    <span>Go the Get call to to required API by passing Token [we received from previous call] in Header.</span>
                </div>
                <div>
                    &nbsp;
                    <span>{
                        `
                        using (HttpClient objHttpCLient = new HttpClient())
                            {
                                objHttpCLient.DefaultRequestHeaders.Add("Token", "jh6YSDuuhNMFEhxqLd/6hSr5sMwxwqComTJUNEE5Xyq8mO1a/6LGRqyRIArg/kOvQo+0KZKd6tTwTlGYHZidsQ==");
                                HttpResponseMessage objMessage = objHttpCLient.GetAsync(new Uri(http://localhost:9007/API/Object/Cockpit/MainClient/ApplicationType)).Result;
                    `
                    }</span>
                </div>
            </div>);
    };

    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>);
}

export default ServerSideCall;