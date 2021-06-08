// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as DatabaseCompare_Hook from '@shared/Application/c.ProductManagement/Modules/SoftwareEngineerSupport/DatabaseCompare/DatabaseCompare_Hook';
import DatabaseCompare_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/SoftwareEngineerSupport/DatabaseCompare/DatabaseCompare_ModuleProcessor";

//Helper classes
import Tab from '@root/Framework/Controls/Tab/Tab';

/**
  * @name DatabaseCompare
  * @param {object} props props
  * @summary This component displays the DatabaseComparision.
  * @returns {object} React.Fragement that encapsulated the display grid with DatabaseCompare details.
  */
const DatabaseCompare = props => {

   /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, DatabaseCompare_Hook.GetInitialState(props));

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, ["ModuleName"]:"DatabaseCompare", ["DatabaseCompare_ModuleProcessor"]: new DatabaseCompare_ModuleProcessor()};

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in DatabaseCompare_Hook, that contains all the custom hooks.
      * @returns null
      */
    DatabaseCompare_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.DatabaseCompare_ModuleProcessor.Initialize(objContext, objContext.DatabaseCompare_ModuleProcessor);

    /**
      * @name GetComparedTables
      * @summary Get the Compared data table informations list
      * @returns {JSX} return the compared data in JSX        
      */
    function GetComparedTables() {
        let arrData = [];
        let jsxTableDifference = <React.Fragment />;

        if (objContext.state.FirstDBTables.length != 0 && objContext.state.SecondDBTables.length != 0 && objContext.state.arrProcsFromIndianServer && objContext.state.arrProcsFromIndianServer && objContext.state.arrEditedProcedures) {
            if (!objContext.state.IsLoaded)
                objContext.DatabaseCompare_ModuleProcessor.FormatDBTableList(objContext, objContext.state.FirstDBTables, objContext.state.SecondDBTables);

            if (state.ShowDataFor == "Table only in IndianServer")
                arrData = state.FirstDBTablesDiff;
            else if (state.ShowDataFor == "Table only in Active" || state.ShowDataFor == "Table only in Staging")
                arrData = state.SecondDBTablesDiff;
            else if (state.ShowDataFor == "Column only in IndianServer")
                arrData = state.CommonFirstTable;
            else if (state.ShowDataFor == "Column Edited in IndianServer")
                arrData = state.arrTablesWithEditedColumns;
            else if (state.ShowDataFor == "Column only in Active" || state.ShowDataFor == "Table only in Staging")
                arrData = state.CommonSecondTable;
            if (objContext.state.IsLoaded) {
                if (state.ShowDataFor == "Procs only in IndianServer" || state.ShowDataFor == "Procs Edited in IndianServer") {
                    jsxTableDifference = GetJSXForNewProcs();
                }
                else {
                    jsxTableDifference =
                        <React.Fragment>
                            <div style={{ "float": "left", "margin": "10px" }}>
                                {
                                    arrData.map((objTables, index) => {
                                        return (
                                            <React.Fragment>
                                                <tr>
                                                    <td>
                                                        {
                                                            state.ShowDataFor.split(" ")[0] == "Column" ?
                                                                <span style={{ "color": "Green", "fontWeight": "600", "cursor": "pointer" }} onClick={() => {
                                                                    objContext.DatabaseCompare_ModuleProcessor.OnClickExpand(objContext, objTables.TABLE_NAME, state.ShowDataFor);
                                                                }}>&#x002B; </span>
                                                                :
                                                                <React.Fragment />
                                                        }
                                                        <span style={{ "fontWeight": "600" }}>
                                                            {objTables.TABLE_NAME}
                                                        </span> &nbsp;
                                                    <span id={state.ShowDataFor} style={{ "color": "Blue", "fontWeight": "600", "cursor": "pointer" }} onClick={() => { objContext.DatabaseCompare_ModuleProcessor.OnClickTable(event, objContext, objTables.TABLE_NAME) }}>
                                                            &#x1F5B4;
                                                    </span>
                                                    </td>
                                                </tr>
                                                {objTables.COLUMNS != undefined ?
                                                    <React.Fragment>
                                                        <div hidden={!objTables.IsShowColumn}>
                                                            {
                                                                objTables.COLUMNS.map((objColumn) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                &nbsp;
                                                                        <span> <span style={{ "color": "Gray", "fontWeight": "600", }}>ColumnName: </span>
                                                                                    <span style={{ color: "darkGreen", "fontWeight": "600" }} >{objColumn.ColumnName}</span>
                                                                                &nbsp;
                                                                    </span>
                                                                                {objColumn.DataType != undefined ?
                                                                                    <span>
                                                                                        <span style={{ "color": "Gray", "fontWeight": "600", }}>DataType: </span>
                                                                                        <span style={{ color: "darkGreen", "fontWeight": "600" }} > {objColumn.DataType}</span>
                                                                                    </span> :
                                                                                    <React.Fragment />
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </React.Fragment>
                                                    : <React.Fragment />}
                                                <br />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </React.Fragment>;
                }
                
            }
        }
        return jsxTableDifference;
    }

    function GetJSXForNewProcs() {
        let arrNewProcs;
        if (state.ShowDataFor == "Procs only in IndianServer") {
            arrNewProcs = objContext.DatabaseCompare_ModuleProcessor.GetNewProcedures(objContext);
        }
        else if (state.ShowDataFor == "Procs Edited in IndianServer"){
            arrNewProcs = objContext.state.arrEditedProcedures;
        }
         
        return <div style={{ "float": "left", "margin": "10px" }}>
            {
                arrNewProcs.map(objNewProc => {
                    return <React.Fragment><tr>
                        <td><span style={{ "color": "Green", "fontWeight": "600", "cursor": "pointer" }}>{objNewProc.vProcedureName}</span></td>
                    </tr>
                        <br />
                    </React.Fragment>
                })
            }
        </div> 
    }

    /**  
      * @name GetContent
      * @summary Get the content to display
      * @return {Jxs} jsx to view
      */
    function GetContent() {
            return (
                <React.Fragment>                    
                    <div >
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            ParentProps={{ ...props }}
                            id="DatabaseCompareFillHeight" Meta={{ HeaderIds: ["Header"], FooterIds: ["FooterTeacherLogin"], AdditionalPadding: 150 }} className="bgStyle" scrollStyle={{ overflow: "auto" }}> {/*addtional padding is used to exclude the final height */}
                                                       
                            <table cellPadding="15" cellSpacing="15">
                                <tbody>                                    
                                    <tr>
                                        <td>
                                            <span>Select DataBase : </span>
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id={"DBList_DropDown"}
                                                Meta={{
                                                    DisplayColumn: "DBName",
                                                    ValueColumn: "id",
                                                    DefaultOptionValue: - 1,
                                                    ShowDefaultOption: "true"
                                                }}
                                                Data={{ DropdownData: state.DBList, SelectedValue: objContext.state.selectdDB ? objContext.state.selectdDB["id"]: - 1 }}
                                                Resource={{
                                                    Text: {
                                                        DefaultOptionText: "Please Choose"
                                                    },
                                                    SkinPath: props.JConfiguration.IntranetSkinPath
                                                }}
                                                Events={{
                                                    OnChangeEventHandler:
                                                        (objItems, dropDownProps) => objContext.DatabaseCompare_ModuleProcessor.OnChangeDBEventHandler(objContext, objItems)
                                                }}
                                                ParentProps={{ ...props }}
                                            />                                            
                                        </td>
                                        <td hidden="true">
                                            <span>Destination Server : </span>

                                            <input id="Active" type="radio" value="Active" checked={state.IsActive} onClick={() => {
                                                objContext.DatabaseCompare_ModuleProcessor.OnClickCheckBox(objContext)
                                            }} />
                                            <span>Active</span>
                                            &nbsp;
                                            <input id="Staging" type="radio" value="Staging" checked={!state.IsActive} onClick={() => {
                                                objContext.DatabaseCompare_ModuleProcessor.OnClickCheckBox(objContext)
                                            }} />
                                            <span>Staging</span>&nbsp;
                                        </td>
                                        <td>
                                            <span style={{
                                                "borderRadius": "6"
                                            }}>
                                                <input type="button" id="DbCompare" value="Compare" onClick={() => {
                                                    objContext.DatabaseCompare_ModuleProcessor.OnClickHandler(objContext);
                                                }} />
                                            </span> 
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{ "paddingTop": "40px" }} className="addedit-ribbon">
                                <div className="nav-bar inner-content-nav" >
                                    <Tab
                                        Id="DatabaseCompare"
                                        JConfiguration={props.JConfiguration}
                                        Data={
                                            ApplicationState.GetProperty("ModuleTabData") ? ApplicationState.GetProperty("ModuleTabData").DatabaseCompare : []
                                        }
                                        Events={{
                                            OnTabClick: (objSelected) => {
                                                let strTabName = objContext.DatabaseCompare_ModuleProcessor.OnTabClick(event,objSelected);
                                                dispatch({ type: "SET_STATE", payload: { ShowDataFor: strTabName}})
                                            }
                                        }} />
                                </div>
                            </div>
                            <div style={{ "position": "absolute" }}>
                                {GetComparedTables()}
                            </div>
                        </WrapperComponent>
                    </div>
                </React.Fragment>
            )
    }

    /**
    * @summary returns JSX
    */
    return props.isLoadComplete || state.isLoadComplete  ? <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />;
    //return props.isLoadComplete || (state.isLoadComplete && objContext.state.arrProcsFromIndianServer && objContext.state.arrProcsFromIndianServer) ? <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />;
}

export default DatabaseCompare;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = DatabaseCompare_ModuleProcessor;