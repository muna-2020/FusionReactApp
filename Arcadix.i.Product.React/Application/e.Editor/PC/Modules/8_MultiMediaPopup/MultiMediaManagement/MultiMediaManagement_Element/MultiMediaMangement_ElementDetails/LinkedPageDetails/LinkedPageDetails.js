// React related import
import React, { useReducer } from 'react';

import { connect } from "react-redux";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import * as LinkedPageDetails_Hook from '@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Element/MultiMediaManagement_ElementDetails/LinkedPageDetails/LinkedPageDetails_Hook';
import LinkedPageDetails_ModuleProcessor from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Element/MultiMediaManagement_ElementDetails/LinkedPageDetails/LinkedPageDetails_ModuleProcessor";

/**
 * @name LinkedPageDetails
 * @param {any} props
 */
const LinkedPageDetails = (props) => {

    /**
  * @name [state,dispatch]
  * @summary Define state and dispatch for the reducer to set state.
  * @returns {[]} state and dspatch
  */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, LinkedPageDetails_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = {
        state,
        props,
        dispatch,
        ["LinkedPageDetails_ModuleProcessor"]: new LinkedPageDetails_ModuleProcessor(props)
    };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in LinkedPageDetails_Hook, that contains all the custom hooks.
    * @returns null
    */
    LinkedPageDetails_Hook.Initialize(objContext);

    const GetContent = () => {
        return (
            <div style={{ "padding": "7px 10px" }} className="linked-page-details-wrapper" >
                <span style={{ "fontSize": "18px", "fontWeight": "bold" }}> Verlinkt in den folgenden Seiten </span>
                <div style={{ "padding": "7px 10px" }}>
                    {
                        objContext.state.arrLinkedPageDetails.map((e) => {
                            return (
                                <div>
                                    <span style={{ "textDecoration": "underline" }}>{e.vPageName}</span>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    objContext.state.arrLinkedPageDetails.length === 0 && <span> Dieses Bild wird in keiner Seite eingesetzt. </span>
                }
            </div>
        );
    }

    return GetContent();
};


function mapStateToProps(state, ownProps) {
    return {
        [`LinkedPageDetails`]: state.Entity[`Object_Editor_TaskContent_CMSElement_LinkedPageDetails;ielementid;${ownProps.ElementDetails.iElementId}`]
    };
}

export default connect(mapStateToProps)(LinkedPageDetails);
//export default connect(EditorBase_Hook.MapStoreToProps(LinkedPageDetails_ModuleProcessor.StoreMapList(props)))(LinkedPageDetails);