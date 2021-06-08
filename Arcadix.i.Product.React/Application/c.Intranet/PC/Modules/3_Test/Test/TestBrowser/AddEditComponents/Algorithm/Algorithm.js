// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name Algorithm
 * @param {object} props props
 * @summary This component is used for Algorithm in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const Algorithm = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} objdata initial state
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "iAlgorithmId": props.Data.IsEdit ? props.Data.DisplayData.iAlgorithmId : 1,
                "t_TestDrive_Test_TestProperty": [
                    {
                        "cShowLinearIndex": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cShowLinearIndex"] : "N") : "N",
                        "cGroupTasksBySubSubject": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cGroupTasksBySubSubject"] : "N") : "N"
                    }
                ]
            }
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
            return state.objData
        }
    }), [state, props]);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetTestAlgorithm
     * @param {object} props
     * @summary Forms the jsx for TestAlgorithm.
     * @returns {object} jsx, React.Fragment
     */
    const GetTestAlgorithm = (props) => {
        return props.Data.AlgorithmData.map(objTestAlgorithm => {
            if (objTestAlgorithm.iAlgorithmId == 2 || objTestAlgorithm.iAlgorithmId == 1 || objTestAlgorithm.iAlgorithmId == 10) {
                let objData = objTestAlgorithm["t_TestDrive_Test_Algorithm_Data"].find(obj => obj["iLanguageId"] == props.ParentProps.JConfiguration["InterfaceLanguageId"]);
                if (objData) {
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
            }
        })
    }

    /**
     * @name GetAdditionalAlgorithm
     * @param {array} arrType
     * @summary Forms the jsx for AdditionalAlgorithm.
     * @returns {object} jsx, React.Fragment
     */
    const GetAdditionalAlgorithm = (arrType) => {
        var arrType = state.objData["iAlgorithmId"] == 2 ? [8, 11] : [8];
        return props.Data.AlgorithmData.map(objTestAlgorithm => {
            if (arrType.includes(objTestAlgorithm.iAlgorithmId)) {
                let objData = objTestAlgorithm["t_TestDrive_Test_Algorithm_Data"].find(obj => obj["iLanguageId"] == props.ParentProps.JConfiguration["InterfaceLanguageId"]);
                return <div className="flex align-middle justify-left">
                    <label className="checkbox mr-10">
                        <input type="radio" name="" id=""
                            checked={(objTestAlgorithm.iAlgorithmId == 11 && state.objData["t_TestDrive_Test_TestProperty"] && state.objData["t_TestDrive_Test_TestProperty"][0]["cShowLinearIndex"] == "Y") || (objTestAlgorithm.iAlgorithmId == 8 && state.objData["t_TestDrive_Test_TestProperty"] && state.objData["t_TestDrive_Test_TestProperty"][0]["cGroupTasksBySubSubject"] == "Y")}
                            onClick={e => {
                                if (objTestAlgorithm.iAlgorithmId == 11) {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChangeSubTable("t_TestDrive_Test_TestProperty", { "cShowLinearIndex": state.objData["t_TestDrive_Test_TestProperty"][0]["cShowLinearIndex"] == "Y" ? "N" : "Y", "cGroupTasksBySubSubject": "N" }, objContext)
                                }
                                if (objTestAlgorithm.iAlgorithmId == 8) {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChangeSubTable("t_TestDrive_Test_TestProperty", { "cShowLinearIndex": "N", "cGroupTasksBySubSubject": state.objData["t_TestDrive_Test_TestProperty"][0]["cGroupTasksBySubSubject"] == "Y" ? "N" : "Y" }, objContext)
                                }
                            }}
                        />
                        <span className="checkmark" name="group" />
                    </label>
                    <span>{objData["vAlgorithmName"]}</span>
                </div>
            }
        })
    }

    const GetContent = () => {
        return <div id={props.Id}>
            <div className="title">{Localization.TextFormatter(objTextResource, "DisplayOptions")}</div>
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left flex-100 display-block">
                        <span className="mb-15">{Localization.TextFormatter(objTextResource, "Algorithm") + ":"}</span>
                        {GetTestAlgorithm(props)}
                    </div>
                </div>
                {state.objData["iAlgorithmId"] != 10
                    ?
                    < div className="col-item">
                        <div className="row-left flex-100 display-block">
                            <span className="mb-15">{Localization.TextFormatter(objTextResource, "Options") + ":"}</span>
                            {GetAdditionalAlgorithm()}
                        </div>
                    </div>
                    :
                    <React.Fragment />
                }
            </div>
        </div>
    }

    return (
        GetContent()
    );
}

export default forwardRef(Algorithm);
