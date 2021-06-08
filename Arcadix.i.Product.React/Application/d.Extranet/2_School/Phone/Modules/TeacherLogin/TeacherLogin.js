//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as TeacherLogin_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/TeacherLogin/TeacherLogin_Hook';
import TeacherLogin_ModuleProcessor from "@shared/Application/d.Extranet/2_School/Phone/Modules/TeacherLogin/TeacherLogin_ModuleProcessor";

function TeacherLogin(props) {

    /**
    * @name Initializing Reducer
    * @summary Provides state and dispatch.
    **/
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherLogin_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     **/
    let objContext = { state, props, dispatch, ["ModuleName"]: "TeacherLogin", ["TeacherLogin_ModuleProcessor"]: new TeacherLogin_ModuleProcessor() };

    /**
     * @name  InitializeCssAndDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TeacherLogin_ModuleProcessor.Initialize(objContext, objContext.TeacherLogin_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize method call in TeacherLogin_Hook, that contains all the custom hooks
     **/
    TeacherLogin_Hook.Initialize(objContext);

    /**
     * @name GetTeacherElements 
     * @param {Array} arrTeacherData TeacherData
     * @summary Creates an array of teacher from state.arrTeacherData and store in a variable
     * @returns {Array} arrTeacherElement array
     **/
    const GetTeacherElements = (arrTeacherData) => {
        return (
            <React.Fragment>
                {
                    arrTeacherData.map(objTeacher =>
                        <li key={objTeacher.uTeacherId}>
                            <span>{objTeacher.vName + " " + objTeacher.vFirstName}</span>
                            <label className="check-container">
                                <input type="checkbox" name={objTeacher.uTeacherId} value={objTeacher.uTeacherId} onChange={(e) => { objContext.TeacherLogin_ModuleProcessor.OnClickCheckBox(e.target.checked, objTeacher.uTeacherId, objContext); }} checked={objContext.TeacherLogin_ModuleProcessor.CheckOrUncheck(objTeacher.uTeacherId, objContext)} />
                                <span className="checkmark" />
                            </label>
                        </li>
                    )
                }
            </React.Fragment>
        )
    };


    function GetContent() {
        let arrAllTeacherData = DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + props.ClientUserDetails.UserId)["Data"];
        let arrTeacherData = arrAllTeacherData ? arrAllTeacherData.filter(objTchr => (objTchr["t_TestDrive_Member_Teacher_School"].find(schlTchr => schlTchr["uSchoolId"] == props.ClientUserDetails.UserId && schlTchr["cIsDeleted"] == 'N')) != undefined) : [];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TeacherLogin", props);
        return (
            <div className="teacher-login">
                <div className="news-title">
                    <span>Logins Lehrperson</span>
                </div>

                <div className="teacher-login-main-wrapper">
                    <div className="teacher-login-list-main">
                        <ul className="teacher-login-list">
                            <li>
                                <span>{Localization.TextFormatter(objTextResource, 'markAll')} ({arrTeacherData.length})</span>
                                <label className="check-container">
                                    <input type="checkbox" value="markAll" id="markAll" onClick={(event) => { objContext.TeacherLogin_ModuleProcessor.MarkAll(event.target.checked, arrTeacherData, objContext); }} checked={objContext.TeacherLogin_ModuleProcessor.CheckOrUncheckMainCheckbox(arrTeacherData, objContext)} />
                                    <span className="checkmark" />
                                </label>
                            </li>

                            {
                                arrTeacherData && arrTeacherData.length > 0 ? GetTeacherElements(arrTeacherData)
                                    : <></>
                            }
                        </ul>
                    </div>
                    <div className="footer-wrapper-main">
                        <button className="yellow-btn" onClick={() => { objContext.TeacherLogin_ModuleProcessor.OnClickEmailPopup(objContext, objTextResource); }}>Email</button>
                    </div>
                </div>


            </div>
        );
    }

    return GetContent();
}
/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherLogin_ModuleProcessor.StoreMapList()))(TeacherLogin);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherLogin_ModuleProcessor; 