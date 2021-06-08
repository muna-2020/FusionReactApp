import React, { useReducer } from "react";
import { connect } from "react-redux";
import DropDown from "@root/Framework/Controls/DropDown/DropDown/DropDown.js";
import Grid from '@root/Framework/Blocks/GridGenerator/Grid';
import * as PupilBusinessLogic from '@shared/Application/d.Extranet/2_School/Modules/ClassAndPupil/Pupil/PupilBusinessLogic';
import FillHeight from '@root/Framework/Controls/FillHeight/FillHeight';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const Pupil = (props) => {

    /**
     * @summary Provides satate and dispatch.
     */
    const [state, dispatch] = useReducer(PupilBusinessLogic.Reducer, PupilBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that makes the request for the pupil data.
     */
    PupilBusinessLogic.useDataLoaderForPupilData(objContext);

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    PupilBusinessLogic.useDataLoaded(objContext);

    let objClassData = PupilBusinessLogic.GetClassDataFromApplicationState(objContext);

    PupilBusinessLogic.useDataLoaderForSchoolPupilData(objContext);

    /**
     * returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = props.TextResource;
        let arrActivationStatusDropdownData = PupilBusinessLogic.GetActivationStatusToggleData(objContext);
        let objValidationMessagesForGrid = {
            "EmptyDataMessage": Localization.TextFormatter(objTextResource, 'EmptyDataMessage'),
            "Date": Localization.TextFormatter(objTextResource, 'Date'),
            "Email": Localization.TextFormatter(objTextResource, 'Email'),
            "Required": Localization.TextFormatter(objTextResource, 'Required')
        };
        return (
            <div className="panel-right">
                <div className="padding-top-20" id="TopHeadClassPupilRightpanel">
                    <div className="top-head">
                        <span>{Localization.TextFormatter(objTextResource, 'PupilLabel')} {objClassData && JSON.stringify(objClassData) !== "{}" ? objClassData["vClassName"] : ""}</span>
                        <div className="content-dropdown">
                            <DropDown
                                id="statusToggleDropDown"
                                Data={arrActivationStatusDropdownData}
                                JConfiguration={props.JConfiguration}
                                IsLanguageDependent="N"
                                DisplayColumn="key"
                                ValueColumn="value"
                                SelectedValue={arrActivationStatusDropdownData[0].value}
                                OnChangeEventHandler={(objItem, dropDownProps) => { PupilBusinessLogic.HandleStatusToggle(objContext, objItem) }} />
                        </div>
                    </div>
                </div>
                <FillHeight HeaderIds={["Header", "SubNavigation", "outletBand", "TopHeadClassPupilRightpanel"]} className="bgStyle" scrollStyle={{ overflow: "auto" }}>
                    <Grid
                        ColumnTextResource={objTextResource}
                        OnClickRow={(objPupil) => { PupilBusinessLogic.HandleOnClickRow(objPupil) }}
                        Header={PupilBusinessLogic.GetColumns(objContext)}
                        DropDownData={PupilBusinessLogic.GetDropdownData(objContext)}
                        RowData={state.arrPupilGridData}
                        ActionButtons={PupilBusinessLogic.GetActionButtons(objContext)}
                        HeaderButtons={PupilBusinessLogic.GetHeaderButtons(objContext, '98%', '98%', '98%', '98%')}
                        ResourceText={objValidationMessagesForGrid}
                        SaveMethod={(objSaveData) => PupilBusinessLogic.SaveMethod(objContext, objSaveData)}
                        objEditRowData={state.arrPupilGridData.length > 0 ? state.arrPupilGridData[0].cIsNew ? state.arrPupilGridData[0] : {} : {}}
                        JConfiguration={props.JConfiguration}
                        DeleteColumnName="t_TestDrive_Member_Class_Pupil.cIsDeleted"
                        DeleteNewEmptyRow={() => { PupilBusinessLogic.DeleteEmptyRow(objContext); }}
                    />
                </FillHeight>
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return (
        <React.Fragment>
            {
                objClassData && JSON.stringify(objClassData) !== "{}" && props.isLoadComplete ? state.isLoadComplete ? GetContent() : <React.Fragment></React.Fragment> : <React.Fragment></React.Fragment>}</React.Fragment>
    );
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(PupilBusinessLogic.mapStateToProps)(Pupil);