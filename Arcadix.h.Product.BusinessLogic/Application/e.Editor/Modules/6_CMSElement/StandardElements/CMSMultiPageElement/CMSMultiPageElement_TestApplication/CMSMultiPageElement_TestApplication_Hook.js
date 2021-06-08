//React Imports
import React, { useEffect, useImperativeHandle } from 'react';

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let cShowHeaderText = "N";
    let arrHeaderValues = [
        {
            "iElementTextId": null,
            "vHeaderType": "ElementHeader"
        }
    ];
    let arrTextElements = []; let arrElementValues = []; let arrValues = []; let arrNewValues = [];
    if (props.ElementJson["vElementJson"]["cShowHeaderText"]) {
        cShowHeaderText = props.ElementJson["vElementJson"]["cShowHeaderText"];
    }
    if (props.ElementJson["vElementJson"]["HeaderValues"]) {
        arrHeaderValues = [...props.ElementJson["vElementJson"]["HeaderValues"]];
    }
    if (props.ElementJson["vElementJson"]["TextElements"]) {
        arrTextElements = [...props.ElementJson["vElementJson"]["TextElements"]];
    }
    if (props.ElementJson["ElementValues"]) {
        arrElementValues = [...props.ElementJson["ElementValues"]];
        arrValues = [...props.ElementJson["vElementJson"]["Values"]];
        let iLength = arrValues.length;
        for (let iCount = 0; iCount < iLength; iCount++) {
            let objElementValue = arrValues[iCount];
            if (!/(text|empty)/.test(objElementValue.vElementTypeName.toLowerCase())) {
                arrNewValues = [...arrNewValues, { ...arrElementValues.find((e) => objElementValue[`iElement${objElementValue.vElementTypeName}Id`] === e.iElementId), ["Ref"]: React.createRef(), "IsSubElement": objElementValue.vElementTypeName.toLowerCase() !== "audio" ? "Y" : "N" }];
            }
            else {
                arrNewValues = [...arrNewValues, { ...objElementValue, ["Ref"]: React.createRef() }];
            }
        }
    }
    return {
        "ElementJson": {
            ...props.ElementJson,
            ["vElementJson"]: {
                ...props.ElementJson["vElementJson"],
                ["cShowHeaderText"]: cShowHeaderText,
                ["HeaderValues"]: arrHeaderValues,
                ["TextElements"]: arrTextElements,
                ["Values"]: arrNewValues
            }
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "objCurrentSlideElementJson": null,
        "intSlideLength": 0,
        "intCurrentSlideIndex": 0,
        "intPreviousSlideIndex": 0,
        "isLoadComplete": false,
        "blnDisplay": true,
        "localQueue": []
    };
}

/**
 * @name Initialize
 * @param {object} objContext passes Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (!objContext.state.isLoadComplete && objContext.props.ElementJson) {
            objContext.CMSMultiPageElement_TestApplication_ModuleProcessor.AddOrDeleteSlide(objContext, 0, { "isLoadComplete": true, "intSlideLength": objContext.state.ElementJson["vElementJson"].Values.length });
        }
    }, [objContext.props.ElementJson]);

    /**
     * @summary Gets the Element Json.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        // "GetUserResponse": () => {
        //     let arrResponse = [];
        //     objContext.state.ElementJson["vElementJson"]["TextElements"].map(objTempElement => {
        //         if (objTempElement.Ref.current !== null && objTempElement.Ref.current.GetUserResponse) {
        //             arrResponse = [
        //                 ...arrResponse,
        //                 ...objTempElement.Ref.current.GetUserResponse()
        //             ];
        //         }
        //     });
        //     arrResponse = [
        //         {
        //             ["iElementId"]: objContext.state.ElementJson["iElementId"],
        //             ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
        //             ["Answers"]: [],
        //             ["TextElements"]: arrResponse
        //         }
        //     ];
        //     return arrResponse;
        // },
        "GetLatestContext": () => {
            return objContext;
        }
    }), [objContext.state, objContext.props]);
}
