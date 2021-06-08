// React related imports.
import React, { forwardRef, useReducer, useRef } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Components used.
import DropDown from "@root/Framework/Controls/DropDowns/DropDown/DropDown"

//Base classes.
import * as Form_Hook from '@shared/Framework/Blocks/Form/Form_Hook';
import Form_ComponentProcessor from '@shared/Framework/Blocks/Form/Form_ComponentProcessor';

/**
 * @name Form.
 * @param {*} props.
 * @summary The Form is designed to display of any entity.
 * @returns {object} React.Fragement that encapsulated the Form.
 */
const Form = forwardRef((props, ref) => {

    const passwordRef = useRef(null);

    const invalidFieldsRefs = useRef([]);

    /**
     * @name [state,dispatch].
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Form_Hook.GetInitialState(props));

    /**
    * @name objContext.
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext.
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["Form_ComponentProcessor"]: new Form_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Form_ComponentProcessor.Initialize(objContext, objContext.Form_ComponentProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Subject_Hook, that contains all the custom hooks.
    * @returns null
    */
    Form_Hook.Initialize(passwordRef);

    /**
    * @name useImperativeHandleMethods.
    * @param {object} objContext context object
    * @param {object} ref ref passed from the parent component
    * @param {object} passwordRef password ref for the confirm password input
    * @summary To form public methods to be used by the module.
    */
    Form_Hook.useImperativeHandleMethods(objContext, ref, passwordRef, invalidFieldsRefs);

    /**
     * @name GetRow.
     * @param {*} objMetaData.
     * @summary To get the single row based on the MetaData to be put in the array of rows.
     * @returns {object} JSX for the row.
     */
    const GetRow = (objMetaData, refCurrentRow) => {

        var Row, strAttributeName, strControlType, strDisplayData, strColumnName, blnIsMandatory;
        strColumnName = objMetaData['vColumnName'];
        strDisplayData = state.objData[strColumnName];
        strAttributeName = props.Resource.Text[objMetaData['vTextResourceKey']];
        strControlType = objMetaData['vControlType'];
        blnIsMandatory = objMetaData.IsMandatory == "Y" ? true : false;
        Row = [];

        switch (strControlType) { //added readOnly if props.Data.cIsDisabled == "Y"
            case "textbox":
                let strClassName = objMetaData.cIsDisabled == "Y" ? 'deactive-bg' : '';
                Row = <input id={strColumnName} ref={refCurrentRow} key={strColumnName} type="text" className={strClassName}
                    readOnly={objMetaData.cIsDisabled == "Y" ? true : null}
                    onChange={(e) => { objContext.Form_ComponentProcessor.HandleChange(e.target.value, strColumnName, objContext) }}
                    onBlur={() => { objContext.Form_ComponentProcessor.OnBlurValidate(objContext) }}
                    onFocus={(e) => { objContext.Form_ComponentProcessor.ShowValidationMessageOnFocus(strColumnName, objContext) }}
                    value={strDisplayData}
                />;
                break;
            case "textarea":
                Row = <textarea id={strColumnName} ref={refCurrentRow} key={strColumnName} readOnly={objMetaData.cIsDisabled == "Y" ? true : null}
                    onChange={(e) => { objContext.Form_ComponentProcessor.HandleChange(e.target.value, strColumnName, objContext) }}
                    onFocus={(e) => { objContext.Form_ComponentProcessor.ShowValidationMessageOnFocus(strColumnName, objContext) }}
                />;
                break;
            case "label":
                var arrLabelData = [];
                var IsLanguageDependent = "";
                var strDisplayColumn = "", strDependingTableName = "";

                var objLabelData = props.Data.LabelData[strColumnName];
                arrLabelData = objLabelData["Data"];
                IsLanguageDependent = objLabelData["cISLanguageDependent"];
                strDisplayColumn = objLabelData["DisplayColumn"];
                strDependingTableName = objLabelData["DependingTableName"];
                if (IsLanguageDependent === "Y") {
                    var strLanguageKeyName = "iLanguageId";
                    var strLanguageKeyValue = props.ParentProps.JConfiguration["InterfaceLanguageId"];
                    arrLabelData[strDependingTableName].map(item => {
                        if (item[strLanguageKeyName].toString() === strLanguageKeyValue) {
                            strDisplayData = item[strDisplayColumn];
                        }
                    })
                }
                strDisplayData = objContext.Form_ComponentProcessor.GetLabelData(strColumnName, objContext);
                Row = <span id={strColumnName} ref={refCurrentRow} key={strColumnName} className="uneditable-span" >{strDisplayData}</span>;
                break;
            case "dropdown":
                var IsValid = state.objData[strColumnName] !== null && state.objData[strColumnName] !== undefined && state.objData[strColumnName] !== "";
                var arrDropDownData = [], IsLanguageDependent = "", strDisplayColumn = "", strDependingTableName = "", strValueColumn = "";
                var objDropDownData = props.Data.DropDownData[strColumnName];
                arrDropDownData = objDropDownData["Data"];
                IsLanguageDependent = objDropDownData["cISLanguageDependent"];
                strDependingTableName = objDropDownData["DependingTableName"];
                strDisplayColumn = objDropDownData["DisplayColumn"];
                strValueColumn = objDropDownData["ValueColumn"];
                Row = <div id={strColumnName} ref={refCurrentRow} > <DropDown
                    Id={"DropDown" + strColumnName}
                    Meta={{
                        DisplayColumn: strDisplayColumn,
                        ValueColumn: strValueColumn,
                        DefaultOptionValue: objDropDownData.DefaultOptionValue,
                        ShowDefaultOption: objDropDownData.ShowDefaultOption,
                        IsLanguageDependent: IsLanguageDependent,
                        DependingTableName: strDependingTableName,
                        Disabled: objMetaData.cIsDisabled,
                        ValidationClassName: (!IsValid) ? "dropdownfocused" : ""
                    }}
                    Data={{
                        DropdownData: arrDropDownData,
                        SelectedValue: strDisplayData,
                        Id: strColumnName
                    }}
                    Resource={{
                        Text: props.Resource.Text,
                        ImagePath: props.Resource.DropDownImagePath,
                        SkinPath: props.Resource.SkinPath
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.Form_ComponentProcessor.DropDownChange(objChangeData, objDropDownProps, objContext)
                    }}
                    Callbacks={{}}
                    ParentProps={{ ...props, ...props.ParentProps }}
                />
                </div>
                break;
            case "password":
                strDisplayData = strDisplayData === null ? "" : strDisplayData;
                var IsValid = state.blnIsPasswordMatching ? true : false;
                strClassName = IsValid ? "" : "textboxfocus";
                Row = <div className="password-flex">
                    <input key={strColumnName} type="password" className={strClassName} id="vPassword"
                        onChange={(e) => {
                            objContext.Form_ComponentProcessor.PasswordCheck(e.target.value, state.strConfirmPassword, objContext);
                            objContext.Form_ComponentProcessor.HandleChange(e.target.value, strColumnName, objContext);
                        }}
                        onFocus={(e) => { objContext.Form_ComponentProcessor.ShowValidationMessageOnFocus("vPassword", objContext); }}
                        value={strDisplayData}
                        placeholder={props.Resource.Text.EnterNewPassword ? props.Resource.Text.EnterNewPassword : "Enter the new password"}
                        autoComplete="new-password"
                    />
                    <input type="password" className={strClassName} id="ConfirmPassword" ref={passwordRef}
                        onChange={(e) => {
                            objContext.Form_ComponentProcessor.PasswordCheck(state.objData.vPassword, e.target.value, objContext);
                            dispatch({ type: 'SET_STATE', payload: { strConfirmPassword: e.target.value } });
                        }}
                        onFocus={(e) => {
                            objContext.Form_ComponentProcessor.ShowValidationMessageOnFocus("vPassword", objContext);
                        }}
                        placeholder={props.Resource.Text.ConfirmPassword ? props.Resource.Text.ConfirmPassword : "confirm the new password"} />
                </div>
                break;

        }
        return (
            <div className={(Row.props && Row.props.children) ? "form-input-flex password-input-flex" : "form-input-flex"} >
                {strControlType !== "hidden" ? (!blnIsMandatory ? <span>{strAttributeName}</span> : <span> <b>{strAttributeName}</b></span>) : <React.Fragment />}
                {strControlType !== "hidden" && props.Meta.AddForm ? <span className="required-field">{blnIsMandatory ? ": *" : ":"}</span> : <React.Fragment />}
                {Row}
            </div>
        )
    }

    /**
     * @name GetForm.
     * @summary Loops through the MetaData to form the Elements.
     * @returns {object} JSX for the form.
     */
    const GetContent = () => {
        var arrMetadata = props.Meta.HeaderData ? props.Meta.HeaderData.sort(function (a, b) {
            return a['iDisplayOrder'] - b['iDisplayOrder'];
        }) : [];

        let arrRefIndex = [];

        if (invalidFieldsRefs.current.length == 0 && arrMetadata.length > 0) {
            invalidFieldsRefs.current = arrMetadata.map(
                (objMetaData, index) => {
                    let obj = {};
                    obj["index"] = objMetaData['vColumnName'];
                    arrRefIndex = [...arrRefIndex, obj]; //put on state
                    return invalidFieldsRefs.current[index] = React.createRef()
                }
            )
            objContext.dispatch({ type: 'SET_STATE', payload: { arrRefIndex: arrRefIndex } });
        }

        return <React.Fragment>
            {
                arrMetadata.map((objMetaData, index) => {
                    let refCurrentRow = invalidFieldsRefs.current[index]
                    return objMetaData.cIsHide == "Y" ? null : GetRow(objMetaData, state.objData, refCurrentRow);
                })
            }
            < div className="wrap" >
                {props.Data.ImportantTextMessage ? <div className="text-color">{props.Data.ImportantTextMessage}</div> : <React.Fragment />}
            </div >
        </React.Fragment>
    }

    return GetContent();
});

export default Form;


