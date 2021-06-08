// React related imports.
import React, { useReducer, useRef } from 'react';
import PopupFrame from "@root/Framework/Blocks/Popup/PopupFrame/PopupFrame";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component realted fies.
import * as Popup_Hook from '@shared/Framework/Blocks/Popup/Popup_Hook';
import Popup_ComponentProcessor from '@shared/Framework/Blocks/Popup/Popup_ComponentProcessor';

/**
* @name Popup
* @param {object} props props
* @summary This component displays the Popup.
* @returns {object} returns a jsx .
*/
const Popup = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Popup_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    const objContext = { 
        state, 
        props, 
        dispatch, 
        ["ModuleName"]: props.Id,
        PopupRef: useRef(null),
        ["Popup_ComponentProcessor"]: new Popup_ComponentProcessor() 
    };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Popup_ComponentProcessor.Initialize(objContext, objContext.Popup_ComponentProcessor);

    /**
    * this is responsible for adding ShowErrorPopup, ShowConfirmationPopup, ShowPopup and ClosePopup based on ComponentName
    */
    Popup_Hook.useAddPopups(objContext);
  
    /**
     * @name GetContent
     * @param {any} props
     * @returns  JSX for Popup
     */
    const GetContent = () => {
        return state[props.Meta.GroupName].map((objPopupParam) => {
            return <PopupFrame key={objPopupParam.Id + 'popupframe'}
                {...objPopupParam}
            />
        });
    };

    return state[props.Meta.GroupName] && state[props.Meta.GroupName].length != 0 ? GetContent() : <React.Fragment />;

};

export default Popup;