// React related imports.
import { useEffect, useImperativeHandle } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        uploadPercentage: 0,
        arrFileData: props.Data ? props.Data.FileData ? props.Data.FileData : [] : [], // if Data is passed from module then takes the Data initializes the local state.
        allowTypes: ".doc,.csv,.mov,.mpeg,.docx,.xls,.xlsx,.pps,.ppt,.pptx,.pdf,.Mp3,.Mp4,.txt,.htm,.html,.rtf,application/zip,image/*",
        blnShowValidation:false
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext, ref) {
    useClearDefault(objContext);
    useLoadFiles(objContext, ref);
}

/**
* @name useEffect
* @summary To Clear the uploaded file details from The module --> props.Reload has to be toggled.
*/
export function useClearDefault(objContext) {
    useEffect(() => {
        if (objContext.props.Data.Reload) {
            objContext.dispatch({ type: "SET_STATE", payload: { arrFileData: [], uploadPercentage: 0 } });
        }
    }, [objContext.props.Data.Reload]);
}

/**
 * @name useLoadFiles
 * @summary defining 
 * @param {any} objContext
 */
export function useLoadFiles(objContext, ref) {
    useImperativeHandle(ref, () => ({
        GetUploadedFileDetails: () => {
            return JSON.stringify(objContext.state.arrFileData);
        }
    }), [objContext.state.arrFileData]);
}
