// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name Adaptive
 * @param {object} props props
 * @summary This component is used for Adaptive in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const Adaptive = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {

                "t_TestDrive_Test_AdaptiveAlgorithmConfiguration": props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_AdaptiveAlgorithmConfiguration"]
                    : [
                        {
                            "vAttributeKey": "vProvider",
                            "vValue": "Cambridge"
                        },
                        {
                            "vAttributeKey": "vModel",
                            "vValue": "Polytomous"
                        },
                        {
                            "vAttributeKey": "vModelName",
                            "vValue": "GRM"
                        },
                        {
                            "vAttributeKey": "dModelConstant",
                            "vValue": 1
                        },
                        {
                            "vAttributeKey": "vAblityEstimationMethod",
                            "vValue": "ML"
                        },
                        {
                            "vAttributeKey": "vNextTaskSelectionMethod",
                            "vValue": "MFI"
                        },
                        {
                            "vAttributeKey": "dDifficultyFrom",
                            "vValue": -2.0
                        },
                        {
                            "vAttributeKey": "dDifficultyTo",
                            "vValue": -1.0
                        },
                        {
                            "vAttributeKey": "dCambAbilityRangeMin",
                            "vValue": -4.0
                        },
                        {
                            "vAttributeKey": "dCambAbilityRangeMax",
                            "vValue": 4.0
                        },
                        {
                            "vAttributeKey": "dCambDifficultyParameterMin",
                            "vValue": -4.0
                        },
                        {
                            "vAttributeKey": "dCambDifficultyParameterMax",
                            "vValue": 4.0
                        },
                        {
                            "vAttributeKey": "dCambDifficultyParameterInterQuad",
                            "vValue": 33
                        },
                        {
                            "vAttributeKey": "dTransformationMean",
                            "vValue": 100
                        },
                        {
                            "vAttributeKey": "dTransformationStandardDeviation",
                            "vValue": 900
                        },
                        {
                            "vAttributeKey": "dConfidenceIntervalAlpha",
                            "vValue": 0.95
                        }
                    ],
                "t_TestDrive_Test_TestProperty": [
                    {
                        "cOverrideConstanceAndVariance": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cOverrideConstanceAndVariance"] : "N") : "N",
                    }
                ],
                "t_TestDrive_Test_SubjectProperty": props.Data.IsEdit ? props.Data.DisplayData.t_TestDrive_Test_SubjectProperty : []
            },
            arrSubjects: [],
            blnIsMeanDisabled: false,
            blnIsCoVarianceDisabled: false,
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
     * @name useEffect
     * @param {object} objContext  objContext
     * @summary Setting the SubjectProperty in state on Subject change.
     */
    useEffect(() => {
        objContext.Base_AddEditTestMaster_ModuleProcessor.SetSubjectPropertyDataInState(objContext);
    }, [props.Data.SubjectId]);

    /**
     * @name useImperativeHandle
     * @param {ref} ref  ref from AddEditTest popup
     * @summary Setting up imperative handle
     */
    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return {
                ...state.objData,
                "t_TestDrive_Test_SubjectProperty": objContext.Base_AddEditTestMaster_ModuleProcessor.GetSubjectPropertySaveData(objContext),
                //"t_TestDrive_Test_SubjectProperty": state.objData.t_TestDrive_Test_TestProperty[0].cOverrideConstanceAndVariance == "Y" && state.blnIsMeanDisabled && state.blnIsCoVarianceDisabled ? state.objData.t_TestDrive_Test_SubjectProperty : []
            }
        }
    }), [state, props]);

    /**
    * @name GetSubjectPropertyTableDiv
    * @summary Forms the jsx required for SubjectPropertyTable.
    * @returns {object} jsx, React.Fragment
    */
    const GetSubjectPropertyTableDiv = () => {
        return <React.Fragment>
            <div className="result-range-table">
                <table className="add-edit-test-table">
                    <tr>
                        <th></th>
                        {state.arrSubjects.map(strSubjectName => <th className="nowrap">{strSubjectName}</th>)}
                        <th></th>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, "AbilityMean")}</td>
                        {state.arrSubjects.map((strSubjectName, intIndex) => {
                            return <td>
                                {state.blnIsMeanDisabled ? <label
                                    id={"dConstance" + intIndex}>
                                    {state.objData.t_TestDrive_Test_SubjectProperty?.[intIndex]?.["dConstance"]}
                                </label>
                                    : <input
                                        id={"dConstance" + intIndex}
                                        className="text-input"
                                        value={state.objData.t_TestDrive_Test_SubjectProperty?.[intIndex]?.["dConstance"]}
                                        type="number"
                                        disabled={state.blnIsMeanDisabled}
                                        style={{ WebkitAppearance: "none" }}
                                        onBlur={() => objContext.Base_AddEditTestMaster_ModuleProcessor.ValidateOnBlurSubjectProperty("dConstance", intIndex, objContext)}
                                        onChange={e => {
                                            objContext.Base_AddEditTestMaster_ModuleProcessor.HandleSubjectPropertyChange("dConstance", e.target.value, intIndex, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                    />}

                            </td>
                        })}
                        <td>
                            <img
                                src={state.blnIsMeanDisabled ? objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Edit.gif" : objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Add.gif"}
                                onClick={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleEnableDisableSubjectProperty("dConstance", !state.blnIsMeanDisabled, objContext)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, "AbilityVariance")}</td>
                        {state.arrSubjects.map((strSubjectName, intIndex) => {
                            return <td>
                                {state.blnIsCoVarianceDisabled ? <label
                                    id={"dVariance" + intIndex}>
                                    {state.objData.t_TestDrive_Test_SubjectProperty?.[intIndex]?.["dVariance"]}
                                </label> :
                                    <input
                                        id={"dVariance" + intIndex}
                                        className="text-input"
                                        value={state.objData.t_TestDrive_Test_SubjectProperty?.[intIndex]?.["dVariance"]}
                                        type="number"
                                        style={{ WebkitAppearance: "none" }}
                                        disabled={state.blnIsCoVarianceDisabled}
                                        onBlur={() => objContext.Base_AddEditTestMaster_ModuleProcessor.ValidateOnBlurSubjectProperty("dVariance", intIndex, objContext)}
                                        onChange={e => {
                                            objContext.Base_AddEditTestMaster_ModuleProcessor.HandleSubjectPropertyChange("dVariance", e.target.value, intIndex, objContext);
                                        }}
                                        onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                    />
                                }

                            </td>
                        })}
                        <td>
                            <img
                                src={state.blnIsCoVarianceDisabled ? objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Edit.gif" : objContext.props.Resource.SkinPath + "/Images/Application/Modules/Test/Icon_Add.gif"}
                                onClick={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleEnableDisableSubjectProperty("dVariance", !state.blnIsCoVarianceDisabled, objContext)}
                            />
                        </td>
                    </tr>
                </table>
            </div>
        </React.Fragment >
    }

    let objTextResource = props.Resource.Text;

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {

        return <React.Fragment>

            <div className="title">{Localization.TextFormatter(objTextResource, "General")}</div>

            <div className="General">
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "Provider")}</span>
                        </div>
                        <div className="row-right">
                            <label className="radio mr-10">
                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vProvider", "Cambridge", objContext)}
                                    id=""
                                    value={Localization.TextFormatter(objTextResource, "Cambridge")}
                                    onClick={e => {
                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vProvider", "Cambridge", objContext)
                                    }}
                                />
                                <span className="checkmark" name="group1" />
                            </label>
                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "Cambridge")}</span>
                        </div>

                        <div className="row-right">
                            <label className="radio mr-10">
                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vProvider", "Zurich", objContext)}
                                    id=""
                                    value={Localization.TextFormatter(objTextResource, "Zurich")}
                                    onClick={e => {
                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vProvider", "Zurich", objContext)
                                    }}
                                />
                                <span className="checkmark" name="group1" />
                            </label>
                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "Zurich")}</span>
                        </div>
                    </div>
                </div>

                {objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vProvider", "Cambridge", objContext) ?
                    <div>
                        <div className="col col-2">
                            <div className="col-item">
                                <div className="row-left">
                                    <span className="adaptive">{Localization.TextFormatter(objTextResource, "ModelType")}</span>
                                </div>


                                <div className="row-right">
                                    <label className="radio mr-10">
                                        <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModel", "Polytomous", objContext)}
                                            id=""
                                            value={Localization.TextFormatter(objTextResource, "Polytomous")}
                                            onClick={e => {
                                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModel", "Polytomous", objContext)
                                            }}
                                        />
                                        <span className="checkmark" name="group1" />
                                    </label>
                                    <span className="adaptive">{Localization.TextFormatter(objTextResource, "Polytomous")}</span>
                                </div>

                                <div className="row-right">
                                    <label className="radio mr-10">
                                        <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModel", "Dichotomous", objContext)}
                                            id=""
                                            value={Localization.TextFormatter(objTextResource, "Dichotomous")}
                                            onClick={e => {
                                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModel", "Dichotomous", objContext)
                                            }}
                                        />
                                        <span className="checkmark" name="group1" />
                                    </label>
                                    <span className="adaptive">{Localization.TextFormatter(objTextResource, "Dichotomous")}</span>
                                </div>
                            </div>
                        </div>

                        {objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModel", "Polytomous", objContext) ?
                            <div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "GRM", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "GRM")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "GRM", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "GRM")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "GRMText")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "MGRM", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "MGRM")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "MGRM", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10  adaptive">{Localization.TextFormatter(objTextResource, "MGRM")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "MGRMText")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "PCM", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "PCM")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "PCM", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "PCM")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "PCMText")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "GPCM", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "GPCM")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "GPCM", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "GPCM")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "GPCMText")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "RSM", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "RSM")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "RSM", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "RSM")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "RSMText")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "NRM", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "NRM")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "NRM", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "NRM")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "NRMText")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div />}

                        {objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModel", "Dichotomous", objContext) ?
                            <div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "1PL", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "1PL")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "1PL", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "1PL")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "1PLText")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "2PL", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "2PL")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "2PL", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "2PL")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "2PLText")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left" />
                                        <div className="row-right nowrap">
                                            <label className="radio mr-10">
                                                <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vModelName", "3PL", objContext)}
                                                    id=""
                                                    value={Localization.TextFormatter(objTextResource, "3PL")}
                                                    onClick={e => {
                                                        objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vModelName", "3PL", objContext)
                                                    }}
                                                />
                                                <span className="checkmark" name="group1" />
                                            </label>
                                            <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "3PL")}</span>
                                            <span className="adaptive">{Localization.TextFormatter(objTextResource, "3PLText")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div />}

                        <div className="col col-2">
                            <div className="col-item">
                                <div className="row-left">
                                    <span className="adaptive">{Localization.TextFormatter(objTextResource, "ModelConstant")}</span>
                                </div>


                                <div className="row-right">
                                    <label className="radio mr-10">
                                        <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("dModelConstant", "1", objContext)}
                                            id=""
                                            value={"1"}
                                            onClick={e => {
                                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dModelConstant", "1", objContext)
                                            }}
                                        />
                                        <span className="checkmark" name="group1" />
                                    </label>
                                    <span className="adaptive">{"1"}</span>
                                </div>

                                <div className="row-right">
                                    <label className="radio mr-10">
                                        <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("dModelConstant", "1.702", objContext)}
                                            id=""
                                            value={"1.702"}
                                            onClick={e => {
                                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dModelConstant", "1.702", objContext)
                                            }}
                                        />
                                        <span className="checkmark" name="group1" />
                                    </label>
                                    <span className="adaptive">{"1.702"}</span>
                                </div>
                            </div>
                        </div>
                    </div> : <div />}

            </div>


            <div className="title">{Localization.TextFormatter(objTextResource, "AdaptiveProperties")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "DifficultyFrom")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            type="number"
                            id="dDifficultyFrom"
                            className="text-input"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dDifficultyFrom", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dDifficultyFrom", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span >{Localization.TextFormatter(objTextResource, "DifficultyTo")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="dDifficultyTo"
                            className="text-input"
                            type="number"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dDifficultyTo", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dDifficultyTo", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            {objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vProvider", "Cambridge", objContext) ?
                <div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "AbilityRangeMin")}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    type="number"
                                    id="dCambAbilityRangeMin"
                                    className="text-input"
                                    value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dCambAbilityRangeMin", objContext)}
                                    disabled={true}
                                    onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "AbilityRangeMax")}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    type="number"
                                    id="dCambAbilityRangeMax"
                                    className="text-input"
                                    value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dCambAbilityRangeMax", objContext)}
                                    disabled={true}
                                    onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "DifficultyParamMin")}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    type="number"
                                    id="dCambDifficultyParameterMin"
                                    className="text-input"
                                    value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dCambDifficultyParameterMin", objContext)}
                                    disabled={true}
                                    onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "DifficultyParamMax")}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    type="number"
                                    id="dCambDifficultyParameterMax"
                                    className="text-input"
                                    value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dCambDifficultyParameterMax", objContext)}
                                    disabled={true}
                                    onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "DifficultyParamQuad")}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    type="number"
                                    id="dCambDifficultyParameterInterQuad"
                                    className="text-input"
                                    value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dCambDifficultyParameterInterQuad", objContext)}
                                    disabled={true}
                                    onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="title">{Localization.TextFormatter(objTextResource, "AblityEstimationMethod")}</div>
                    <div className="properties">
                        <div>
                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vAblityEstimationMethod", "ML", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "ML")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vAblityEstimationMethod", "ML", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "ML")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "MLText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vAblityEstimationMethod", "WL", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "WL")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vAblityEstimationMethod", "WL", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "WL")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "WLText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vAblityEstimationMethod", "EAP", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "EAP")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vAblityEstimationMethod", "EAP", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "EAP")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "EAPText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vAblityEstimationMethod", "BM", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "BM")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vAblityEstimationMethod", "BM", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "BM")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "BMText")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="title">{Localization.TextFormatter(objTextResource, "NextTaskSelectionMethod")}</div>
                        <div>
                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "MFI", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "MFI")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "MFI", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "MFI")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "MFIText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "MLWI", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "MLWI")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "MLWI", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "MLWI")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "MLWIText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "MPWI", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "MPWI")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "MPWI", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "MPWI")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "MPWIText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "MEI", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "MEI")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "MEI", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "MEI")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "MEIText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "KL", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "KL")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "KL", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "KL")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "KLText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "KLP", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "KLP")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "KLP", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "KLP")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "KLPText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "Proportional", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "Proportional")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "Proportional", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "Proportional")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "ProportionalText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "Progressive", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "Progressive")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "Progressive", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "Progressive")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "ProgressiveText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="nowrap">
                                        <label className="radio mr-10">
                                            <input type="radio" checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsPropertyChecked("vNextTaskSelectionMethod", "Random", objContext)}
                                                id=""
                                                value={Localization.TextFormatter(objTextResource, "Random")}
                                                onClick={e => {
                                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vNextTaskSelectionMethod", "Random", objContext)
                                                }}
                                            />
                                            <span className="checkmark" name="group1" />
                                        </label>
                                        <span className="mr-10 adaptive">{Localization.TextFormatter(objTextResource, "Random")}</span>
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "RandomText")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-1">
                                <div className="col-item">
                                    <div className="row-left">
                                        <span className="adaptive">{Localization.TextFormatter(objTextResource, "RandomSequence")}</span>
                                    </div>
                                    <div className="row-right">
                                        <input
                                            id="vRandomSequence"
                                            className="text-input"
                                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("vRandomSequence", objContext)}
                                            onChange={e => {
                                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("vRandomSequence", e.target.value, objContext)
                                            }}
                                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div />}

            <div className="title">{Localization.TextFormatter(objTextResource, "StoppingCriteria")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "StandardError")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            type="number"
                            id="dStandardError"
                            className="text-input"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dStandardError", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dStandardError", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "MaximumNumberOfTasks")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            type="number"
                            id="iMaximunNumberOfTasks"
                            className="text-input"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("iMaximunNumberOfTasks", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("iMaximunNumberOfTasks", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Minimumtasks")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            type="number"
                            id="iMinimumNumberOfTasks"
                            className="text-input"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("iMinimumNumberOfTasks", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("iMinimumNumberOfTasks", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            <div className="title">{Localization.TextFormatter(objTextResource, "Transformation")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "TransformationMean")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            type="number"
                            id="dTransformationMean"
                            className="text-input"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dTransformationMean", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dTransformationMean", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "TransformationStandardDeviation")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            type="number"
                            id="dTransformationStandardDeviation"
                            className="text-input"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dTransformationStandardDeviation", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dTransformationStandardDeviation", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "ConfidenceIntervalAlpha")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            type="number"
                            id="dConfidenceIntervalAlpha"
                            className="text-input"
                            value={objContext.Base_AddEditTestMaster_ModuleProcessor.GetAdaptivePropertyValue("dConfidenceIntervalAlpha", objContext)}
                            onChange={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleAdaptivePropertyChange("dConfidenceIntervalAlpha", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            <div className="resulttext-cerfificate">
                <div className="">
                    <label className="radio mr-10">
                        <input type="radio"
                            checked={state.objData.t_TestDrive_Test_TestProperty[0].cOverrideConstanceAndVariance != "Y" ? true : false}
                            id=""
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cOverrideConstanceAndVariance", e.target.checked ? "N" : "Y", objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "Default")}</span>
                </div>

                <div className="">
                    <label className="radio mr-10">
                        <input type="radio"
                            checked={state.objData.t_TestDrive_Test_TestProperty[0].cOverrideConstanceAndVariance && state.objData.t_TestDrive_Test_TestProperty[0].cOverrideConstanceAndVariance == "Y" ? true : false}
                            id=""
                            onClick={e => {
                                objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cOverrideConstanceAndVariance", e.target.checked ? "Y" : "N", objContext)
                            }}
                        />
                        <span className="checkmark" name="group1" />
                    </label>
                    <span className="nowrap">{Localization.TextFormatter(objTextResource, "TestSpecificValues")}</span>
                </div>
            </div>
            {state.objData.t_TestDrive_Test_TestProperty[0].cOverrideConstanceAndVariance == "Y" && props.Data.SubjectId && props.Data.SubjectId != -1 ? GetSubjectPropertyTableDiv() : <React.Fragment />}
        </React.Fragment>
    }

    return (
        GetContent()
    );
}

export default forwardRef(Adaptive);