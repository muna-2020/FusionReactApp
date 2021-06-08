// React related import
import React, { useReducer, useRef } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

/**
 * @name MultiMediaManagement_ElementAddEdit
 * @param {object} props props from parent
 * @summary Loads respective media AddEdit component 
 * @returns {any} JSX
 */
const MultiMediaManagement_ElementAddEdit = (props) => {

    let ElementAddEditJsonRef = useRef();

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, {});

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };

    let objTextResource = objContext.props.Data.TextResource;

    /**
     * @name HandleEditMedia
     * @summary handles media upload 
     * */
    const HandleEditMedia = async () => {
        // uploading file handled inside ImageAddEdit
        let objResponse = await ElementAddEditJsonRef.current.UploadFile();
        if (objResponse && objContext.props.CallBacks.SaveElementDetails) {
            props.CallBacks.SaveElementDetails(objResponse);
            editorPopup.ClosePopup(props.Id);
        }
    };

    const Element = props.ComponentController.GetComponent(`${props.Data.MediaType}AddEdit`);
    return (
        <React.Fragment>
            <section>
                <div className="image-add-edit-header">
                    <h3>{`${props.Data.MediaType}${objTextResource["Element_Management"]}`}</h3>
                    <span>{`${objTextResource["Add_Edit_Element"]}${props.Data.MediaType}`}</span>
                </div>
                <div className="popupContent">
                    <Element {...props} ref={ElementAddEditJsonRef} TextResource={objTextResource} />
                    <footer>
                        <div className="fR">
                            <button className="btn btnOrnge" onClick={() => { HandleEditMedia(); }}> {objTextResource["Ok"]} </button>
                            <button className="btn btnOrnge" onClick={() => { editorPopup.ClosePopup(objContext.props.Id); }}> {objTextResource["Abort"]} </button>
                        </div>
                    </footer>
                </div>
            </section>
        </React.Fragment>
    );
};

export default MultiMediaManagement_ElementAddEdit;