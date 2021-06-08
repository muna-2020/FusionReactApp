// React related imports.
import React, { useReducer, useState } from 'react';

//Components used...
import JSONFormatter from '@root/Framework/Controls/JSONFormatter/JSONFormatter';

/**
  * @name ViewCSRStateProps
  * @param {object} props props
  * @summary This component displays the DatabaseComparision.
  * @returns {object} React.Fragement that encapsulated the display grid with DatabaseCompare details.
  */
const ViewCSRStateProps = props => {

    /**
     *@summary local state for performance log
     */
    const [jsxDifference, setjsxDifference] = useState([]);

    /**  
     * @name GetContent
     * @summary Get the content to display
     * @return {Jxs} jsx to view
     */
    function GetContent() {
        let objCurrentRenderData = {};
        if (props.Data.objStateProps && props.Data.objStateProps && Object.keys(props.Data.objStateProps).length > 0) {
            objCurrentRenderData = Object.values(props.Data.objStateProps.StateAndProps)[0];
        }
        
        let objPreviuosRenderData = {};
        if (props.Data.objStateProps && props.Data.objPreviuosProps && Object.keys(props.Data.objPreviuosProps).length > 0) {
            objPreviuosRenderData = Object.values(props.Data.objPreviuosProps.StateAndProps)[0];
        }

        return (
            <React.Fragment>
                <div className="flex">
                    {
                        Object.keys(objPreviuosRenderData).length > 0 ?
                            <div style={{ overflow: "auto", height: "450px" }} >
                                <span style={{ "fontSize": "21px", "color": "darkmagenta" }}>{"Previous State&Props:"}</span>
                                <span>
                                    {
                                        <JSONFormatter Data={{ JSONData: objPreviuosRenderData }} Expand={true} />
                                    }
                                </span>
                            </div> : <React.Fragment />
                    }
                    <div style={{ overflow: "auto", height: Object.keys(objPreviuosRenderData).length != 0 ? "450px" : "650px" }} >

                        <span style={{ "fontSize": "21px", "color": "darkmagenta" }}>{"Current State&Props:"}</span>
                        <span>
                            {
                                <JSONFormatter Data={{ JSONData: objCurrentRenderData }} Expand={true} />
                            }
                        </span>
                    </div>                   
                </div>
                {Object.keys(objPreviuosRenderData).length != 0 ?
                    <div>
                        <button onClick={() => { GetDiffrence(objPreviuosRenderData, objCurrentRenderData) }}>{"Find Difference"}</button>
                    </div>
                    :
                    <React.Fragment />}
                <div>
                    {
                        jsxDifference.length != 0 ? GetDiffrenceToRender(jsxDifference) : <React.Fragment />
                    }
                </div>
            </React.Fragment>
        )
    }

    const GetDiffrenceToRender = (jsxDifference) => {
        return jsxDifference;
    }

    const GetDiffrence = (objPreviuosObject, objCurrentObject) => {
        if (objPreviuosObject!= null && Object.keys(objPreviuosObject).length > 0) {

            // if both are function
            if (objPreviuosObject instanceof Function) {
                if (objCurrentObject instanceof Function) {
                    return objPreviuosObject.toString() === objPreviuosObject.toString();
                }
                return false;
            }

            if (objPreviuosObject === null || objPreviuosObject === undefined || objCurrentObject === null || objCurrentObject === undefined) {
                return objPreviuosObject === objCurrentObject;
            }

            if (objPreviuosObject === objCurrentObject || objPreviuosObject.valueOf() === objCurrentObject.valueOf()) { return true; }

            // if one of them is date, they must had equal valueOf
            if (objPreviuosObject instanceof Date) { return false; }

            if (objCurrentObject instanceof Date) { return false; }

            // if they are not function or strictly equal, they both need to be Objects
            if (!(objPreviuosObject instanceof Object)) { return false; }

            if (!(objCurrentObject instanceof Object)) { return false; }
            var objOldObjectKeys = Object.keys(objPreviuosObject);
            var objOldObjectValues = Object.values(objPreviuosObject);

            return Object.keys(objCurrentObject).every(function (i, intIndex) {
                let blnIsSame = true;
                if (i != "Props" && i != "State") {
                    let iIndexOfKey = objOldObjectKeys.indexOf(i);
                    blnIsSame = objOldObjectKeys.indexOf(i) !== -1 && objOldObjectValues.indexOf(objCurrentObject[i]) !== -1;

                    console.log("*****************************", i);
                    if (!blnIsSame) {
                        let jsxDifferentKey = [];
                        jsxDifferentKey = (
                            <React.Fragment>
                                <span style={{ "color": "rgb(12, 127, 149)" }}>
                                    {"Previous- " + i }
                                </span>
                                <span style={{ "color": "rgb(122, 118, 100)" }}>
                                    {": "+objPreviuosObject[i]}
                                </span>
                                &nbsp;
                                <span style={{ "color": "rgb(12, 127, 149)" }}>
                                    {"Current - " + i}
                                </span>
                                <span style={{ "color": "rgb(122, 118, 100)" }}>
                                    {":" + objCurrentObject[i]}
                                </span>
                            </React.Fragment>
                        );
                        let jsxDiffrenceObject = jsxDifference;
                        jsxDiffrenceObject = [...jsxDiffrenceObject, jsxDifferentKey];
                        setjsxDifference(jsxDiffrenceObject);
                    }
                }
                return blnIsSame;
            }) ?
                objOldObjectKeys.every(function (i) { return GetDiffrence(objPreviuosObject[i], objCurrentObject[i]); }) : false;
        }
        return {};
    }

    /**
      * @summary returns JSX
      */
    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>
    );
}

export default ViewCSRStateProps;