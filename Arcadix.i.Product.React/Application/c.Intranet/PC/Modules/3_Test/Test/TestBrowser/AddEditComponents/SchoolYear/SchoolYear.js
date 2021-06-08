// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name SchoolYear
 * @param {object} props props
 * @summary This component is used for SchoolYear in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const SchoolYear = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "t_TestDrive_Test_AssignedSchoolYear": props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_AssignedSchoolYear"] : []                 
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

   /**
    * @name GetContent
    * @summary Forms the whole jsx required for the component.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let jsxSchoolYearCheckboxDiv = props.Data.SchoolYearData.map(objSchoolYear => {
             return objSchoolYear.t_TestDrive_Member_Class_SchoolYear_Data.map(objSchoolYearData => {
                if (objSchoolYearData["iLanguageId"] == props.Resource.JConfiguration.InterfaceLanguageId) {
                    return <div className="checkbox-block">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={objContext.Base_AddEditTestMaster_ModuleProcessor.IsSchoolYearChecked(objSchoolYear.iSchoolYearId, objContext)}
                                name="" id=""
                                onChange={() => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleSchoolYearChange(objSchoolYear.iSchoolYearId, objContext)} 
                            />
                            <span className="checkmark"></span>
                        </label>
                        <span>{objSchoolYearData.vSchoolYearName}</span>
                    </div>
                }
            })
        })

        let SchoolYearDiv = <React.Fragment>
                                <div className="title mt-20">
                                    {Localization.TextFormatter(props.Resource.Text, "SchoolYear")}
                                </div>
                                <div className="checkbox-flex">
                                    {jsxSchoolYearCheckboxDiv}
                                  
                                </div>
        </React.Fragment>
                          
        return SchoolYearDiv;
    }

    return (
        GetContent()
    )
}

export default forwardRef(SchoolYear);
