//React related imports
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddPupilPopUp_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/AddPupilPopUp/AddPupilPopUp_Hook';
import AddPupilPopUp_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/AddPupilPopUp/AddPupilPopUp_ModuleProcessor";

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/exclamation_mark.svg?inline';
import imgSearch from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/AddPupilPopUp/Search.svg?inline';

/**
* @name AddPupilPopUp
* @param {any} props props
* @summary This component consists of AddPupilPopUp component.
* @returns {*} jsx
*/
const AddPupilPopUp = (props) => {

    const markAllRef = useRef(null);

    /**
    * @name Initializing Reducer
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, AddPupilPopUp_Hook.GetInitialState(props));

    /**
    * @name Assigning objContext
    * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
    */
    let objContext = {
        state, props, dispatch, ["ModuleName"]: "AddPupilPopUp", ["AddPupilPopUp_ModuleProcessor"]: new AddPupilPopUp_ModuleProcessor()
    };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.AddPupilPopUp_ModuleProcessor.Initialize(objContext, objContext.AddPupilPopUp_ModuleProcessor);

    /**
    * @name Initialize
    * @summary Initialize Custom hooks
    */
    AddPupilPopUp_Hook.Initialize(objContext);

    /**
    * @name GetDisplayElements
    * @param {any} arrClassGroupData arrClassGroupData
    * @summary This function returns each pupil row data
    * @returns {*} tr element 
    */
    function GetDisplayElements(arrClassGroupData) {
        if (state.arrPupilDisplayData && state.arrPupilDisplayData.length > 0) {
            let arrElements = state.arrPupilDisplayData.map(ppl => {
                let objDropdownData = {
                    DropdownData: arrClassGroupData,
                    SelectedValue: ppl.selectedClassGroup ? ppl.selectedClassGroup : arrClassGroupData[0].uClassGroupId//objContext.state.strFilterStatus ? objContext.state.strFilterStatus : "All"
                };
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
                                <PerformanceProfiler ComponentName={"AddPupilPopUp_ClassGroupDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"AddPupilPopUp_ClassGroupDropdown"}
                                        Data={objDropdownData}
                                        Meta={objContext.AddPupilPopUp_ModuleProcessor.GetMetaDataClassGroupDropdown()}
                                        Resource={objContext.AddPupilPopUp_ModuleProcessor.GetResourceDataClassDropdown()}
                                        Events={objContext.AddPupilPopUp_ModuleProcessor.GetEventsDataClassGroupDropdown(objContext,ppl)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div> 
                        </td>
                    </tr>
                );
            });
            return arrElements;
        }
    }

    /**
    * @name OnChangeClass
    * @param {any} objContext objContext
    * @param {any} objClass objClass
    * @summary OnChangeClass function is called on every dropdown change,here the common checkbox is checkedout on every dropdown change and states are set
    */
    function OnChangeClass(objContext, objClass) {
        let arrPupilDisplayData = state.arrPupilDisplayData.map(ppl => {
            if (event.target.value == ppl.uPupilId)
                return {
                    ...ppl,
                    isSelected: event.target.checked
                };
            else
                return {
                    ...ppl
                };
        });
        let unChecked = arrPupilDisplayData.find(x => x.isSelected == false);
        var markAllElement = markAllRef.current; //document.getElementById("markAll");
        if (unChecked == undefined || unChecked != undefined) {
            markAllElement.checked = false;
        }
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                objSelClass: objClass,
                isClassChanged: true,
                isInitialLoadComplete: false,
                strSelectedAllPupilName: ''
            }
        });
    }

    /**
    * @name OnClickCheckBox
    * @param {any} event event
    * @summary This function is called on every click in the table checkboxes
    */
    function OnClickCheckBox(event) {
        let arrPupilDisplayData = state.arrPupilDisplayData.map(ppl => {
            if (event.target.value == ppl.uPupilId)
                return {
                    ...ppl,
                    isSelected: event.target.checked
                };
            else
                return {
                    ...ppl
                };
        });
        let unChecked = arrPupilDisplayData.find(x => x.isSelected == false);
        var markAllElement = markAllRef.current; //document.getElementById("markAll");
        if (unChecked == undefined) {
            markAllElement.checked = true;
        }
        if (unChecked !== undefined) {
            markAllElement.checked = false;
        }
        let strName = objContext.AddPupilPopUp_ModuleProcessor.GetSelectedPupilNameString(arrPupilDisplayData);
        dispatch({ type: 'SET_STATE', payload: { arrPupilDisplayData: arrPupilDisplayData, strSelectedAllPupilName: strName, showValidationMessage: false } });
    }        

    /**
    * @name GetEventsDataClassDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
    */
    function GetEventsDataClassDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => OnChangeClass(objContext, objItem)
        };
    }

    /**
    * @name GetContent
    * @summary Returns the required jsx for component
    * @returns {*} jsx
    */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        if (!state.isInitialLoadComplete) {
            objContext.AddPupilPopUp_ModuleProcessor.GetPupilDisplayData(objContext);
        }
        let strClassId = "";
        let objData = {};
        if (!state.isClassChanged && props.ClassAndPupil) {
            objData = props.ClassAndPupil["SelectedClassData"];
            strClassId = objData["uClassId"];
        } else {
            strClassId = state.objSelClass.uClassId;
            objData = state.objSelClass;
        }
        let arrClassDropDownData = objContext.AddPupilPopUp_ModuleProcessor.GetClassDropDownData(objContext);
        let arrClassGroupData = DataRef(props.Object_Extranet_Teacher_ClassGroup, "Object_Extranet_Teacher_ClassGroup;cIsDeleted;N")["Data"];
        let strClassMessageName = Localization.TextFormatter(objTextResource, 'MarkPupilMessage').replace('{{}}', objData["vClassName"]);
        let objTeacherDropdown = {
            DropdownData: arrClassDropDownData,
            SelectedValue: strClassId
        };
        return (
            <div className="add-pupil-wrapper">
                <div className="add-pupil-header" id="AddPupilHeader">
                    <span>{Localization.TextFormatter(objTextResource, 'AddPupilHeaderText')}</span><br />
                    <span className="add-pupil-header-text">{strClassMessageName}</span> <br />
                    <span className="add-pupil-header-text">{Localization.TextFormatter(objTextResource, 'SelectedPupilDisplayMessage')} {state.strSelectedAllPupilName}</span>
                </div>

                <div className="search-content" id="SearchList">
                    <div className="class-dropdown"> 
                        <PerformanceProfiler ComponentName={"AddPupilPopUp_ClassDropDown"} JConfiguration={props.JConfiguration} >
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="AddPupilPopUp_ClassDropDown"
                                Meta={objContext.AddPupilPopUp_ModuleProcessor.GetMetaDataClassDropdown()}
                                Data={objTeacherDropdown}
                                Resource={objContext.AddPupilPopUp_ModuleProcessor.GetResourceDataClassDropdown()}
                                Events={GetEventsDataClassDropdown(objContext)}
                                ParentProps={{ ...props }}
                            />
                        </PerformanceProfiler>
                    </div>
                </div>

                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="FillHeightAddPupilPopUp" Meta={objContext.AddPupilPopUp_ModuleProcessor.GetMetaDataFillheightAddPupilPopUp(objContext)} ParentProps={{ ...props }}> {/*addtional padding is used to exclude the final height */}
                    <table className="addpupildatapopup">
                        <tbody>
                            <tr className="table-header">
                                <td className="select-row">
                                    <label className="check-container">
                                        <input type="checkbox" value="markAll" id="markAll" ref={markAllRef} onClick={(event) => { objContext.AddPupilPopUp_ModuleProcessor.MarkAll(objContext, event.target.checked); }} />
                                        <span className="checkmark" />
                                    </label>
                                </td>
                                <td className="filter-content-byname">
                                    <div className="filter-content-byname-container">
                                        <label>{Localization.TextFormatter(objTextResource, 'Name')}</label>
                                        <span onClick={() => { objContext.AddPupilPopUp_ModuleProcessor.Sort(objContext, 'vName', 'isNameAscending'); }} className={state.isNameAscending ? "triangle-arrow triangle-arrow-up" : "triangle-arrow triangle-arrow-down"}/>
                                        <input type="text" value={state.strSearchName} name="strSearchName" onChange={(event) => { objContext.AddPupilPopUp_ModuleProcessor.OnChangeSearchBox(objContext, event); }} />
                                        <button className="searhby-img-container" >
                                            {state.showNameSearchIcon ? <img src={imgSearch} onClick={() => { objContext.AddPupilPopUp_ModuleProcessor.Search(objContext, 'vName', state.strSearchName, 'showNameSearchIcon'); }} /> :
                                                <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/close.png"} onClick={() => { objContext.AddPupilPopUp_ModuleProcessor.Close(objContext); }} />}
                                        </button>
                                    </div>
                                </td>
                                <td className="filter-content-byname">
                                    <div className="filter-content-byname-container">
                                        <label>{Localization.TextFormatter(objTextResource, 'FirstName')}</label>
                                        <span onClick={() => { objContext.AddPupilPopUp_ModuleProcessor.Sort(objContext, 'vFirstName', 'isFirstNameAscending'); }} className={state.isFirstNameAscending ? "triangle-arrow triangle-arrow-up" : "triangle-arrow triangle-arrow-down"}/>
                                        <input type="text" value={state.strSearchFirstName} name="strSearchFirstName" onChange={(event) => { objContext.AddPupilPopUp_ModuleProcessor.OnChangeSearchBox(objContext, event); }} />
                                        <button className="searhby-img-container">
                                            {state.showFirstNameSearchIcon ? <img src={imgSearch} onClick={() => { objContext.AddPupilPopUp_ModuleProcessor.Search(objContext, 'vFirstName', state.strSearchFirstName, 'showFirstNameSearchIcon'); }} /> :
                                                <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/close.png"} onClick={() => { objContext.AddPupilPopUp_ModuleProcessor.Close(objContext); }} />}
                                        </button>
                                    </div>
                                </td>
                                <td>Gruppe</td>
                            </tr>
                            {GetDisplayElements(arrClassGroupData)}
                        </tbody>
                    </table>
                </WrapperComponent>

                <div className="add-pupil-footer" id="AddPupilFooter">
                    <div className="add-pupil-footer-bottom"/>
                    <div className="error-add-pupil-footer add-pupil-footer-bottom">
                        <div className="error-add-pupil-footer-text">
                            {state.showValidationMessage ? <React.Fragment> <img src={ExclamationMarkImage} />
                                {Localization.TextFormatter(objTextResource, 'NoStudentsMarked')}</React.Fragment> : ''}
                        </div>
                    </div>
                    <div className="add-pupil-footer-button-wapper">
                        <div className="button brown-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Cancel')}</div>
                        <div className="button brown-button" onClick={e => objContext.AddPupilPopUp_ModuleProcessor.Save(objContext)}>{Localization.TextFormatter(objTextResource, 'SaveButtonText')}</div>
                        <div className="button brown-button" onClick={e => objContext.AddPupilPopUp_ModuleProcessor.Save(objContext, true)}>{Localization.TextFormatter(objTextResource, 'SaveAndAllocate')}</div>
                    </div>
                </div>

            </div>
        );
    }

    return GetContent();
};

export default connect(ExtranetBase_Hook.MapStoreToProps(AddPupilPopUp_ModuleProcessor.StoreMapList()))(AddPupilPopUp);