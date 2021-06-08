import React, { useReducer } from "react";
import { connect } from "react-redux";
import DropDown from "@root/Framework/Controls/DropDown/DropDown/DropDown.js";
import Grid from '@root/Framework/Blocks/GridGenerator/Grid';
import * as ClassBusinessLogic from '@shared/Application/d.Extranet/2_School/Modules/ClassAndPupil/Class/ClassBusinessLogic';
import FillHeight from '@root/Framework/Controls/FillHeight/FillHeight';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const Class = (props) => {

    /**
     * @summary Provides satate and dispatch.
     */
    const [state, dispatch] = useReducer(ClassBusinessLogic.Reducer, ClassBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    ClassBusinessLogic.useDataLoaded(objContext);

    /**
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = objContext.props.TextResource;
        const arrActivationStatusToggleData = ClassBusinessLogic.GetActivationStatusToggleData(objContext);
        let objClassData = ClassBusinessLogic.GetClassDataFromApplicationState(objContext);
        let objValidationMessagesForGrid = {
            "EmptyDataMessage": Localization.TextFormatter(objTextResource, 'EmptyDataMessage'),
            "Date": Localization.TextFormatter(objTextResource, 'Date'),
            "Email": Localization.TextFormatter(objTextResource, 'Email'),
            "Required": Localization.TextFormatter(objTextResource, 'Required')
        };

        let arrTeacherData = [];
        let showTeacherDropDown = false;
        if (props.JConfiguration.ApplicationTypeId === "6" || (props.JConfiguration.ApplicationTypeId === "1" && props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y")) {
            arrTeacherData = ClassBusinessLogic.GetTeachers(objContext);
            showTeacherDropDown = true;
        }

        return (
            <div className="panel-left">
                <div className="padding-top-20" id="TopHeadClassPupilLeftpanel">
                    <div className="top-head">
                        {showTeacherDropDown === true ?
                            <React.Fragment>
                                <span>{Localization.TextFormatter(objTextResource, 'TeacherDropdownLabel')}</span>
                                <div className="content-dropdown">
                                    <DropDown
                                        id="teacherDropDown"
                                        Data={arrTeacherData}
                                        IsLanguageDependent="N"
                                        DisplayColumn="vFirstName,vName"
                                        ValueColumn="uTeacherId"
                                        SelectedValue=""
                                        ShowDefaultOption={true}
                                        DefaultOptionText={Localization.TextFormatter(objTextResource, 'TeacherDropdownAllItem')}
                                        DefaultOptionValue=""
                                        JConfiguration={props.JConfiguration}
                                        OnChangeEventHandler={(objItem, dropdownProps) => { ClassBusinessLogic.HandleDropDownForTeacher(objContext, objItem); }} />
                                </div>
                            </React.Fragment> : <React.Fragment></React.Fragment>}
                        <span>{Localization.TextFormatter(objTextResource, 'ClassesActiveInactiveLabel')}</span>
                        <div className="content-dropdown">
                            <DropDown
                                id="statusToggleDropDown"
                                Data={arrActivationStatusToggleData}
                                IsLanguageDependent="N"
                                DisplayColumn="key"
                                ValueColumn="value"
                                SelectedValue={arrActivationStatusToggleData[0].value}
                                JConfiguration={props.JConfiguration}
                                OnChangeEventHandler={(objItem, dropdownProps) => { ClassBusinessLogic.HandleActivationStatusToggle(objContext, objItem); }} />
                        </div>
                    </div>
                </div>
                <FillHeight HeaderIds={["Header", "SubNavigation", "outletBand", "TopHeadClassPupilLeftpanel"]} className="bgStyle" scrollStyle={{ overflow: "auto" }}>
                    <Grid
                        ColumnTextResource={objTextResource}
                        OnClickRow={(objClass) => { ClassBusinessLogic.HandleOnClickRow(objContext, objClass) }}
                        Header={ClassBusinessLogic.GetColumns(objContext)}
                        ForeignKeyName="uClassId"
                        DropDownData={ClassBusinessLogic.GetDropdownData(objContext)}
                        RowData={state.arrClassGridData}
                        PreselectValue={objClassData ? objClassData["uClassId"] ? objClassData["uClassId"] : "000000000000-0000-0000-0000-00000000" : "000000000000-0000-0000-0000-00000000"}
                        ActionButtons={ClassBusinessLogic.GetActionButtons(objContext, '70%', '84%', '70%', '84%')}
                        HeaderButtons={ClassBusinessLogic.GetHeaderButtons(objContext)}
                        ResourceText={objValidationMessagesForGrid}
                        SaveMethod={(objSaveData) => { ClassBusinessLogic.SaveMethod(objContext, objSaveData) }}
                        objEditRowData={state.arrClassGridData.length > 0 ? state.arrClassGridData[0].cIsNew ? state.arrClassGridData[0] : {} : {}}
                        JConfiguration={props.JConfiguration}
                        DeleteColumnName="t_TestDrive_Member_Class_Teacher.cIsDeleted"
                        DeleteNewEmptyRow={() => { ClassBusinessLogic.DeleteEmptyRow(objContext) }} />
                </FillHeight>
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment></React.Fragment>}</React.Fragment>
    );
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(ClassBusinessLogic.mapStateToProps)(Class);
