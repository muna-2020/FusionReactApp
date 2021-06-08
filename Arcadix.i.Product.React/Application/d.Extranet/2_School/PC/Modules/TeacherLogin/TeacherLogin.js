//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as TeacherLogin_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/TeacherLogin_Hook';
import TeacherLogin_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/TeacherLogin_ModuleProcessor";

/**
 * @name TeacherLogin
 * @param {object} props props
 * @summary This component consists of TeacherLogin Names.
 * @returns {object} React.Fragement that encapsulated with TeacherLogin.
 */
const TeacherLogin = (props) => {

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
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx, React.Fragment
     */
    const GetContent = () => {
        let arrAllTeacherData = DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + props.ClientUserDetails.UserId)["Data"];
        let arrTeacherData = arrAllTeacherData ? arrAllTeacherData.filter(objTchr => (objTchr["t_TestDrive_Member_Teacher_School"].find(schlTchr => schlTchr["uSchoolId"] == props.ClientUserDetails.UserId && schlTchr["cIsDeleted"] == 'N')) != undefined) : [];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/TeacherLogin", props);
        return (
            <React.Fragment>

                <React.Fragment>
                    <div className="light-brown-bg teacher-logins">
                        <div className="top-spacing" id="TopSpacing" />
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="TeacherLogin" Meta={objContext.TeacherLogin_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                            <ul className="teacher-logins-list padding-20">
                                <li>
                                    <span>{Localization.TextFormatter(objTextResource, 'markAll')} ({arrTeacherData.length})</span>
                                    <label className="check-container">
                                        <input type="checkbox" value="markAll" id="markAll" onClick={(event) => { objContext.TeacherLogin_ModuleProcessor.MarkAll(event.target.checked, arrTeacherData, objContext); }} checked={objContext.TeacherLogin_ModuleProcessor.CheckOrUncheckMainCheckbox(arrTeacherData, objContext)} />
                                        <span className="checkmark" />
                                    </label>
                                </li>
                                {
                                    (arrTeacherData !== undefined && arrTeacherData.length > 0) ? <React.Fragment>{GetTeacherElements(arrTeacherData)} </React.Fragment> : <React.Fragment />
                                }
                            </ul>
                        </WrapperComponent>
                    </div>

                    <div className="wrap footer" id="FooterTeacherLogin">
                        <button className="button yellow-button" onClick={() => { objContext.TeacherLogin_ModuleProcessor.OnClickEmailPopup(objContext, objTextResource); }}>{Localization.TextFormatter(objTextResource, 'emailButtonText')}</button>
                    </div>
                </React.Fragment>

            </React.Fragment>
        );

    };

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

    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}
        </React.Fragment>
    );
};

///**
// * @name DynamicStyles
// * @param {object} props props
// * @summary Gets dynamic styles for the component.
// * @returns {Array} arrStyles
// */
//TeacherLogin.DynamicStyles = props => {
//    return [
//        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/TeacherLogin/TeacherLogin.css",
//        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
//        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css"
//    ];
//};

///**
// * @name InitialDataParams
// * @param {object} props props
// * @returns {object} InitialDataParams 
// */
//TeacherLogin.InitialDataParams = (props) => {
//    return (new ObjectQueue()).Queue((new TeacherLogin_ModuleProcessor()).InitialDataParams(props));
//};

export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherLogin_ModuleProcessor.StoreMapList()))(TeacherLogin);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherLogin_ModuleProcessor; 
