//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AssignClassType_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/AssignClassType/AssignClassType_Hook';
import AssignClassType_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/Phone/Modules/AssignClassType/AssignClassType_ModuleProcessor";

//Components used in module.
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

/**
 * @name AssignClassType
 * @param {object} props props
 * @summary This component shows the classtype for all classes.
 * @returns {object} React.Fragement that encapsulated AssignClassType div.
 */
const AssignClassType = props => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, AssignClassType_Hook.GetInitialState(props));

    /**
      * @name Assigning objContext
      * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used
      **/
    let objContext = { state, props, dispatch, ["ModuleName"]: "AssignClassType", ["AssignClassType_ModuleProcessor"]: new AssignClassType_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AssignClassType_ModuleProcessor.Initialize(objContext, objContext.AssignClassType_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     **/
    AssignClassType_Hook.Initialize(objContext);

    /**
     * @name GetSubjectElements
     * @param {any} arrSubjectData arrSubjectData
     * @param {any} objContext objContext
     * @summary returns array of subject
     * @return {*} array 
     */
    const GetSubjectElements = (arrSubjectData, objContext) => {
        let arrSubjectElements = [];
        if (arrSubjectData)
            arrSubjectElements = arrSubjectData.map((s) =>
                // <li className={state.objSelectedSubject !== undefined && state.objSelectedSubject.iSubjectId === s.iSubjectId ? "active" : ""}
                //     onClick={() => { objContext.AssignClassType_ModuleProcessor.OnchangeSubject(objContext, s) }}>
                //     {s["t_TestDrive_Subject_Data"][0]["vSubjectName"]}
                // </li>
                <button className={state.objSelectedSubject !== undefined && state.objSelectedSubject.iSubjectId === s.iSubjectId ? "active" : ""}
                onClick={() => { objContext.AssignClassType_ModuleProcessor.OnchangeSubject(objContext, s) }}
                > {s["t_TestDrive_Subject_Data"][0]["vSubjectName"]}</button>
            );
        return arrSubjectElements;
    };

    /**
     * @name GetClassTypeElements
     * @param {any} objTextResource objTextResource
     * @param {any} objContext objContext
     * @param {any} arrPupilData arrPupilData
     * @summary Gives the array of Classtype element
     * @return {*} array
     */
    const GetClassTypeElements = (objTextResource, objContext, arrPupilData) => {
        let arrClassTypeElements =
            (
                // <tr className="activeRow">
                //     <td>{Localization.TextFormatter(objTextResource, 'AllPupilText')}({arrPupilData ? arrPupilData.length : ''})</td>
                //     {
                //         state.arrClassTypeData == undefined ? "" : state.arrClassTypeData.map((objClassType, ctIdx) => {
                //             return (
                //                 <td>
                //                     <label className="checkContainer">
                //                         <span className="spanNum">{objClassType.t_TestDrive_Member_ClassType_Data[0].vClassTypeName}</span>
                //                         <input id={objClassType.iClassTypeId} type="checkbox" onClick={(event) => { objContext.AssignClassType_ModuleProcessor.ToggleAllPupil(objContext, objClassType, event.target.checked, ctIdx) }} checked={objClassType.isSelected} />
                //                         <span className="checkmark" />
                //                     </label>
                //                 </td>
                //             );
                //         })
                //     }
                // </tr>

                <tr>
                    <th>{Localization.TextFormatter(objTextResource, 'AllPupilText')}({arrPupilData ? arrPupilData.length : ''})</th>
                    {
                        state.arrClassTypeData == undefined ? "" : state.arrClassTypeData.map((objClassType, ctIdx) => {
                            return (
                                <th>
                                    <span>{objClassType.t_TestDrive_Member_ClassType_Data[0].vClassTypeName}</span>
                                    <label class="chk-container">
                                        <input id={objClassType.iClassTypeId} type="checkbox" onClick={(event) => { objContext.AssignClassType_ModuleProcessor.ToggleAllPupil(objContext, objClassType, event.target.checked, ctIdx) }} checked={objClassType.isSelected}/>
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
                                );
                        })
                    }
                </tr>
            );
        return arrClassTypeElements;
    };

    /**
     * @name GetAssignedClassTypeElements
     * @param {any} objContext objContext
     * @summary Gives an array of AssignedClassTypeElements
     * @return {*} array
     */
    const GetAssignedClassTypeElements = (objContext) => {
        let arrAssignedClassTypeElements = "";
        if (state.arrManipulatedClassTypeData != undefined)
            arrAssignedClassTypeElements = state.arrManipulatedClassTypeData.map((objPupil, pIdx) => {
                return (
                    // <tr>
                    //     <td>{objPupil.vPupilName}</td>
                    //     {
                    //         objPupil.arrClassTypeData == undefined ? "" : objPupil.arrClassTypeData.map((objClassType, iIndex) => {
                    //             return (
                    //                 <td>
                    //                     <label className="checkContainer circle-check">
                    //                         <input type="checkbox" name={pIdx} checked={objClassType.isSelected} onClick={(event) => {
                    //                             objContext.AssignClassType_ModuleProcessor.UpdateStateOnClickCheckBox(objContext, event.target.checked, objPupil, objClassType, iIndex)
                    //                         }} />
                    //                         <span className="checkmark" />
                    //                     </label>
                    //                 </td>
                    //             );
                    //         })
                    //     }
                    // </tr>

                    <tr>
                        <td>{objPupil.vPupilName}</td>
                        {
                            objPupil.arrClassTypeData == undefined ? "" : objPupil.arrClassTypeData.map((objClassType, iIndex) => {
                                return (
                                    <td>
                                        <input type="checkbox" name={pIdx} checked={objClassType.isSelected} onClick={(event) => {
                                            objContext.AssignClassType_ModuleProcessor.UpdateStateOnClickCheckBox(objContext, event.target.checked, objPupil, objClassType, iIndex)
                                        }} />
                                        <span className="checkmark" />
                                    </td>
                                );
                            })
                        }
                    </tr>
                );
            });
        return arrAssignedClassTypeElements;
    }

    /**
     * @name GetContent
     * @param {any} props props
     * @summary Returns the required jsx for component
     * @return {*} Jsx
     **/
    const GetContent = (props) => {
        let strClassId = state.objSelectedClass ? state.objSelectedClass["uClassId"] : state.strUserPreferenceClassId;
        let iStateId = state.iStateId;
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/AssignClassType", props);
        let arrSubject = [];
        if (DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsHighStakeSubject;Y;iParentSubjectId;0")) {
            arrSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsHighStakeSubject;Y;iParentSubjectId;0")["Data"];
        }

        let arrClassData = objContext.AssignClassType_ModuleProcessor.GetClassDropDownData(objContext, objTextResource).arrFinalClassData;
        let arrPupilData = [];
        if (DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)) {
            arrPupilData = DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        }
        let arrClassTypeData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_ClassType, "Object_Extranet_Teacher_ClassType;iStateId;" + iStateId)) {
            arrClassTypeData = DataRef(objContext.props.Object_Extranet_Teacher_ClassType, "Object_Extranet_Teacher_ClassType;iStateId;" + iStateId)["Data"]
        }
        let arrAssignedClassTypeData = [];
        if (DataRef(props.Object_Extranet_Pupil_PupilSubjectClassType, "Object_Extranet_Pupil_PupilSubjectClassType;uClassId;" + strClassId)) {
            arrAssignedClassTypeData = DataRef(props.Object_Extranet_Pupil_PupilSubjectClassType, "Object_Extranet_Pupil_PupilSubjectClassType;uClassId;" + strClassId)["Data"]
        }

        let blnExternalUser = objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == "Y" ? true : false;

        if (!state.blnDataLoaded) {
            let strSubjectId = "-1";
            if (state.objSelectedSubject != undefined)
                strSubjectId = state.objSelectedSubject.iSubjectId;
            else if (arrSubject.length > 0)
                strSubjectId = arrSubject[0]["iSubjectId"];
            let arrManipulatedClassTypeData = objContext.AssignClassType_ModuleProcessor.FormAssignClassTypeData(objContext, arrPupilData, arrClassTypeData, arrAssignedClassTypeData, strSubjectId)
            let arrModifiedClassTypeData = objContext.AssignClassType_ModuleProcessor.GetModifiedClassTypeData(arrClassTypeData, arrPupilData, arrAssignedClassTypeData, strSubjectId)
            dispatch({
                type: 'SET_STATE', payload: {
                    "arrManipulatedClassTypeData": arrManipulatedClassTypeData,
                    "arrClassTypeData": arrModifiedClassTypeData,
                    "blnDataLoaded": true
                }
            });

            window.setTimeout(function () {
                ApplicationState.SetProperty("blnShowAnimation", false);
            }, 1000);

        }

        return (
            <div className="assign-class-type">

                <div className="assign-class-type-title">
                    <div className="assign-class-type-title-left">
                        <span className="heading-left">Standortbestimmung</span>
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/violet-angle-right.svg")}
                        />
                        <span className="menu-title">Niveauzuteilung</span>
                    </div>
                    <div className="assign-class-type-title-right">
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}
                        />
                    </div>
                </div>

                <div className="assign-class-type-main-wrapper">

                {
                    blnExternalUser ? <div className="warning-text"><span>{Localization.TextFormatter(objTextResource, 'KeyCloakText')}</span></div> : <React.Fragment />
                }

                <div className="top-head">
                    <div className="assign-class-type-dropdown-wrapper">
                        {arrClassData.length > 0 ? <span className="dropdown-label">{Localization.TextFormatter(objTextResource, 'ClassText')}:</span>  : ''} 
                        {arrClassData.length > 0 ?
                        <div className="assign-class-type-dropdown">
                            <PerformanceProfiler ComponentName={"AssignClassTypeClassDropDown"} JConfiguration={props.JConfiguration} >
                                <ClassDropDown
                                    id="AssignClassTypeClassDropDown"
                                    SelectedValue={strClassId}
                                    Data={arrClassData}
                                    DisplayColumn="vClassName"
                                    ValueColumn="uClassId"
                                    JConfiguration={props.JConfiguration}
                                    ClientUserDetails={props.ClientUserDetails}
                                    OnChangeEventHandler={(objItem) => { objContext.AssignClassType_ModuleProcessor.OnChangeClass(objContext, objItem) }}
                                />
                            </PerformanceProfiler>
                        </div>
                        : ''}
                    </div>
                </div>

                <div className="tabs-wrapper">
                    <span className="tabs-heading">{Localization.TextFormatter(objTextResource, 'LevelAllocation')}</span>
                    <div className="tabs">
                        {GetSubjectElements(arrSubject, objContext)}
                    </div>
                </div>

                {/*table wrapper starts here*/}

                <div className="table-wrapper">
                    <table className="assign-class-table">
                        <tbody>
                            {GetClassTypeElements(objTextResource, objContext, arrPupilData)}
                            {GetAssignedClassTypeElements(objContext)}                            
                            {/* <tr>
                                <td>Ayyappa P</td>
                                <td><input type="radio" /></td>
                                <td><input type="radio" /></td>
                                <td><input type="radio" /></td>
                                <td><input type="radio" /></td>
                            </tr>

                            <tr>
                                <td>Ayyappa P</td>
                                <td><input type="radio" /></td>
                                <td><input type="radio" /></td>
                                <td><input type="radio" /></td>
                                <td><input type="radio" /></td>
                            </tr> */}                            

                        </tbody>
                    </table>
                </div>

                </div>

                <div className="assign-class-type-footer-wrapper">
                    <button  onClick={() => { objContext.AssignClassType_ModuleProcessor.SaveData(objContext, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
                </div>

            </div>
        );
    }
    return (
        <div>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <div />}
        </div>
    );
};

export default connect(ExtranetBase_Hook.MapStoreToProps(AssignClassType_ModuleProcessor.StoreMapList()))(AssignClassType);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AssignClassType_ModuleProcessor; 