
import React, { useState, useReducer } from 'react';
import FillHeight from '@root/Framework/Controls/FillHeight/FillHeight';
import DropDown from "@root/Framework/Controls/DropDown/DropDown/DropDown.js";
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';
import * as AddPupilBusinessLogic from '@shared/application/d.extranet/2_school/modules/classandpupil/pupil/addpupilpopup/addpupilpopupbusinesslogic';
import { connect } from "react-redux";


const AddPupilPopUp = (props) => {

    const [state, dispatch] = useReducer(AddPupilBusinessLogic.Reducer, AddPupilBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    AddPupilBusinessLogic.useDataLoaderForClassChange(objContext);

    function GetContent() {
        let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil")["Data"][0]["Pupil"];
        if (!state.isInitialLoadComplete) {
            AddPupilBusinessLogic.GetPupilDisplayData(objContext);
        }
        let strClassId = "";
        let objData = {};
        if (!objContext.state.isClassChanged && objContext.props.objClassAndPupil) {
            objData = objContext.props.objClassAndPupil["SelectedClassData"];
            strClassId = objData["uClassId"];
        } else {
            strClassId = objContext.state.objSelClass.uClassId;
            objData = objContext.state.objSelClass;
        }
        let arrClassDropDownData = AddPupilBusinessLogic.GetClassDropDownData(props);
        let arrClassGroupData = DataRef(props.classgroup, "classgroup;cisdeleted;n")["Data"];
        //let strClassMessageName = objTextResource["MarkPupilMessage"].replace('{{}}', objData["vClassName"]);
        let strClassMessageName = Localization.TextFormatter(objTextResource, 'MarkPupilMessage').replace('{{}}', objData["vClassName"]);
        return (
            <div className="add-pupil-wrapper">
                <div className="add-pupil-header" id="AddPupilHeader">
                    <span>{Localization.TextFormatter(objTextResource, 'MoveLearners')}</span><br />

                    <span className="add-pupil-header-text">{strClassMessageName}</span> <br />
                    <span className="add-pupil-header-text">{Localization.TextFormatter(objTextResource, 'SelectedPupilDisplayMessage')} {state.strSelectedAllPupilName}</span>
                </div>

                <div className="search-content" id="SearchList">
                    <div className="class-dropdown">
                        <ClassDropDown
                            id="ClassDropDown"
                            Data={arrClassDropDownData}
                            DisplayColumn="vClassName"
                            ValueColumn="uClassId"
                            SelectedValue={strClassId}
                            JConfiguration={props.Data.JConfiguration}
                            ClientUserDetails={props.Data.ClientUserDetails}
                            OnChangeEventHandler={(objClass, p2) => { AddPupilBusinessLogic.OnChangeClass(objContext, objClass) }}
                        />
                    </div>
                </div>

                <FillHeight HeaderIds={[`EditorPopup_Header_Id${props.modalUId}`, "AddPupilHeader", "SearchList"]} FooterIds={["AddPupilFooter"]} ParentReference={`EditorPopupParent${props.modalUId}`} className="bgStyle" scrollStyle={{ overflow: "auto" }}> {/*addtional padding is used to exclude the final height */}
                    <table className="addpupildatapopup">
                        <tbody>
                            <tr className="table-header">
                                <td className="select-row">
                                    <label className="check-container">
                                        <input type="checkbox" value="markAll" id="markAll" onClick={(event) => { AddPupilBusinessLogic.MarkAll(objContext, event.target.checked) }} />
                                        <span className="checkmark" />
                                    </label>
                                </td>
                                <td className="filter-content-byname">
                                    <div className="filter-content-byname-container">
                                        <label>{Localization.TextFormatter(objTextResource, 'Name')}</label>
                                        <span onClick={() => { AddPupilBusinessLogic.Sort(objContext, 'vName', 'isNameAscending') }} className={state.isNameAscending ? "triangle-arrow triangle-arrow-up" : "triangle-arrow triangle-arrow-down"}></span>
                                        <input type="text" value={state.strSearchName} name="strSearchName" onChange={(event) => { AddPupilBusinessLogic.OnChangeSearchBox(objContext, event) }} />
                                        <button className="searhby-img-container" >
                                            {state.showNameSearchIcon ? <img src={
                                                props.JConfiguration.ExtranetSkinPath +
                                                "/Images/Common/Icons/Search.svg"
                                            } alt="" onClick={() => { AddPupilBusinessLogic.Search(objContext, 'vName', state.strSearchName, 'showNameSearchIcon') }} /> : <img src={
                                                props.JConfiguration.ExtranetSkinPath +
                                                "/Images/Common/Icons/close.png"
                                            } alt="" onClick={() => { AddPupilBusinessLogic.Close(objContext) }} />}
                                        </button>
                                    </div>
                                </td>
                                <td className="filter-content-byname">
                                    <div className="filter-content-byname-container">
                                        <label>{Localization.TextFormatter(objTextResource, 'FirstName')}</label>
                                        <span onClick={() => { AddPupilBusinessLogic.Sort(objContext, 'vFirstName', 'isFirstNameAscending') }} className={state.isFirstNameAscending ? "triangle-arrow triangle-arrow-up" : "triangle-arrow triangle-arrow-down"}></span>
                                        <input type="text" value={state.strSearchFirstName} name="strSearchFirstName" onChange={(event) => { AddPupilBusinessLogic.OnChangeSearchBox(objContext, event) }} />
                                        <button className="searhby-img-container">
                                            {state.showFirstNameSearchIcon ? <img src={
                                                props.JConfiguration.ExtranetSkinPath +
                                                "/Images/Common/Icons/Search.svg"
                                            } alt="" onClick={() => { AddPupilBusinessLogic.Search(objContext, 'vFirstName', state.strSearchFirstName, 'showFirstNameSearchIcon') }} /> : <img src={
                                                props.JConfiguration.ExtranetSkinPath +
                                                "/Images/Common/Icons/close.png"
                                            } alt="" onClick={() => { AddPupilBusinessLogic.Close(objContext) }} />}
                                        </button>
                                    </div>
                                </td>
                                <td>Gruppe</td>
                            </tr>
                            {GetDisplayElements()}
                        </tbody>
                    </table>
                </FillHeight>

                <div className="add-pupil-footer" id="AddPupilFooter">
                    <div className="add-pupil-footer-bottom"></div>
                    <div className="error-add-pupil-footer add-pupil-footer-bottom">
                        <div className="error-add-pupil-footer-text">
                            {state.showValidationMessage ? <React.Fragment> <img src={
                                props.JConfiguration.ExtranetSkinPath +
                                "/Images/Common/Icons/exclamation_mark.svg"
                            } alt="" />
                                {Localization.TextFormatter(objTextResource, 'NoStudentsMarked')}</React.Fragment> : ''}
                        </div>
                    </div>
                    <div className="add-pupil-footer-button-wapper">
                        <div className="button brown-button" onClick={e => props.closePopUp(props.objModal)}>{Localization.TextFormatter(objTextResource, 'Cancel')}</div>
                        <div className="button brown-button" onClick={e => AddPupilBusinessLogic.Save(objContext, true)}>{Localization.TextFormatter(objTextResource, 'SaveButtonText')}</div>
                        <div className="button brown-button" onClick={e => AddPupilBusinessLogic.Save(objContext)}>{Localization.TextFormatter(objTextResource, 'SaveAndAllocate')}</div>
                    </div>
                </div>

            </div>
        );


        function GetDisplayElements() {
            if (state.arrPupilDisplayData && state.arrPupilDisplayData.length > 0) {
                let arrElements = state.arrPupilDisplayData.map(ppl => {
                    return (
                        <tr>
                            <td className="select-row">
                                <label className="check-container">
                                    <input type="checkbox" name={ppl.uPupilId} checked={ppl.isSelected} value={ppl.uPupilId} onChange={OnClickCheckBox} />
                                    <span className="checkmark" />
                                </label>
                            </td>
                            <td>{ppl.vName}</td>
                            <td>{ppl.vFirstName}</td>
                            <td>
                                <div className="dropdown-row-data">
                                    <DropDown
                                        Data={arrClassGroupData}
                                        DependingTableName="t_TestDrive_Member_Class_Group_Data"
                                        IsLanguageDependent="Y"
                                        DisplayColumn="vGroupName"
                                        ValueColumn="uClassGroupId"
                                        JConfiguration={props.JConfiguration}
                                        OnChangeEventHandler={(objGroup, p2) => { AddPupilBusinessLogic.OnChangeClassGroup(objContext, objGroup, ppl) }} />
                                </div>
                            </td>
                        </tr>
                    )
                })
                return arrElements;
            }
        }

        function OnClickCheckBox(event) {
            let arrPupilDisplayData = state.arrPupilDisplayData.map(ppl => {
                if (event.target.value == ppl.uPupilId)
                    return {
                        ...ppl,
                        isSelected: event.target.checked
                    }
                else
                    return {
                        ...ppl
                    }
            });
            let unChecked = arrPupilDisplayData.find(x => x.isSelected == false);
            var markAllElement = document.getElementById("markAll");
            if (unChecked == undefined) {
                markAllElement.checked = true;
            }
            if (unChecked != undefined) {
                markAllElement.checked = false;
            }

            let strName = AddPupilBusinessLogic.GetSelectedPupilNameString(arrPupilDisplayData);
            dispatch({ type: 'SET_STATE_VALUES', payload: { arrPupilDisplayData: arrPupilDisplayData, strSelectedAllPupilName: strName, showValidationMessage: false } });
        }        
    }

    return (GetContent())

};

/**
 * @summary used by SSR.
 */
AddPupilPopUp.InitialDataParams = (JConfiguration, props) => {
    return AddPupilBusinessLogic.InitialDataParams(JConfiguration, props);
};

AddPupilPopUp.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/AddPupilPopUp.css"
    ];
    return arrStyles;
};

export default connect(AddPupilBusinessLogic.mapStateToProps)(AddPupilPopUp);