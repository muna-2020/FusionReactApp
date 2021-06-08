// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';

/**
* @name GetInitialState
* @summary Reducer
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {};
}

/**
* @name useAddPopups
* @param {object} objContext takes  objContext
* @summary Reducer this is responsible for adding ShowErrorPopup,ShowConfirmationPopup, ShowPopup and ClosePopup based on ComponentName
*/
export function useAddPopups(objContext) {
    useEffect(() => {
        window[objContext.props.Meta.GroupName] = {
            ['ShowErrorPopup']: (objPopupData) => objContext.Popup_ComponentProcessor.AddNewPopup(objContext, objPopupData, "ErrorPopup"),
            ['ShowConfirmationPopup']: (objPopupData) => objContext.Popup_ComponentProcessor.AddNewPopup(objContext, objPopupData, "ConfirmationPopup"),
            ['ShowProgressBarPopup']: (objPopupData) => objContext.Popup_ComponentProcessor.AddNewPopup(objContext, objPopupData, "ProgressBarPopup"),
            ['ShowTabbedPopup']: (objPopupData) => objContext.Popup_ComponentProcessor.AddNewPopup(objContext, objPopupData, "TabbedPopup"),
            ['ShowPopup']: (objPopupData) => objContext.Popup_ComponentProcessor.AddNewPopup(objContext, objPopupData, "ComponentPopup"),
            ["ClosePopup"]: (strPopupId) => objContext.Popup_ComponentProcessor.ClosePopup(objContext, strPopupId)
        };
    }, [objContext.state, objContext.props]);

    useImperativeHandle(objContext.PopupRef, () => ({
        "GetLatestContext": () => {
            return objContext;
        }
    }), [objContext.state, objContext.props])
}