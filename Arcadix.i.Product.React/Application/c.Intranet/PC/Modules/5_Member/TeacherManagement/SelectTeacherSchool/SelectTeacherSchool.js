//React related imports
import React, { useReducer } from 'react';

//Module Related imports.
import * as SelectTeacherSchool_Hook from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/SelectTeacherSchool/SelectTeacherSchool_Hook';
import SelectTeacherSchool_ModuleProcessor from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/SelectTeacherSchool/SelectTeacherSchool_ModuleProcessor';

/**
* @name SelectTeacherSchool.
* @param {object} props props.
* @summary This component is used to displays SelectTeacherSchool data.
* @returns {object}  React.Fragement that encapsulated the display grid with SelectTeacherSchool details.
*/
const SelectTeacherSchool = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, SelectTeacherSchool_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["SelectTeacherSchool_ModuleProcessor"]: new SelectTeacherSchool_ModuleProcessor() };


    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    //SelectTeacherSchool_Hook.Initialize(objContext);

    /**
    * @summary JSX for SelectTeacherSchool
    */
    const GetContent = () => {
        let objTextResource = props.Resource.Text;
        return <div className="print-to-pdf-parent">
            <div className="print-to-pdf-content-flex">
                <div className="mb-20">{objTextResource.MessageText}</div>
                {
                    objContext.props.Data.SelectedTeacher.map(objTeacher => {
                        return <div>
                            <b> {objTeacher["vName"]} </b>
                            {objTeacher["t_TestDrive_Member_Teacher_School"].map((objTeacherSchool, intIndex) => {
                                let blnChecked = objContext.state.arrSelectedSchools.find(objTemp => objTemp["uSchoolId"] == objTeacherSchool["uSchoolId"]) ? true : false;
                                return <div className="col col-2">
                                    <div className="col-item">
                                        <div className="row-left">
                                            <label className={props.Meta.InputType.toLowerCase() + " mt-10"}>
                                                <input
                                                    className="text-input"
                                                    id={"TeacherSchool" + (intIndex + 1)}
                                                    type={props.Meta.InputType.toLowerCase()}
                                                    onChange={(e) => {
                                                        objContext.SelectTeacherSchool_ModuleProcessor.HandleCheckBoxClick(e.target.checked, objTeacherSchool["uSchoolId"], objContext);
                                                    }}
                                                    checked={blnChecked}
                                                />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="row-right"><span>{objTeacherSchool["StateSchool"]}</span></div>
                                    </div>
                                </div>      
                            })}                        
                    </div>
                    })
                }                    
            </div>
            <div className="print-to-pdf-footer mt-20">
                <button className="ptp-btn" onClick={() => props.Events.GetSelectedTeacherSchools(objContext.state.arrSelectedSchools, props.Id)}>
                    {objTextResource.OkButtonText}
                </button>
                <button className="ptp-btn" onClick={() => Popup.ClosePopup(props.Id)}>
                    {objTextResource.CancleButtonText}
                </button>
            </div>
        </div>
    }

    return props.Data.SelectedTeacher ? GetContent() : <React.Fragment />;
};

export default SelectTeacherSchool;