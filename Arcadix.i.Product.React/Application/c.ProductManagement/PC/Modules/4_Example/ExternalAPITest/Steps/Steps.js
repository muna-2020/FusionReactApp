//React related imports 
import React, { useReducer } from 'react';

//Module related imports
import * as Steps_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/ExternalAPITest/Steps/Steps_Hook';

const Steps = (props) => {

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { props };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ExternalAPITest_Hook, that contains all the custom hooks.
     * @returns null
     */
    Steps_Hook.Initialize(objContext);

    const GetContent = () => {
        let strGetCall = `fetch('http://localhost:9007/API/Object/Cockpit/MainClient/ApplicationType', {\n
                method: "GET",\n
                headers: new Headers({\n
                    'Content-Type': 'application/json',
                    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2x'
                }),
                credentials: 'same-origin'
            }).then(objResponse => { return objResponse.json() })`;
        let strPostCall = `fetch('http://localhost:9007/API/ApiAccessAuthentication/ValidateUser', {\n
                method: "POST",\n
                body: {\n
                    "Params": {
                        "UserName": "Cockpit",\n
                        "Password": "dsashgas621037823bndss7223",
                        "Host": "localhost:9007/"
                    }
                },
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'same-origin'
            }).then(objResponse => { return objResponse.json() })`;
        return (
            <React.Fragment>
                <div>
                    <span>step:1 </span>
                </div>
                <div>
                    &nbsp;
                    <span>Do the fetch call with Post Method Type to get the Token with Params </span>
                </div>
                <br/>
                <div>
                    &nbsp;
                    <span>{
                        strPostCall
                    }</span>
                </div>
                <br />
                <div>
                    <span>Step:2 </span>
                </div>
                <div>
                    &nbsp;
                    <span>Pass the Token in th Header with key "Token" for subsequent get call </span>
                </div>
                <br />
                <div>
                    &nbsp;
                    <span>{
                        strGetCall                       
                    }</span>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>);
}

export default Steps