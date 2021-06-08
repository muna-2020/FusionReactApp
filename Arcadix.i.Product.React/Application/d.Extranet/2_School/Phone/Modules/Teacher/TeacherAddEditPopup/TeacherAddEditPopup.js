//React related imports.
import React, { useRef, useReducer, useState } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TeacherAddEditPopup_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/Teacher/TeacherAddEditPopup/TeacherAddEditPopup_Hook';
import TeacherAddEditPopup_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/Teacher/TeacherAddEditPopup/TeacherAddEditPopup_ModuleProcessor';


//Components used in module.
import Form from '@root/Framework/Blocks/Form/Form';

//Inline Images import
import CloseImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Grid/2.DataRow/EditableRow/close.svg?inline';

/**
* @name TeacherAddEditPopup
* @param {object} props props
* @summary This component opens up in a popup and can add multiple teachers using excell files.
* @returns {object} div that has file upload option.
*/
const TeacherAddEditPopup = (props) => {

    /**
    * @name objTextResource
    * @summary gets TextResource from props that is passed in events
    * @returns {object} TextResource object
    */
    var objTextResource = props.Resource.Text;

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherAddEditPopup_Hook.GetInitialState(objTextResource));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["TeacherAddEditPopup_ModuleProcessor"]: new TeacherAddEditPopup_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.TeacherAddEditPopup_ModuleProcessor.Initialize(objContext, objContext.TeacherAddEditPopup_ModuleProcessor);

   
    /**
    * @name FormRef
    * @summary Creates a Reference constant with value null.
    * @returns {object} Reference
    */
    const FormRef = useRef(null);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TeacherAddEditPopup_Hook, that contains all the custom hooks.
    * @returns null
    */
    TeacherAddEditPopup_Hook.Initialize(objContext);   

    return (
        <div  className="teacher">
            <div className="teacher-modal-main">
                <div className={true ? "teacher-overlay-main slide-up" : "teacher-overlay-main"}>
                    <div className="teacher-popup-main">
                        <div className="modal-close-btn">
                            <img
                                //src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/closeSmall.svg")}
                                src={CloseImage}
                                onClick={() => {
                                    Popup.ClosePopup(props.Id); ApplicationState.SetProperty("blnShowAnimation", false);
                                }}
                            />
                            
                        </div>

                        <Form
                            Id="SchoolProfileFormComponent"
                            ref={FormRef}
                            Meta={objContext.TeacherAddEditPopup_ModuleProcessor.GetFormMetaData(objContext)}
                            Data={objContext.TeacherAddEditPopup_ModuleProcessor.GetFormData(objContext)}
                            Resource={objContext.TeacherAddEditPopup_ModuleProcessor.GetFormResourceData(objTextResource)}
                            ParentProps={{ ...props }}
                        />

                        <div className="validation-message">
                            <div id="divAddEditTeacherErrorMessage" class="error-message-text" />
                        </div>
                        
                        <div className="editable-row">
                            <div className="deaktivieren-button-main">
                                {props.Data.blnIsEdit ?
                                    props.Data.objData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "N" ?
                                        <button onClick={() => {
                                            objContext.TeacherAddEditPopup_ModuleProcessor.DeActivate(objContext, props.Data.objData)
                                        }}>
                                            <img                                            
                                                src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/GridDelete.svg")}
                                            />{Localization.TextFormatter(objTextResource, 'deActivateButtonText')}
                                        </button>
                                        :
                                        <button onClick={() => {
                                            objContext.TeacherAddEditPopup_ModuleProcessor.Activate(objContext, props.Data.objData)
                                        }}>
                                            <img                                            
                                                src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/GridDelete.svg")}
                                            />{Localization.TextFormatter(objTextResource, 'activateButtonText')}
                                        </button>
                                : <React.Fragment/>}                               
                            </div>
                            <div className="speichern-button-main">
                                {!objContext.props.Data.blnIsEdit || props.Data.objData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "N" ?
                                    <button onClick={() => {
                                        objContext.TeacherAddEditPopup_ModuleProcessor.SaveMethod(objContext, FormRef.current)
                                    }}>Speichern</button>
                                    : ""
                                }
                            </div>

                        </div> 

                    </div>
                </div>
            </div>
        </div>        
    );
};

/**
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component.
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherAddEditPopup_ModuleProcessor.StoreMapList()))(TeacherAddEditPopup);