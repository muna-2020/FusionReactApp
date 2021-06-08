// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';


/**
 * @name FinalPage
 * @param {object} props props
 * @summary This component is used for FinalPage in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const FinalPage = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "cHasResultPageText": props.Data.IsEdit ? props.Data.DisplayData.cHasResultPageText : "Y",
                "cHasResultPageCertificate": props.Data.IsEdit ? props.Data.DisplayData.cHasResultPageCertificate : "N",
                "cUseResultTextByRange": props.Data.IsEdit ? props.Data.DisplayData.cUseResultTextByRange : "N",
                "uCertificateId": props.Data.IsEdit ? props.Data.DisplayData.uCertificateId : "00000000-0000-0000-0000-000000000000",
                "t_TestDrive_Test_TestProperty": [
                    {
                        "cIsShowResultExcelOnTestComplete": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cIsShowResultExcelOnTestComplete"] : "N") : "N",
                        "cIsShowResultDocumentOnTestComplete": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cIsShowResultDocumentOnTestComplete"] : "N") : "N"
                    }
                ],
                "t_TestDrive_Test_Data": props.Data.MultiLanguageData.map(objMultiLang => {
                    let objEditTestData = props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Data"].find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {};
                    return {
                        "vResultPageTopLeftTitle": props.Data.IsEdit && objEditTestData ? objEditTestData["vResultPageTopLeftTitle"] : "",
                        "vResultButtonText": props.Data.IsEdit && objEditTestData ? objEditTestData["vResultButtonText"] : "",
                        "tTestResultPageText": props.Data.IsEdit && objEditTestData ? objEditTestData["tTestResultPageText"] : "",
                        "iLanguageId": objMultiLang["iLanguageId"]
                    }
                }),
                "t_TestDrive_Test_ResultPageText": props.Data.IsEdit && props.Data.DisplayData["t_TestDrive_Test_ResultPageText"].length > 0 ? props.Data.DisplayData["t_TestDrive_Test_ResultPageText"].sort((obj1, obj2) => obj1["dResultValueFrom"] - obj2["dResultValueFrom"]) : [{ dResultValueFrom: null, dResultValueTo: null, vAction: "Enable" }]
                //"t_TestDrive_Test_Data": props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Data"] : []
            },
            intSelectedRangeIndex: 0,
            blnIsAddRowClicked: false
        };
    }

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state, dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "Base_AddEditTestMaster_ModuleProcessor": new Base_AddEditTestMaster_ModuleProcessor() };

    /**
     * @name useImperativeHandle
     * @param {object} objContext  objContext
     * @summary Setting up imperative handle
     */
    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return {
                ...state.objData,
                "t_TestDrive_Test_ResultPageText": objContext.Base_AddEditTestMaster_ModuleProcessor.GetResultPageTextSaveData(objContext)
                //"t_TestDrive_Test_ResultPageText": state.objData.cUseResultTextByRange == "Y" ? state.objData.t_TestDrive_Test_ResultPageText.filter(objText => objText["vAction"] != "Enable") : []
            }
        }
    }), [state, props]);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetResultPageTextRange
     * @summary Forms the whole jsx required for table to enter ResultPageTextRange.
     * @returns {object} jsx, React.Fragment
     */
    const GetResultPageTextRange = () => {
        return <React.Fragment>
            <div className="result-range-table">
                <table className="add-edit-test-table">
                    <tr>
                        <th></th>
                        <th>{Localization.TextFormatter(objTextResource, "From")}</th>
                        <th>{Localization.TextFormatter(objTextResource, "To")}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {state.objData.t_TestDrive_Test_ResultPageText.map((objResult, intIndex) => {
                        let blnIsDisabled = objResult["vAction"] != "Enable";
                        return <tr
                            className={state.intSelectedRangeIndex == intIndex ? "selected" : ""}
                            onClick={() => objContext.Base_AddEditTestMaster_ModuleProcessor.OnClickTextResultRangeRow(intIndex, objContext)}>
                            <td>{(intIndex + 1) + "."}</td>
                            <td>
                                {blnIsDisabled ? <label
                                    id={"dResultValueFrom" + intIndex}>
                                    {objResult["dResultValueFrom"]}
                                </label> :
                                    <input
                                        id={"dResultValueFrom" + intIndex}
                                        className="text-input"
                                        value={objResult["dResultValueFrom"]}
                                        disabled={blnIsDisabled}
                                        type="number"
                                        style={{ WebkitAppearance: "none" }}
                                        onBlur={() => objContext.Base_AddEditTestMaster_ModuleProcessor.ValidateResultRangeOnBlur("dResultValueFrom", intIndex, objResult, objContext)}
                                        onChange={e => {
                                            objContext.Base_AddEditTestMaster_ModuleProcessor.HandleResultPageRangeChange("dResultValueFrom", e.target.value, intIndex, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                    />
                                }
                            </td>
                            <td>
                                {blnIsDisabled ? <label
                                    id={"dResultValueTo" + intIndex}>
                                    {objResult["dResultValueTo"]}
                                </label> :
                                    <input
                                        id={"dResultValueTo" + intIndex}
                                        className="text-input"
                                        value={objResult["dResultValueTo"]}
                                        disabled={blnIsDisabled}
                                        type="number"
                                        onBlur={() => objContext.Base_AddEditTestMaster_ModuleProcessor.ValidateResultRangeOnBlur("dResultValueTo", intIndex, objResult, objContext)}
                                        onChange={e => {
                                            objContext.Base_AddEditTestMaster_ModuleProcessor.HandleResultPageRangeChange("dResultValueTo", e.target.value, intIndex, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                    />
                                }
                            </td>
                            <td>
                                <img
                                    src={blnIsDisabled ? objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Edit.gif" : objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Add.gif"}
                                    onClick={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleEnableDisableTextResultRange(intIndex, blnIsDisabled, objContext, e)}
                                />
                            </td>
                            <td>
                                <img
                                    src={objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Delete_Active.gif"}
                                    onClick={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleDeleteTextResultRange(e, intIndex, objContext)}
                                />
                            </td>
                        </tr>
                    })}
                </table>
                <div className="align-right mt-10 mb-10">
                    <button
                        className="btn"
                        onClick={() => objContext.Base_AddEditTestMaster_ModuleProcessor.AddTextResultRangeRow(objContext)}
                    >
                        {Localization.TextFormatter(objTextResource, "AddButton")}
                    </button>
                </div>
            </div>
            <MultiLanguageInputs
                Meta={{
                    ValueColumn: "tTestResultPageText",
                    DependingTableName: "t_TestDrive_Test_ResultPageText_Data",
                    DisplayColumn: "tTestResultPageText",
                    InputType: "TextArea"
                }}
                Data={{
                    DisplayData: state.objData.t_TestDrive_Test_ResultPageText[state.intSelectedRangeIndex],
                    MultiLanguageData: props.Data.MultiLanguageData
                }}
                Events={{
                    OnChange: (e, objLanguage) => {
                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleResultPageTextDataChange("tTestResultPageText", e.target.value, objContext, objLanguage["iLanguageId"]);
                    }
                }}
                ParentProps={props.ParentProps}
            />
        </React.Fragment>
    }

    /**
     * @name GetResultCertificateDiv
     * @summary Forms the jsx required for ResultCertificate.
     * @returns {object} jsx, React.Fragment
     */
    const GetResultCertificateDiv = () => {
        return <div className="col col-2">
            <div className="col-item">
                <div className="row-left">
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "CertificateType")}</span>
                </div>
                <div className="row-right">
                    {
                        <div className="intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="uCertificateId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.ResultCertificateData,
                                    SelectedValue: state.objData["uCertificateId"] ? state.objData["uCertificateId"] : "00000000-0000-0000-0000-000000000000"
                                }}
                                Meta={{
                                    DependingTableName: "t_Fusion_Certificate_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "uCertificateId",
                                    DisplayColumn: "vCertificateText",
                                    DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("uCertificateId", objChangeData.uCertificateId, objContext),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" ? true : false
                                    }
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "Heading")}</div>

            <div className="col col-2">
                <div className="col-item checkbox-flex">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ShowResultExcelOnTestComplete")}</span>
                    </div>
                    <div className="row-right checkbox-block">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0].cIsShowResultExcelOnTestComplete ? (state.objData.t_TestDrive_Test_TestProperty[0].cIsShowResultExcelOnTestComplete == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cIsShowResultExcelOnTestComplete", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="col-item checkbox-flex">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ShowResultDocumentOnTestComplete")}</span>
                    </div>
                    <div className="row-right checkbox-block">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0].cIsShowResultDocumentOnTestComplete ? (state.objData.t_TestDrive_Test_TestProperty[0].cIsShowResultDocumentOnTestComplete == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cIsShowResultDocumentOnTestComplete", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="title">{Localization.TextFormatter(objTextResource, "Display")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ResultPageTopLeftTitle")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vResultPageTopLeftTitle",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vResultPageTopLeftTitle"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vResultPageTopLeftTitle", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ResultButton")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vResultButtonText",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vResultButtonText"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vResultButtonText", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>
            </div>
            <div className="resulttext-cerfificate">
                <div className="">
                    <label className="radio mr-10">
                        <input type="radio"
                            checked={state.objData.cHasResultPageText && state.objData.cHasResultPageText == "Y" && state.objData.cHasResultPageCertificate && state.objData.cHasResultPageCertificate == "N" ? true : false}
                            id="cHasResultPageText"
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleResultTextOrCertificateChange("cHasResultPageText", e.target.checked ? "Y" : "N", objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "OnlyTest")}</span>
                </div>

                <div className="">
                    <label className="radio mr-10">
                        <input type="radio"
                            checked={state.objData.cHasResultPageCertificate && state.objData.cHasResultPageCertificate == "Y" && state.objData.cHasResultPageText && state.objData.cHasResultPageText == "N" ? true : false}
                            id="cHasResultPageCertificate"
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleResultTextOrCertificateChange("cHasResultPageCertificate", e.target.checked ? "Y" : "N", objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "Certificate")}</span>
                </div>

                <div className="">
                    <label className="radio mr-10">
                        <input type="radio"
                            checked={state.objData.cHasResultPageCertificate && state.objData.cHasResultPageCertificate == "Y" && state.objData.cHasResultPageText && state.objData.cHasResultPageText == "Y" ? true : false}
                            id=""
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleResultTextOrCertificateChange("Both", e.target.checked ? "Y" : "N", objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "TextAndCertificate")}</span>
                </div>
            </div>
            {state.objData.cHasResultPageCertificate == "Y" ?
                GetResultCertificateDiv()
                : <React.Fragment />}

            <div className="result-text-range">
                <div className="title">{Localization.TextFormatter(objTextResource, "ResultPageText")}</div>

                <div className="checkbox-flex">
                    <div className="checkbox-block">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.cUseResultTextByRange ? (state.objData.cUseResultTextByRange == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("cUseResultTextByRange", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ResultTextByRange")}</span>
                    </div>
                </div>
                {state.objData.cUseResultTextByRange == "Y" ?
                    GetResultPageTextRange()
                    : <MultiLanguageInputs
                        Meta={{
                            ValueColumn: "tTestResultPageText",
                            DependingTableName: "t_TestDrive_Test_Data",
                            DisplayColumn: "tTestResultPageText",
                            InputType: "TextArea"
                        }}
                        Data={{
                            DisplayData: state.objData,
                            MultiLanguageData: props.Data.MultiLanguageData
                        }}
                        Events={{
                            OnChange: (e, objLanguage) => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.tTestResultPageText", e.target.value, objContext, objLanguage["iLanguageId"]);
                            }
                        }}
                        ParentProps={props.ParentProps}
                    />}
            </div>
        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(FinalPage);