// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related files.
import * as ExceptionLogView_Hook from '@shared/Application/c.Cockpit/Modules/SystemPerformance/ExceptionLogView/ExceptionLogView_Hook';
import ExceptionLogView_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/SystemPerformance/ExceptionLogView/ExceptionLogView_ModuleProcessor";
import * as ExceptionLogView_Tab from "@shared/Application/c.Cockpit/Modules/SystemPerformance/ExceptionLogView/ExceptionLogView_Tab";

//Helper classes.
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";
import Tab from '@root/Framework/Controls/Tab/Tab';

//Components used in module.
import DisplayGrid from '@root/Framework/Blocks/Grid/Grid';

/**
 * @name ExceptionLogView
 * @param {object} props props
 * @summary This component displays the ExceptionLogView data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ExceptionLogView details.
 */
const ExceptionLogView = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, ExceptionLogView_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ExceptionLogView_ModuleProcessor"]: new ExceptionLogView_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ExceptionLogView_ModuleProcessor.InitializeDataForSSR(props, objContext.ExceptionLogView_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ExceptionLogView_Hook, that contains all the custom hooks.
     * @returns null
     */
    ExceptionLogView_Hook.Initialize(objContext);

    /**
     * @param {object} objContext takes objContext
     * @summary UseEffect to be executed whenever ExceptionLogView updates
     */
    ExceptionLogView_Tab.useInitializeModuleTabData(objContext);

    /**
     * @summary JSX MainClientDropDown
     * @returns {jsx} JSX
     */
    const GetMainClientDropDown = (objTextResource) => {
        return (
            <DropDown
                Data={state.arrMainClient}
                DisplayColumn="vMainClientName"
                IsLanguageDependent="Y"
                ValueColumn="iMainClientId"
                DependingTableName="t_Framework_MainClient_Data"
                SelectedValue={state.objData.iMainClientId != -1 ? state.objData.iMainClientId:-1}
                OnChangeEventHandler={(objChangeData, props) => objContext.ExceptionLogView_ModuleProcessor.OnMainClientDropDownChange(objChangeData, props, objContext)}
                ShowDefaultOption={true}  //if want any default option to be displayed
                DefaultOptionText={objTextResource["PleaseChoose"]}
                DefaultOptionValue={-1}
                JConfiguration={props.JConfiguration}
                ObjContext={objContext}
                CheckDeletedDropDownData={objContext.ExceptionLogView_ModuleProcessor.CreateItemEventHandler}
            />
        );
    };

    /**
     * @summary JSX ApplicationTypeDropDown
     * @returns {jsx} JSX
     */
    const GetApplicationTypeDropDown = (objTextResource) => {
        return (
            <DropDown
                Data={state.arrApplicationType}
                DisplayColumn="vApplicationTypeName"
                IsLanguageDependent="Y"
                ValueColumn="iApplicationTypeId"
                DependingTableName="t_Framework_ApplicationType_Data"
                SelectedValue={state.objData.iApplicationTypeId != -1 ? state.objData.iApplicationTypeId : -1}
                OnChangeEventHandler={(objChangeData, props) => objContext.ExceptionLogView_ModuleProcessor.OnApplicationTypeDropDownChange(objChangeData, props, objContext)}
                ShowDefaultOption={true}  //if want any default option to be displayed
                DefaultOptionText={objTextResource["All"]}
                DefaultOptionValue={-1}
                JConfiguration={props.JConfiguration}
                ObjContext={objContext}
                CheckDeletedDropDownData={objContext.ExceptionLogView_ModuleProcessor.CreateItemEventHandler}
            />
        );
    };

    /**
     * @summary JSX HourDropDown
     * @returns {jsx} JSX
     */
    const GetHourDropDown = () => {
        return (
            <DropDown
                Data={state.arrHourDropDownData}
                DisplayColumn="value"
                ValueColumn="id"
                SelectedValue={state.strHour ? state.strHour:-1}
                OnChangeEventHandler={(objChangeData, props) => objContext.ExceptionLogView_ModuleProcessor.OnHourDropDownChange(objChangeData, props, objContext)}
                JConfiguration={props.JConfiguration}
                ObjContext={objContext}
            />
        );
    };

    /**
     * @summary JSX to GetRadioButtons
     * @returns {jsx} JSX
     */
    const GetRadioButtons = () => {        
        return <div className="plog-radio-flex">
                    <div className="plog-radio-item">
                        <span>Db</span>
                        <label className="plog-radio">
                    <input type="radio" checked={state.blnDbData} onChange={() => objContext.ExceptionLogView_ModuleProcessor.SetBlnDbOrRedis(objContext,true )} />
                        <span className="checkmark" />
                        </label>
                    </div>
                    <div className="plog-radio-item">
                        <span>Redis</span>
                        <label className="plog-radio">
                    <input type="radio" checked={!state.blnDbData} onChange={() => objContext.ExceptionLogView_ModuleProcessor.SetBlnDbOrRedis(objContext, false)} />
                        <span className="checkmark" />
                        </label>
            </div>
               </div>                
    }

    /**
     * @summary JSX to GetFilterForDb
     * @returns {jsx} JSX
     */
    const GetFilterForDb = (objTextResource) => {
       return <div className="filter" id="filterHeader">
            <div className="filter-block">

                <span className="filter-label">{objTextResource["SelectMainClient"]}</span>
               {GetMainClientDropDown(objTextResource)}

            </div>
            <div className="filter-block">
                <span className="filter-label">{objTextResource["SelectApplicationType"]}</span>
               {GetApplicationTypeDropDown(objTextResource)}
            </div>
            <div className="filter-block">
               <span className="filter-label">{objTextResource["FromDate"]}</span>
                <input
                    className={"text-input"}
                    id="dtFromDate"
                    type="text"
                    onChange={(e) => {
                        objContext.ExceptionLogView_ModuleProcessor.HandleChange("dtFromDate", e.target.value, objContext);
                    }}
                    value={state.objData["dtFromDate"]}
                />

            </div>
            <div className="filter-block">
                <span className="filter-label">{objTextResource["ToDate"]}</span>
                <input
                    className={"text-input"}
                    id="dtToDate"
                    type="text"
                    onChange={(e) => {
                        objContext.ExceptionLogView_ModuleProcessor.HandleChange("dtToDate", e.target.value, objContext);
                    }}
                    value={state.objData["dtToDate"]}
                />
            </div>
            <button className="btn"
                onClick={() => objContext.ExceptionLogView_ModuleProcessor.Search(objContext)}
            >{objTextResource["Search"]}</button>
        </div>
    }

    /**
     * @summary JSX to GetFilterForRedis
     * @returns {jsx} JSX
     */
    const GetFilterForRedis = (objTextResource) => {
        return <div className="filter" id="filterHeader">
            <div className="filter-block">

                <span className="filter-label">{objTextResource["SelectMainClient"]}</span>
                {GetMainClientDropDown(objTextResource)}

            </div>
            <div className="filter-block">
                <span className="filter-label">{objTextResource["SelectHour"]}</span>
                {GetHourDropDown()}
            </div>
            
        </div>
    }
    
    /**
     * @summary JSX for ExceptionLogView
     * @returns {*} dom 
     */
    function GetContent() {
        let iApplicationTypeForLanguageData = 7;
        let objLanguageData = objContext.ExceptionLogView_ModuleProcessor.GetMultiLanguageData(props.Object_Cockpit_MainClient_MainClientLanguage["Data"], props.Object_Cockpit_Language["Data"], iApplicationTypeForLanguageData);
        var objTextResource = objContext.props.Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ExceptionLogView", props);

        return (
            <div>
                <div className="addedit-ribbon ">
                    <div className="nav-bar inner-content-nav">
                        <Tab JConfiguration={props.JConfiguration} TabType={"Module"} ModuleName={"ExceptionLogView"} IsModule={"true"} OnTabClick={(objSelected) => objContext.ExceptionLogView_ModuleProcessor.OnTabClick(objSelected, objContext)} />
                    </div>
                </div>
                <div className="subject-container">
                    {GetRadioButtons()}
                    {state.blnDbData ? GetFilterForDb(objTextResource) : GetFilterForRedis(objTextResource)}
                </div>
                {state.blnDbData ? 
                    <DisplayGrid
                        RowData={state.arrExceptionLogView}
                        Header={objContext.ExceptionLogView_ModuleProcessor.GetMetaData(objContext)}
                        ResourceText={objTextResource["EmptyMessage"]}
                        ColumnTextResource={objTextResource}
                        JConfiguration={props.JConfiguration}
                        LanguageData={objLanguageData}
                        AdditionalPaddingIds={["TabList"]}
                    />
                    :
                    <React.Fragment />
                }
                
            </div>

        );
    }

    /**
     * @summary returns Jsx.
     */
    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
};

export default connect(CockpitBase_Hook.MapStoreToProps(ExceptionLogView_ModuleProcessor.StoreMapList()))(ExceptionLogView);

