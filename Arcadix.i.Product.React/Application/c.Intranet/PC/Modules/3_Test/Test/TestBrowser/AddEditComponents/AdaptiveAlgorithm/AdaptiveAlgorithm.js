/// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name AdaptiveAlgorithm
 * @param {object} props props
 * @summary This component is used for AdaptiveAlgorithm in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AdaptiveAlgorithm = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} objData initial state
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "iAlgorithmId": props.Data.IsEdit ? props.Data.DisplayData.iAlgorithmId : 3,
                "cIsAdaptiveTaskSubSubjectChosenSequential": props.Data.IsEdit ? props.Data.DisplayData.cIsAdaptiveTaskSubSubjectChosenSequential : "Y",
                "uSeparationAndCalibrationGroupId": props.Data.IsEdit ? props.Data.DisplayData.uSeparationAndCalibrationGroupId : "00000000-0000-0000-0000-000000000000",
                "t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": props.Data.IsEdit ? props.Data.DisplayData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence : []
            },
            arrSubSubjects: [],
            intEnabledRowIndex: props.Data.IsEdit && props.Data.DisplayData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.length > 0 ? null : 1,
            intRoundNumber: 1,
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

    useEffect(() => {
        objContext.Base_AddEditTestMaster_ModuleProcessor.SetAdaptiveTaskSubSubjectSequenceDataInState(objContext);
    }, [props.Data.SubjectId]);

    /**
     * @name useImperativeHandle
     * @param {object} objContext  objContext
     * @summary Setting up imperative handle
     */
    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return {
                ...state.objData,
                "uSeparationAndCalibrationGroupId": state.objData.uSeparationAndCalibrationGroupId != "00000000-0000-0000-0000-000000000000" ? state.objData.uSeparationAndCalibrationGroupId : null,
                "t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": objContext.Base_AddEditTestMaster_ModuleProcessor.GetSubSubjectSequenceSaveData(objContext)
                //"t_TestDrive_Test_AdaptiveTaskSubSubjectSequence": state.objData.cIsAdaptiveTaskSubSubjectChosenSequential == "N" && !state.intEnabledRowIndex ? state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence : []
            }
        }
    }), [state, props]);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetTestAlgorithmDiv
     * @summary Forms jsx for Algorithm check boxes.
     * @returns {object} jsx, React.Fragment
     */
    const GetTestAlgorithmDiv = (props) => {
        return props.Data.AlgorithmData.map(objTestAlgorithm => {
            if (objTestAlgorithm.iAlgorithmId == 3 || objTestAlgorithm.iAlgorithmId == 4 || objTestAlgorithm.iAlgorithmId == 6) {
                let objData = objTestAlgorithm["t_TestDrive_Test_Algorithm_Data"].find(obj => obj["iLanguageId"] == props.ParentProps.JConfiguration["InterfaceLanguageId"]);
                return <div className="flex align-middle justify-left mb-10">
                    <label className="radio mr-10">
                        <input type="radio" checked={state.objData["iAlgorithmId"] == objTestAlgorithm["iAlgorithmId"]}
                            id={objTestAlgorithm["iAlgorithmId"]}
                            value={objTestAlgorithm["vAlgorithmName"]}
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("iAlgorithmId", objTestAlgorithm["iAlgorithmId"], objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span>{objData["vAlgorithmName"]}</span>
                </div>
            }
        })
    }

    /**
     * @name GetAdaptiveTaskSubSubjectSequenceDiv
     * @summary Forms jsx for AdaptiveTaskSubSubjectSequence.
     * @returns {object} jsx, React.Fragment
     */
    const GetAdaptiveTaskSubSubjectSequenceDiv = () => {
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "SubSubjectSequence")}</div>
            <div className="resulttext-cerfificate">
                <div className="">
                    <label className="radio mr-10">
                        <input type="radio"
                            checked={state.objData.cIsAdaptiveTaskSubSubjectChosenSequential && state.objData.cIsAdaptiveTaskSubSubjectChosenSequential == "Y" ? true : false}
                            id=""
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("cIsAdaptiveTaskSubSubjectChosenSequential", e.target.checked ? "Y" : "N", objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "Sequential")}</span>
                </div>

                <div className="">
                    <label className="radio mr-10">
                        <input type="radio"
                            checked={state.objData.cIsAdaptiveTaskSubSubjectChosenSequential && state.objData.cIsAdaptiveTaskSubSubjectChosenSequential == "N" ? true : false}
                            id=""
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("cIsAdaptiveTaskSubSubjectChosenSequential", e.target.checked ? "N" : "Y", objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "Custom")}</span>
                </div>
            </div>
            {state.objData.cIsAdaptiveTaskSubSubjectChosenSequential == "Y" ? GetSequentialTableDiv() : GetCustomTableDiv()}

        </React.Fragment>
    }

    /**
     * @name GetSequentialTableDiv
     * @summary Forms jsx for SequentialTable.
     * @returns {object} jsx, React.Fragment
     */
    const GetSequentialTableDiv = () => {
        return <React.Fragment>
            <table className="add-edit-test-table">
                <tr>
                    {state.arrSubSubjects.map(strSubjectName => <th>{strSubjectName}</th>)}
                </tr>
                <tr>
                    {state.arrSubSubjects.map((strSubjectName, index) => {
                        return <td>{index + 1}</td>
                    })}
                </tr>
            </table>
        </React.Fragment>
    }

    /**
     * @name GetCustomTableDiv
     * @summary Forms jsx for CustomTable.
     * @returns {object} jsx, React.Fragment
     */
    const GetCustomTableDiv = () => {
        let objRounds = state.objData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.reduce((arrReturn, objSubSubjectSequence) => {
            arrReturn[objSubSubjectSequence["iRound"]] = [...arrReturn[objSubSubjectSequence["iRound"]] || [], objSubSubjectSequence];
            return arrReturn;
        }, {});
        return <React.Fragment>
            <div className="result-range-table">
                <table className="add-edit-test-table">
                    <tr>
                        <th></th>
                        {state.arrSubSubjects.map(strSubjectName => <th>{strSubjectName}</th>)}
                        <th></th>
                        <th></th>
                    </tr>
                    {Object.keys(objRounds).map(strRound => {
                        let blnIsDisabled = strRound != state.intEnabledRowIndex;
                        return <tr>
                            <td>{strRound + "."}</td>
                            {objRounds[strRound].map((objSubSubjectSequence, intIndex) => {
                                return <td>
                                    {blnIsDisabled ? <label
                                        id={"iDisplayOrder_" + strRound + "_" + intIndex}
                                        className=""
                                    >
                                        {objSubSubjectSequence["iDisplayOrder"]}
                                    </label>
                                        : <input
                                            id={"iDisplayOrder_" + strRound + "_" + intIndex}
                                            className="text-input"
                                            value={objSubSubjectSequence["iDisplayOrder"]}
                                            disabled={blnIsDisabled}
                                            type="number"
                                            style={{ WebkitAppearance: "none" }}
                                            onBlur={() => objContext.Base_AddEditTestMaster_ModuleProcessor.ValidateSubSubjectSequenceOnBlur("iDisplayOrder_" + strRound + "_" + intIndex, objSubSubjectSequence, objContext)}
                                            onChange={e => {
                                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleSubSubjectSequenceChange("iDisplayOrder", e.target.value, objSubSubjectSequence["iSubSubjectId"], strRound, objContext);
                                            }}
                                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                        />
                                    }
                                </td>
                            })}
                            <td>
                                <img
                                    src={blnIsDisabled ? objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Edit.gif" : objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Add.gif"}
                                    onClick={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleEnableDisableSubSubjectSequence(strRound, blnIsDisabled, objContext)}
                                />
                            </td>
                            <td>
                                <img
                                    src={objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Delete_Active.gif"}
                                    onClick={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleDeleteSubSubjectSequenceRow(e, strRound, objContext)}
                                />
                            </td>
                        </tr>
                    })}
                </table>
                <div className="align-right mt-10 mb-10">
                    <button
                        className="btn"
                        onClick={() => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAddSubSubjectSequenceRow(objContext)}
                    >
                        {Localization.TextFormatter(objTextResource, "AddButton")}
                    </button>
                </div>
            </div>
        </React.Fragment>
    }

    /**
     * @name GetSeparationAndCalibrationGroupDiv
     * @summary Forms the jsx required for SeparationAndCalibrationGroup.
     * @returns {object} jsx, React.Fragment
     */
    const GetSeparationAndCalibrationGroupDiv = () => {
        return <div className="col col-2">
            <div className="col-item">
                <div className="row-left">
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "SeparationAndCalibrationGroup")}</span>
                </div>
                <div className="row-right">
                    {
                        <div className="intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="SeparationAndCalibrationGroup_Dropdown"
                                Data={{
                                    DropdownData: props.Data.DropdownData.SeparationAndCalibrationGroupData,
                                    SelectedValue: state.objData["uSeparationAndCalibrationGroupId"] ? state.objData["uSeparationAndCalibrationGroupId"] : "00000000-0000-0000-0000-000000000000"
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_SeparationAndCalibration_Group_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "uSeparationAndCalibrationGroupId",
                                    DisplayColumn: "vGroupName",
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
                                    OnChangeEventHandler: (objChangeData) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("uSeparationAndCalibrationGroupId", objChangeData.uSeparationAndCalibrationGroupId, objContext),
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
     * @summary Forms whole jsx for AdaptiveAlgorithm component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        //let intSubjectId = ApplicationState.GetProperty("SubjectId") ? ApplicationState.GetProperty("SubjectId") : -1;
        let blnIsShowAdaptiveTaskSubSubjectSequenceDiv = objContext.Base_AddEditTestMaster_ModuleProcessor.IsShowAdaptiveTaskSubSubjectSequenceDiv(objContext);
        return <div id={props.Id} className="tabcontent p-10">
            <div className="title">{Localization.TextFormatter(objTextResource, "DisplayOptions")}</div>
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left flex-100 display-block" >
                        <span className="mb-15">{Localization.TextFormatter(objTextResource, "Algorithm") + ":"}</span>
                        {GetTestAlgorithmDiv(props)}
                    </div>
                </div>
            </div>
            {GetSeparationAndCalibrationGroupDiv()}

            {blnIsShowAdaptiveTaskSubSubjectSequenceDiv ? GetAdaptiveTaskSubSubjectSequenceDiv()
                : <React.Fragment />}
        </div>
    }

    return (
        GetContent()
    );
}

export default forwardRef(AdaptiveAlgorithm);