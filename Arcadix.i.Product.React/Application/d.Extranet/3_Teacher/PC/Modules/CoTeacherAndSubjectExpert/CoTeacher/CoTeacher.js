//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as CoTeacher_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacher/CoTeacher_Hook';
import CoTeacher_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacher/CoTeacher_ModuleProcessor';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import PlusWhiteImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/pluswhite.svg?inline';


/**
* @name CoTeacher
* @param {object} props props
* @summary This component displays the CoTeacher data.
* @returns {object} div that encapsulated the CoTeacher div with its details.
*/
const CoTeacher = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, CoTeacher_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CoTeacher", ["CoTeacher_ModuleProcessor"]: new CoTeacher_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CoTeacher_ModuleProcessor.Initialize(objContext, objContext.CoTeacher_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in CoTeacherAndSubjectExpert_Hook, that contains all the custom hooks.
    * @returns null
    */
    CoTeacher_Hook.Initialize(objContext);

    /**
    * @name GetTableData 
    * @param {String} strTeacherId Passes TeacherId
    * @param {Integer} intCount Passes Count
    * @param {Array} arrAvailbaleTeachers Passes AvailbaleTeachers
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetTableData(strTeacherId, intCount, arrAvailbaleTeachers) {
        let arrActiveTeachers = objContext.CoTeacher_ModuleProcessor.GetActiveTeachers(objContext);
        let objTeacherData = arrActiveTeachers.filter(objTempTeacherDetails => objTempTeacherDetails["uTeacherId"] === strTeacherId)[0];
        arrAvailbaleTeachers = [objTeacherData, ...arrAvailbaleTeachers];
        return(
            <tr>
                <td>
                    <div className="td-flex">
                        <div className="serial-number">{intCount}.</div>
                        <div className="content-dropdown">
                            <PerformanceProfiler ComponentName={"CoTeacher_Teacher"} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id={"CoTeacher_Teacher"}
                                    Meta={objContext.CoTeacher_ModuleProcessor.GetTeacherDropdownMetaData()}
                                    Data={objContext.CoTeacher_ModuleProcessor.GetTeacherDropdownData(arrAvailbaleTeachers, strTeacherId)}
                                    Resource={objContext.CoTeacher_ModuleProcessor.GetResourceData()}
                                    Events={objContext.CoTeacher_ModuleProcessor.GetTeacherDropdownEvents(objContext, objTeacherData["uTeacherId"],)}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </td>
                <td>{objTeacherData["vShortCut"]}</td>
                <td className="close-control">
                    <img src={CloseImage} 
                        alt="" onClick={() => { objContext.CoTeacher_ModuleProcessor.HandleOnClickRemoveButton(objContext, objTeacherData["uTeacherId"]); }} />
                </td>
            </tr>
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = props.objTextResource;//props.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert", props);//DataRef(props.textresource,"textresource;id;" + props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/coteacherandsubjectexpert").Data[0]["CoTeacherAndSubjectExpert"];
        let arrAvailableTeachers = objContext.CoTeacher_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "AvailableTeachers");
        let intCount = 0;
        return (
            <div className="co-teacher">
                <h3>{Localization.TextFormatter(objTextResource,'CoTeacherText')}</h3>
                <table>
                    <tr>
                        <th>{Localization.TextFormatter(objTextResource,'TeacherText')}</th>
                        <th>{Localization.TextFormatter(objTextResource,'TeacherShortNameText')}</th>
                        <th>&nbsp;</th>
                    </tr>

                    <tr>
                        <td colSpan={3} className="addRow">
                            <button className="button brown-button" onClick={() => objContext.CoTeacher_ModuleProcessor.HandleOnClickAddButton(objContext)}>
                                <img src={PlusWhiteImage} alt="" />
                                {Localization.TextFormatter(objTextResource,'AddButtonText')}
                            </button>
                        </td>
                    </tr>
          
                    {
                    state.arrCoTeachers && state.arrCoTeachers.map(objTempCoTeacher => {
                        if(objTempCoTeacher["cIsDeleted"] === "N")
                        {
                            intCount ++;
                            return GetTableData(objTempCoTeacher["uTeacherId"], intCount, arrAvailableTeachers);
                        }
                    })
                    }
          
                    {
                    state.arrCoTeachers && state.arrCoTeachers.length > 0 ? 
                    <tr>
                        <td className="right-align-button" colSpan={3}>
                                    <div className="button brown-button" onClick={() => { objContext.CoTeacher_ModuleProcessor.SaveCoTeachers(objContext); }}>{Localization.TextFormatter(objTextResource,'SaveButtonText')}</div>
                        </td>
                    </tr>:
                    <tr>
                        <td colSpan={3} className="empty-data">
                            {Localization.TextFormatter(objTextResource,'NoDataFoundText')}
                        </td>
                    </tr>
                    }
                </table>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(CoTeacher_ModuleProcessor.StoreMapList()))(CoTeacher);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CoTeacher_ModuleProcessor; 