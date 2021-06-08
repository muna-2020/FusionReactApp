// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import * as Dropdown_Sample_Hook from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Controls/Dropdowns/Dropdown_Sample/Dropdown_Sample_Hook';
import Dropdown_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Controls/Dropdowns/Dropdown_Sample/Dropdown_Sample_ModuleProcessor';
import Dropdown from "@root/Framework/Controls_New/Dropdowns/Dropdown/Dropdown"; 

const Dropdown_Sample = props => {
    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Dropdown_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Dropdown_Sample_ModuleProcessor"]: new Dropdown_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    Dropdown_Sample_Hook.useDataLoaded(objContext);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div>Dropdown_Sample</div>
                <Dropdown
                    Meta={props.Meta}
                    Data={props.Data}
                    Resource={props.Resource.ImgPath}
                    Events={objContext.Dropdown_Sample_ModuleProcessor.GetEvents()}
                    ParentProps={{ "JConfiguration": props.JConfiguration }}
                />
            </React.Fragment>
        );
    };

    return state.isLoadComplete ? GetContent() :<React.Fragment />;
};

export default connect(Dropdown_Sample_ModuleProcessor.GetStoreData())(Dropdown_Sample);



//<DropDown
//    Data={arrData}
//    DisplayColumn="name" ValueColumn="id"
//    SelectedValue={"2"}
//    OnChangeEventHandler={(objItem) => { OnChangeEventHandler(objItem); }}
//    JConfiguration={props.JConfiguration}
//    ShowDefaultOption={true}
//    DefaultOptionText="Please Select"
//    DefaultOptionValue={-1}
//    CheckDeletedDropDownData={CheckDeletedDropDownData}
//    ImgPath='/Images/Common/Icons/angle_down.svg'
///>
//& nbsp;
//<DropDown
//    Data={arrMultiLanguageData}
//    DisplayColumn="vSubjectName"
//    ValueColumn="iSubjectId"
//    SelectedValue={"2418"}
//    IsLanguageDependent="Y"
//    DependingTableName="t_TestDrive_Subject_Data"
//    OnChangeEventHandler={(objItem) => { OnChangeEventHandler(objItem); }}
//    JConfiguration={props.JConfiguration}
//    ShowDefaultOption={true}
//    DefaultOptionText="Please Select"
//    DefaultOptionValue={-1}
//    CheckDeletedDropDownData={CheckDeletedDropDownData}
//    ImgPath='/Images/Common/Icons/angle_down.svg'
///>
//    <br />