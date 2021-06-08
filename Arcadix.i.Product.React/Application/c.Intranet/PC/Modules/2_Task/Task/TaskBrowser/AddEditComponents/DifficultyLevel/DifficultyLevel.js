// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Base classes.
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

/**
 * @name DifficultyLevel
 * @param {object} props props
 * @summary This component is used for DifficultyLevel in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const DifficultyLevel = (props, ref) => {

    /**
    * @name GetInitialState
    * @param {object} props 
    * @summary Forms the Initial state for component.
    * @returns {object} jsx, React.Fragment
    */
    const GetInitialState = (props) => {
        return {
            objData: {               
                "t_TestDrive_Task_AssignedTaskDifficultyLevel": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Task_AssignedTaskDifficultyLevel"] ? props.Data.DisplayData["t_TestDrive_Task_AssignedTaskDifficultyLevel"] : [] ) : []
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
    let objContext = { state, props, dispatch, "Base_AddEditTaskMaster_ModuleProcessor": new Base_AddEditTaskMaster_ModuleProcessor() };

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

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        const GetTaskDifficultyLevelCheckBoxes = (objSchoolYear) => {
            if (objSchoolYear.iSchoolYearId != -1) {
                let objSchoolYearData = objSchoolYear.t_TestDrive_Member_Class_SchoolYear_Data.find(objSchoolYearData => {
                    return objSchoolYearData["iLanguageId"] == props.Resource.JConfiguration.InterfaceLanguageId
                });

                let TaskDifficultyLevelCheckBoxes = props.Data.TaskDifficultyLevelData.sort((obj1, obj2) => obj1["iDisplayOrder"] - obj2["iDisplayOrder"]).map(objTaskDifficultyLevel => {
                    let objTaskDifficultyLevelData = objTaskDifficultyLevel.t_TestDrive_Task_TaskDifficultyLevel_Data.find(objTaskDifficultyLevelData => {
                        return objTaskDifficultyLevelData["iLanguageId"] == props.Resource.JConfiguration.InterfaceLanguageId
                    });

                    return <div className="checkbox-block">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={objContext.Base_AddEditTaskMaster_ModuleProcessor.IsDifficultyLevelChecked(objTaskDifficultyLevel["iTaskDifficultyLevelId"], objSchoolYear["iSchoolYearId"], objContext)}
                                onChange={() => {
                                    objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDifficultyLevelCheckBoxClick(objTaskDifficultyLevel["iTaskDifficultyLevelId"], objSchoolYear["iSchoolYearId"], objContext)
                                }}
                                name="" id=""
                            />
                            <span className="checkmark"></span>
                        </label>
                        <span>{objTaskDifficultyLevelData["vTaskDifficultyLevelName"]}</span>
                    </div>
                });

                return <div>
                    <div>{objSchoolYearData["vSchoolYearName"]}</div>
                    <div className="checkbox-flex">{TaskDifficultyLevelCheckBoxes}</div>
                </div>
            }
            else {
                let TaskDifficultyLevelCheckBoxes = props.Data.TaskDifficultyLevelData.sort((obj1, obj2) => obj1["iDisplayOrder"] - obj2["iDisplayOrder"]).map(objTaskDifficultyLevel => {
                    let objTaskDifficultyLevelData = objTaskDifficultyLevel.t_TestDrive_Task_TaskDifficultyLevel_Data.find(objTaskDifficultyLevelData => {
                        return objTaskDifficultyLevelData["iLanguageId"] == props.Resource.JConfiguration.InterfaceLanguageId
                    });

                    return <div className="checkbox-block">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={objContext.Base_AddEditTaskMaster_ModuleProcessor.IsDifficultyLevelChecked(objTaskDifficultyLevel["iTaskDifficultyLevelId"], objSchoolYear["iSchoolYearId"], objContext)}
                                onChange={() => {
                                    objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDifficultyLevelCheckBoxClick(objTaskDifficultyLevel["iTaskDifficultyLevelId"], objSchoolYear["iSchoolYearId"], objContext)
                                }}
                                name="" id=""
                            />
                            <span className="checkmark"></span>
                        </label>
                        <span>{objTaskDifficultyLevelData["vTaskDifficultyLevelName"]}</span>
                    </div>
                });

                return <div>
                    <div className="checkbox-flex">{TaskDifficultyLevelCheckBoxes}</div>
                </div>
            }
            
        }

        var DifficultyLevelDiv = (
            <div
                id="DifficultyLevelDiv"
                className="task-tabcontent"
                style={{ display: (props.Data.DivToShow == "DifficultyLevelDiv" ? "block" : "none") }}>
                <div className="title mt-20">
                    {Localization.TextFormatter(props.Resource.Text, "DifficultyPerGradeLevel")}
                </div>
                <div>
                    {props.Data.SchoolSettingsId == 1 ? props.Data.SchoolYearData.map(objSchoolYear => {
                        return GetTaskDifficultyLevelCheckBoxes(objSchoolYear)
                    }) : GetTaskDifficultyLevelCheckBoxes({"iSchoolYearId" : -1}) }                   
                </div>
        </div>
        );
        return DifficultyLevelDiv;         
    }

    return (
        GetContent()
    )
}

export default forwardRef(DifficultyLevel);
