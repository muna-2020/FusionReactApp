// React related imports.
import React, { useReducer, useMemo, forwardRef, useRef } from 'react';
//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
//Components used.
//import DropDown from "@root/Framework/Controls/DropDowns/DropDown/DropDown";

import * as EditableRow_Hook from '@shared/Framework/Blocks/Grid/2.DataRow/EditableRow/EditableRow_Hook';
import EditableRow_ComponentProcessor from '@shared/Framework/Blocks/Grid/2.DataRow/EditableRow/EditableRow_ComponentProcessor';

//Inline Images import
import EditImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Grid/2.DataRow/EditableRow/edit_black.svg?inline';
import CancelImage from '@inlineimage/Framework/ReactJs/PC/Blocks/Grid/2.DataRow/EditableRow/close.svg?inline';

/**
 * @name EditableRow
 * @param {*} props 
 * @returns {object} React.Fragement to form the Row(tr) of the Grid(table) and to edit the Data.
 */
const EditableRow = forwardRef((props, ref) => {

    //To maintain the ref of the Row(td), this ref will be used to select the Row(change the CSS)
    const refRow = useRef();

    const UpdateRef = (refRows) => {
        refRows = refRows;
    }

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, EditableRow_Hook.GetInitialState(props));

    /**
   * @name objContext
   * @summary Groups state.dispatch and module object(s) in objContext.
   * @returns {object} objContext
   */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.ParentProps.Id, ["EditableRow_ComponentProcessor"]: new EditableRow_ComponentProcessor(), refRow, UpdateRef };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.EditableRow_ComponentProcessor.Initialize(objContext, objContext.EditableRow_ComponentProcessor);

    /**
    * @name useOnNewRowAdd
    * @param {*} objContext
    * @param {*} refRow
    * @param {*} UpdateRef
    * @summary To be called when new Row is to created, So we need the Row in Edit Mode in the first load only.
    * Sets blnEditMode to true, and puts the props.Data.RowData from the Grid into objEditRowData to be used for editing.
    */
    EditableRow_Hook.useOnNewRowAdd(objContext, refRow, UpdateRef);

    /**
    * @name useOnNewRowAdd
    * @param {*} objContext
    * @param {*} refRow
    * @param {*} UpdateRef
    * @summary Methods to be called from the Grid to perform select actions and cancel edit mode.
    */
    EditableRow_Hook.useImperativeHandleMethods(objContext, ref, refRow, UpdateRef);

    /**
     * @name GetEditBlock
     * @summary Returns the JSX for the Edit and Cancel Images
     * @returns {object} JSX for the Edit and Cancel Images
     */
    const GetEditBlock = () => {

        var jsxEditImage = <td className="end-control-buttons" onClick={(e) => { e.stopPropagation(); objContext.EditableRow_ComponentProcessor.OnEditClickRow(objContext); }}>
            <div className="img-wrap"><img src={props.ImageMeta && props.ImageMeta.EditImage ? props.ImageMeta.EditImage : EditImage} /></div>
        </td>

        var jsxCancelImage = <td className="end-control-buttons" onClick={(e) => { e.stopPropagation(); objContext.EditableRow_ComponentProcessor.OnCancelEdit(objContext, e); }}>
            <div className="img-wrap"><img src={props.ImageMeta && props.ImageMeta.CancelImage ? props.ImageMeta.CancelImage : CancelImage} /></div>
        </td>

        let jsxImageCells = <React.Fragment>
            {state.blnEditMode ? jsxCancelImage : jsxEditImage}
        </React.Fragment>
        return jsxImageCells;
    }

    /**
     * @name GetCell
     * @param {*} objHeader 
     * @summary Forms the Single cell (td) of the Row based on the MetaData
     * @returns {object} JSX for Single cell (td)
     */
    const GetCell = (objHeader) => {
        var strCellColumnData = '', strColumnName;
        var objRow = state.blnEditMode ? state.objEditRowData : props.Data.RowData;
        if (objHeader["vColumnName"] && objHeader["vColumnName"].split('.').length === 2) {
            var strTableName;
            strTableName = objHeader["vColumnName"].split('.')[0];
            strColumnName = objHeader["vColumnName"].split('.')[1];
            strCellColumnData = objRow[strTableName][0][strColumnName];
        }
        else {
            strColumnName = objHeader["vColumnName"]
            strCellColumnData = objRow[strColumnName];
        }
        var strwidth = objHeader["iWidth"] ? objHeader["iWidth"] + "px" : "auto";
        var objStyle = { width: strwidth };
        var jsxCell = <React.Fragment />;
        switch (objHeader["vControlType"].toLowerCase()) {
            case "textbox":
                jsxCell = GetTextBox(objHeader, strCellColumnData, objStyle);
                break;
            case "label":
                jsxCell = <td style={objStyle} title={strCellColumnData}>{strCellColumnData}</td>;
                break;
            case "dropdown":
                jsxCell = GetDropDown(objHeader, strCellColumnData, objStyle);
                break;
            case "image":
                if (objHeader["vDataType"].toLowerCase() == "image") {
                    //let strImagePath = props.Resource.SkinPath + props.Resource.ImagePathDetails[objRow[objHeader["vColumnName"]]];
                    let strImagePath = props.ImageMeta ? props.ImageMeta[objRow[objHeader["vColumnName"]]] : props.Resource.SkinPath + props.Resource.ImagePathDetails[objRow[objHeader["vColumnName"]]];
                    jsxCell = <td key={objHeader["vColumnName"]} className="end-control-buttons status-buttons">
                        <div className="img-wrap"><img src={strImagePath} /></div>
                    </td>
                }
                else// if (objColumn["vDataType"].toLowerCase() == "boolean") 
                {
                    //Edit mode => Check box
                    //Display mode => y or N
                    jsxCell = GetCheckBox(strCellColumnData, objHeader["vColumnName"]);
                }
                break;
            default:
                break;

        }
        return jsxCell;
    }

    /**
     * @name GetTextBox
     * @param {*} objHeader 
     * @param {*} strCellColumnData 
     * @param {*} objStyle 
     * @summary Forms the JSX for TextBox
     * @returns {object} JSX for TextBox
     */
    const GetTextBox = (objHeader, strCellColumnData, objStyle) => {
        var strWaterMark = objContext.EditableRow_ComponentProcessor.GetWatermark(objHeader, objContext);
        let jsxTextBox = state.blnEditMode && state.blnAllowEdit
            ?
            <td key={objHeader["vColumnName"]}><input id={objHeader["vColumnName"]}
                placeholder={strWaterMark} type="text"
                onChange={(e) => objContext.EditableRow_ComponentProcessor.OnEditRowChange(e.target.value, objHeader["vColumnName"], objContext)}
                onBlur={() => { objContext.EditableRow_ComponentProcessor.OnBlurValidate(objContext) }}
                onFocus={() => { objContext.EditableRow_ComponentProcessor.OnFocusValidate(objHeader["vColumnName"], objContext) }}
                value={strCellColumnData}
            />
            </td>
            :
            <td key={objHeader["vColumnName"]} style={objStyle}
            >{strCellColumnData}
            </td>;
        return jsxTextBox;
    }

    ///**
    //* @name GetDateText
    //* @param {String} strCellColumnData Passed date column data
    //* @summary Formats the passed date in dd.mm.yyyy
    //* @returns {String} formated date
    //*/
    //const GetDateText = (strCellColumnData) => {
    //    let strYear = strCellColumnData.split(".")[2]
    //    if (strYear && strYear.length == 4) {
    //        let objDay = new Date(strCellColumnData);
    //        let strDay = objDay.getDate();
    //        let strMonth = objDay.getMonth() + 1; //January is 0!
    //        let strYear = objDay.getFullYear();

    //        strDay = strDay < 10 ? '0' + strDay : strDay;
    //        strMonth = strMonth < 10 ? '0' + strMonth : strMonth;

    //        return strDay + '.' + strMonth + '.' + strYear;
    //    } else {
    //        return strCellColumnData;
    //    }
    //};

    /**
     * @name GetDropDown
     * @param {*} objColumn 
     * @param {*} strDisplayData 
     * @param {*} objStyle 
     * @summary Forms the JSX for DropDown 
     * @returns {object} JSX for DropDown
     */
    const GetDropDown = (objColumn, strDisplayData, objStyle) => {
        let Dropdown = props.ParentProps.ComponentController.GetFrameworkComponent("Dropdown");
        var arrDropDownData = [];
        var IsLanguageDependent = "";
        var strDisplayColumn = "", strValueColumn = "", strDependingTableName = "";
        var objDropDownData = props.Data.DropDownData[objColumn["vColumnName"]];
        arrDropDownData = objDropDownData["Data"];
        IsLanguageDependent = objDropDownData["cISLanguageDependent"] || objDropDownData["IsLanguageDependent"];
        strDependingTableName = objDropDownData["DependingTableName"];
        strDisplayColumn = objDropDownData["DisplayColumn"];
        strValueColumn = objDropDownData["ValueColumn"];

        switch (IsLanguageDependent) {
            case "Y":
                var strLanguageKeyName = "iLanguageId";
                var strLanguageKeyValue = props.ParentProps.JConfiguration["InterfaceLanguageId"];
                var strSpanDisplayData = "";
                arrDropDownData.map(objDropDownData => {
                    if (objDropDownData[strValueColumn] == strDisplayData) {
                        objDropDownData[strDependingTableName].map(item => {
                            if (item[strLanguageKeyName] == strLanguageKeyValue) {
                                strSpanDisplayData = objContext.EditableRow_ComponentProcessor.GetMultiColumnData(item, strDisplayColumn); //item[strDisplayColumn];
                            }
                        })
                    }
                })
                break;
            case "N":
                arrDropDownData.map(objDropDownData => {
                    if (objDropDownData[strValueColumn] == strDisplayData) {
                        strSpanDisplayData = objContext.EditableRow_ComponentProcessor.GetMultiColumnData(objDropDownData, strDisplayColumn); //objDropDownData[strDisplayColumn];
                    }
                })
                break;
            default:
                strSpanDisplayData = strDisplayData;
                break;

        }

        return state.blnEditMode && state.blnAllowEdit
            ? <td key={objColumn["vColumnName"]} style={objStyle}>
                <div id={objColumn["vColumnName"]} className="grid-dropdown">
                    <Dropdown
                        Id={objColumn["vColumnName"]}
                        Data={{
                            DropdownData: arrDropDownData,
                            SelectedValue: strDisplayData
                        }}
                        Meta={{
                            DisplayColumn: strDisplayColumn,
                            ValueColumn: strValueColumn,
                            IsLanguageDependent: IsLanguageDependent,
                            DependingTableName: strDependingTableName
                        }}
                        Resource={{
                            SkinPath: props.ParentProps.Resource.SkinPath
                        }}
                        Events={{
                            OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.EditableRow_ComponentProcessor.OnDropDownValueChange(objChangeData, objDropDownProps, objContext)
                        }}
                        ParentProps={props.ParentProps}
                    />
                </div>
            </td>
            :
            <td style={objStyle} key={objColumn["vColumnName"]}
            >
                {strSpanDisplayData}
            </td>
    }

    /**
     * @name GetCheckBox
     * @param {any} strDisplayData
     * @param {any} strColumnName
     * @summary Forms the JSX for CheckBox
     * @returns {object} JSX for CheckBox
     */
    const GetCheckBox = (strDisplayData, strColumnName) => {
        let blnIsChecked = strDisplayData == "Y" ? true : false;
        let jsxCheckImage = strDisplayData == "Y" ? <td key={strColumnName}>
            <label className="grid-checkbox inactive"><input type="checkbox" checked={true} /> <span className="checkmark" /></label>
        </td> : <td />;
        let jsxCheckBox = <td key={strColumnName}><label className="grid-checkbox"><input type="checkbox" checked={blnIsChecked} onChange={() => { objContext.EditableRow_ComponentProcessor.OnEditRowChange(strDisplayData == "Y" ? "N" : "Y", strColumnName, objContext) }} /> <span className="checkmark" /></label></td>;
        return state.blnEditMode && state.blnAllowEdit ? jsxCheckBox : jsxCheckImage;
    };

    /**
     * @name GetRow
     * @summary Forms the JSX of the Row -> Cells(td) and the EditBlock(Edit and Cancel Butttons)
     * @returns {object} JSX for the row
     */
    const GetRow = () => {
        var jsxRow = <tr ref={refRow} className={props.Data.IsNewRow ? "editable-row" : ""}
            onClick={() => objContext.EditableRow_ComponentProcessor.OnSelectRow(objContext)}
        >
            {
                props.Meta.HeaderData && props.Meta.HeaderData.map((objHeader) => {
                    return GetCell(objHeader);
                })
            }
            {GetEditBlock()}
        </tr>
        return jsxRow;
    }

    /**
     * @name GetActionButtons
     * @summary Forms the JSX for Row Action Buttons
     * @returns {object} JSX for the Row Action Buttons
     */
    const GetActionButtons = () => {
        let arrButtonsToShow = state.arrRowActionButtonsKeys;
        let domActionButtons = [];
        if (!props.Data.IsNewRow) {
            props.Meta.RowActionButtons.map((objRowActionButton, intIndex) => {
                if (arrButtonsToShow.includes(objRowActionButton["Key"])) {
                    let domActionButton = <button key={intIndex} className="button brown-button" onClick={(e) => {
                        dispatch({ type: 'SET_STATE', payload: { blnEditMode: false } });
                        objRowActionButton.Action(state.objEditRowData, () => { objContext.EditableRow_ComponentProcessor.OnCancelEdit(objContext, e); });
                    }}>
                        {/*{objRowActionButton["ImagePath"] && <img src={props.Resource.SkinPath + objRowActionButton["ImagePath"]} />}*/}
                        {objRowActionButton["ImagePath"] && <img src={props.ImageMeta ? props.ImageMeta[objRowActionButton["Type"]] : props.Resource.SkinPath + objRowActionButton["ImagePath"]} />}
                        {objRowActionButton["Text"]}
                    </button>
                    domActionButtons = [...domActionButtons, domActionButton];
                }
            })
        }

        let jsxSaveButton = <button className="button brown-button" onClick={() => {
            objContext.EditableRow_ComponentProcessor.OnSaveClickRow(objContext);
        }}>Speichern</button>

        var jsxActionButtons = <tr className="active-div">
            <td key="ActionButtons" colSpan='10'>
                <div className="grid-buttons-flex">
                    <div className="button-wrap-left">
                        {domActionButtons}
                    </div>
                    {state.blnAllowEdit ? jsxSaveButton : <React.Fragment />}
                </div>
            </td>
        </tr>
        return jsxActionButtons;
    }

    /**
     * @name GetValidationBlock
     * @summary Returns the JSX for ValidationBlock
     * @returns {object} JSX for the ValidationBlock
     */
    const GetValidationBlock = () => {
        var domValidation = <tr className="active-div validation-message-row">
            <td key="Validation" colspan="10">
                <div id="Div_ValidationMessage" className="error-message-flex">
                </div>
            </td>
        </tr>
        return domValidation;
    }

    /**
    * @name GetContent
    * @summary Returns the JSX for Row Content
    * @returns {object} JSX for the Row Content
    */
    const GetContent = () => {
        return <React.Fragment>
            {GetRow()}
            {state.blnEditMode ? GetActionButtons() : <React.Fragment />}
            {state.blnEditMode ? GetValidationBlock() : <React.Fragment />}
        </React.Fragment>
    }

    return useMemo(() => GetContent(), [props.Data.GridRowData, state]);
}
);

export default EditableRow;