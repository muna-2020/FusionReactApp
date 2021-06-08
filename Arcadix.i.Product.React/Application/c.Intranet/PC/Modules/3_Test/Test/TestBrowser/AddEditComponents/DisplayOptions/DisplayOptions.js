// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name DisplayOptions
 * @param {object} props props
 * @summary This component is used for DisplayOptions in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const DisplayOptions = (props, ref) => {

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
                        "iTestProgressDisplayId": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["iTestProgressDisplayId"] : -1) : -1
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
     * @name GetProgressDiv
     * @summary Forms the whole jsx required for the display options.
     * @returns {object} jsx, React.Fragment
     */
    const GetProgressDiv = () => {
        let domProgress = [<div className="flex align-middle justify-left mb-10">
            <label className="radio mr-10">
                <input type="radio" name="" id=""
                    checked={state.objData["t_TestDrive_Test_TestProperty"][0]["iTestProgressDisplayId"] === -1 ? true : false}
                    onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("iTestProgressDisplayId", -1, objContext)}  
                />
                <span className="checkmark" name="group1" />
            </label>
            <span>{Localization.TextFormatter(objTextResource, "DoNotShow")}</span>
        </div>];
        props.Data.TestProgressDisplayData.map(objTestProgressDisplayData => {
            objTestProgressDisplayData["t_TestDrive_Test_TestProgressDisplay_Data"].map(objTableData => {
                if (objTableData["iLanguageId"].toString() == props.Resource.JConfiguration["InterfaceLanguageId"].toString()) {
                    domProgress = [...domProgress, <div className="flex align-middle justify-left mb-10">
                        <label className="radio mr-10">
                            <input type="radio" name="" id=""
                                checked={state.objData["t_TestDrive_Test_TestProperty"][0]["iTestProgressDisplayId"] === objTableData["iTestProgressDisplayId"] ? true : false}
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("iTestProgressDisplayId", objTableData["iTestProgressDisplayId"], objContext)}
                            /> 
                            <span className="checkmark" name="group1" />
                        </label>
                        <span>{objTableData["vTestProgressDisplay"]}</span>
                    </div>];
                }
            });
        });

        return domProgress;
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "DisplayOptions")}</div>

            <div className="col col-1">
               <div className="col-item align-top">
                  <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Progress")}</span>
                  </div>
                   <div className="row-right">
                        <div className="col col-2">
                          <div className="col-item">
                              <div className="row-left flex-100 display-block" >
                                  {GetProgressDiv()}
                             </div>
                          </div>
                     </div>
                 </div>
               </div>
            </div>
        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(DisplayOptions);