import React, { useRef, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import Form from '@root/Framework/Blocks/Form/Form';
import Form_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Blocks/Form_Sample/Form_Sample/Form_Sample_ModuleProcessor';
import * as Form_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Blocks/Form_Sample/Form_Sample/Form_Sample_Hook';


const Form_Sample = (props) => {

     /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
   const [state, dispatch] = useReducer(Base_Hook.Reducer, Form_Sample_Hook.GetInitialState());

   /**
   * @name objContext
   * @summary Groups state.dispatch and module object(s) in objContext.
   * @returns {object} objContext
   */
   let objContext = { state, props, dispatch, ["Form_Sample_ModuleProcessor"]: new Form_Sample_ModuleProcessor() };

   /**
   * @name useDataLoaded
   * @param {object} objContext context object
   * @summary Makes showAnimation false in store.
   * @returns null
   */
  Form_Sample_Hook.useDataLoaded(objContext);

    const refForm = useRef(null);
    const DivRef = useRef(null);

    const SaveMethod = () => {
        var blnIsFormValid = refForm.current.IsValid();
        if (blnIsFormValid) {
            var objsaveData = refForm.current.GetSaveData();
            //Call the API to save 
        }
        else {
            //Do nothing
            //Validation taken care by the Form and Validation divs gets the messages
        }
    };

    const dummyMethod = () => {
        var arrInvalidFields = ["vEmail","vPhone"];
        refForm.current.SetInvalidFields(arrInvalidFields);
    };

    return (
        <div>
            <h1 ref={DivRef}>FormContainer</h1>
            <Form
                ref={refForm}
                Meta={objContext.Form_Sample_ModuleProcessor.GetMeta(objContext)}
                Data={props.Data}
                Resource={objContext.Form_Sample_ModuleProcessor.GetResource(objContext)}
                ParentProps={{ ...props }}
            />

            <span id="ValMessageDiv"/>
            <span id="ValMessageDiv_Password"/>
            <button onClick={() => objContext.Form_Sample_ModuleProcessor.SaveMethod(objContext,refForm)}>Save</button>
            
        </div>
    );

};

Form_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Form/Form.css",
        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDown/DropDown.css"
    ];
};

export default connect(Form_Sample_ModuleProcessor.GetStoreData())(Form_Sample);