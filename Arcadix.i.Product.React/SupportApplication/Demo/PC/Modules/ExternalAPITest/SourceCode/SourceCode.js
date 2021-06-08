//React related imports 
import React from 'react';

//Module related imports
import * as SourceCode_Hook from '@shared/SupportApplication/Demo/Modules/ExternalAPITest/SourceCode/SourceCode_Hook';

const SourceCode = (props) => {

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
    SourceCode_Hook.Initialize(objContext);

    const GetContent = () => {
        return (
            <React.Fragment>
                <div>
                    <span>use Below source code to call the APIs </span>
                </div>
                <div>
                    <span>1. For post call to get the Token: </span>
                </div>
                <br />
                <div>
                    <span>{
                        `fetch('http://localhost:9007/API/ApiAccessAuthentication/ValidateUser', {\n
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
                        }).then(objResponse => { return objResponse.json() })`
                    }</span>
                </div>
                <br />
                <div>
                    <span>2. For Get call to any API using Token: </span>
                </div>
                <div>
                    <span>{
                        `fetch('http://localhost:9007/API/Object/Cockpit/MainClient/ApplicationType', {\n
                            method: "GET",\n
                            headers: new Headers({\n
                                'Content-Type': 'application/json',
                                "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2x'
                            }),
                            credentials: 'same-origin'
                        }).then(objResponse => { return objResponse.json() })`
                    }</span>
                </div>
                <br />                
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>);
};

export default SourceCode