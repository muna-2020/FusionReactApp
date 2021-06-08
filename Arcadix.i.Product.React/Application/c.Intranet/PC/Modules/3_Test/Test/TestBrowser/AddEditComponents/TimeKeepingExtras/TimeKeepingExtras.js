// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';
import * as TimeKeepingExtras_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/TimeKeepingExtras/TimeKeepingExtras_MetaData';

/**
 * @name TimeKeepingExtras
 * @param {object} props props
 * @summary This component is used for TimeKeepingExtras in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const TimeKeepingExtras = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "t_TestDrive_Test_TestProperty": [
                    {
                        "iDurationOfTestInMinutes": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ?props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["iDurationOfTestInMinutes"] : null) : null,
                        "iMinimumTasksBeforeTestLimitIsConsidered": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ?props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["iMinimumTasksBeforeTestLimitIsConsidered"] : null) : null,
                        "cCheckTestTimeLimitOnServerSide": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ?props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cCheckTestTimeLimitOnServerSide"] : "N") : "N"
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
    let arrTimeKeepingExtrasMetaData = TimeKeepingExtras_MetaData.GetTimeKeepingExtrasMetaData();

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "Extras")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Duration")}</span>
                    </div>
                    <div className="row-right">                        
                        <input id="iDurationOfTestInMinutes"
                            value={state.objData["t_TestDrive_Test_TestProperty"][0] ? state.objData["t_TestDrive_Test_TestProperty"][0].iDurationOfTestInMinutes : ""}
                            onBlur={(e) => props.Data.IsSaveClicked ? FieldValidator.ValidateClientSide(arrTimeKeepingExtrasMetaData, objContext.props.Resource.Text, { ["iDurationOfTestInMinutes"]: e.target.value }, "iDurationOfTestInMinutes", false, "", "", true) : {}}
                            onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("iDurationOfTestInMinutes", e.target.value, objContext)}
                            className="text-input"
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                         />
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "MinimumTasks")}</span>
                    </div>
                    <div className="row-right">
                        <input id="iMinimumTasksBeforeTestLimitIsConsidered"
                            value={state.objData["t_TestDrive_Test_TestProperty"][0] ? state.objData["t_TestDrive_Test_TestProperty"][0].iMinimumTasksBeforeTestLimitIsConsidered : ""}
                            onBlur={(e) => props.Data.IsSaveClicked ? FieldValidator.ValidateClientSide(arrTimeKeepingExtrasMetaData, objContext.props.Resource.Text, { ["iMinimumTasksBeforeTestLimitIsConsidered"]: e.target.value }, "iMinimumTasksBeforeTestLimitIsConsidered", false, "", "", true) : {}}
                            onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("iMinimumTasksBeforeTestLimitIsConsidered", e.target.value, objContext)}
                            className="text-input"
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left time-keeping-extras">
                        <span>{Localization.TextFormatter(objTextResource, "TestTimeLimit")}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input type="checkbox" name="" id="cCheckTestTimeLimitOnServerSide"
                                checked={state.objData["t_TestDrive_Test_TestProperty"][0] && state.objData["t_TestDrive_Test_TestProperty"][0]["cCheckTestTimeLimitOnServerSide"] === "Y" ? true : false}
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cCheckTestTimeLimitOnServerSide", e.target.checked ? "Y" : "N", objContext)}                               
                            />
                            <span className="checkmark"></span>
                        </label>                       
                    </div>
                </div>
            </div>
        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(TimeKeepingExtras);