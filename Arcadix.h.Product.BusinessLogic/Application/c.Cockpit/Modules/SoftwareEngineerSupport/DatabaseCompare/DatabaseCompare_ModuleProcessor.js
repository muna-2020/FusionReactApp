//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Cockpit_SoftwareEngineerSupport_DatabaseCompare from '@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/DatabaseCompare/DatabaseCompare_Module';

/**
 * @name DatabaseCompare_ModuleProcessor
 * @summary Class for DatabaseCompare module display.
 */
class DatabaseCompare_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            //"Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefresh"
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        this.GetDestinationDbConnectionStrings(objContext);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //// Text Resource
        //let arrResourceParams = ["/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefresh"];
        //Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        //arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetDbConnectionStrings
     * @param {any} objContext
     * @param {any} objEvent
     * @summary Gets the Destination Db connection strings.
     */
    GetDestinationDbConnectionStrings(objContext) {
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.GetDbConnectionStrings({}, (objReturn) => {
            let objDbConnectionStrings = objReturn[Object.keys(objReturn)[0]] ? objReturn[Object.keys(objReturn)[0]] : {};
            objContext.dispatch({ type: "SET_STATE", payload: { objDbConnectionStrings: objDbConnectionStrings } });
        });
    }

    /**
     * @name OnChangeHandler
     * @param {any} objContext
     * @param {any} objEvent
     * @summary set the connection string state variable.
     */
    OnChangeHandler(objContext, objEvent) {
        if (objEvent.target.id == "FirstDBConnectionString")
            objContext.dispatch({ type: "SET_STATE", payload: { "FirstDBConnectionString": objEvent.target.value } });
        else if (objEvent.target.id == "SecondDBConnectionString")
            objContext.dispatch({ type: "SET_STATE", payload: { "SecondDBConnectionString": objEvent.target.value } });
    }

    /**
     * @name OnClickHandler
     * @param {any} objContext
     * @summary click handler to get Schema details
     */
    OnClickHandler(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { FirstDBTables: [] } });
        objContext.dispatch({ type: "SET_STATE", payload: { SecondDBTables: [] } });
        objContext.dispatch({ type: "SET_STATE", payload: { IsLoaded: false } });

        let strSourceConnectionstring = "";

        if (objContext.state.selectdDB && objContext.state.selectdDB.DBName != "Please Choose") {
            ApplicationState.SetProperty("blnShowAnimation", true);
            strSourceConnectionstring = objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName];
            this.GetTablesFromSchema(objContext, "FirstDBTables", strSourceConnectionstring);

            strSourceConnectionstring = objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName];
            this.GetTablesFromSchema(objContext, "SecondDBTables", strSourceConnectionstring);

            //this.GetNewProcedures(objContext);
            this.GetProcedures(objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName], "arrProcsFromIndianServer", objContext);
            this.GetProcedures(objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName], "arrProcsFromActiveServer", objContext);

            this.GetEditedProcedures(objContext);


            this.OnTabClick();
        }
        else {
            Popup.ShowErrorPopup({
                Data: {
                    Count: 2
                },
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: {
                        "ErrorPopup_ErrorText:1": "Select any database from dropdown",
                        "ErrorPopup_ErrorText:n": "Select any database from dropdown",
                        "ErrorPopup_ErrorText": "Select any database from dropdown",
                        "ErrorPopup_OkButtonText": "Okay",
                    },
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    TextResourcesKey: "ErrorPopup",
                    Variables: {
                        "ErrorVariable": "Error popup",
                        "ConfirmVariable": "CONFIRM"
                    }
                },
                Events: {},
                CallBacks: {},
            });
        }
    }

    /**
     * @name GetConnectionString
     * @param {any} strServerName
     * @param {any} strDBName
     * @summary used to get the connection string .
     * @returns {object} returns the formatted connection string
     */
    GetConnectionString(strServerName, strDBName) {
        return "server=" + strServerName + ";database=" + strDBName + ";uid=TestDriveCommon;pwd=ksdfkd933dkdk99d98d;enlist=false;";
    }

    /**
     * @name GetCommonTable
     * @param {any} objContext
     * @summary to get the common table from both the table.
     */
    GetCommonTable(arrFirstDBTables, arrSecondDBTables) {
        let arrTable = [];
        let arrColumns = [];
        arrFirstDBTables.map((objTable) => {
            arrSecondDBTables.map((objTableData) => {
                if (objTable.TABLE_NAME == objTableData.TABLE_NAME) {
                    objTable.COLUMNS.map(objColumnData => {
                        let blnColumnExists = false, blnSameDatType = true;
                        objTableData.COLUMNS.map(objSecondColumnData => {
                            if (objColumnData.COLUMN_NAME.toUpperCase() == objSecondColumnData.COLUMN_NAME.toUpperCase()) {
                                blnColumnExists = true;
                                if (objColumnData.DATA_TYPE != objSecondColumnData.DATA_TYPE) {
                                    blnSameDatType = false;
                                }
                            }
                        })
                        if (!blnColumnExists && blnSameDatType) {
                            arrColumns = [...arrColumns, { "ColumnName": objColumnData.COLUMN_NAME, "DataType": objColumnData.DATA_TYPE, ...objColumnData }];
                        }
                    })
                    if (arrColumns.length != 0) {
                        arrTable = [...arrTable, { "TABLE_NAME": objTable.TABLE_NAME, "COLUMNS": arrColumns, "IsShowColumn": false }];
                    }
                    arrColumns = [];
                }
            });
        });

        return arrTable;
    }


    /**
     * @name GetCommonTable
     * @param {any} objContext
     * @summary to get the common table from both the table.
     */
    GetEditedTable(arrFirstDBTables, arrSecondDBTables) {
        let arrTable = [];
        let arrColumns = [];
        arrFirstDBTables.map((objTable) => {
            arrSecondDBTables.map((objTableData) => {
                if (objTable.TABLE_NAME == objTableData.TABLE_NAME) {
                    objTable.COLUMNS.map(objColumnData => {
                        let blnEdited = false;
                        objTableData.COLUMNS.map(objSecondColumnData => {
                            if (objColumnData.COLUMN_NAME.toUpperCase() == objSecondColumnData.COLUMN_NAME.toUpperCase()) {
                                if (objColumnData.COLUMN_NAME.toString() != objSecondColumnData.COLUMN_NAME.toString() || objColumnData.DATA_TYPE.toString() != objSecondColumnData.DATA_TYPE.toString()) {
                                    blnEdited = true;
                                }
                            }
                        })

                        if (blnEdited) {
                            arrColumns = [...arrColumns, { "ColumnName": objColumnData.COLUMN_NAME, "DataType": objColumnData.DATA_TYPE, ...objColumnData }];
                        }
                    })
                    if (arrColumns.length != 0) {
                        arrTable = [...arrTable, { "TABLE_NAME": objTable.TABLE_NAME, "COLUMNS": arrColumns, "IsShowColumn": false }];
                    }
                    arrColumns = [];
                }
            });
        });

        return arrTable;
    }

    /**
     * @name GetDifferenceTable
     * @param {any} arrFirstTable
     * @param {any} arrSecondTable
     * @summary to Get the different tables
     */
    GetDifferenceTable(arrFirstTable, arrSecondTable) {
        let arrTable = [];
        let arrDifferenceTable = arrFirstTable.filter((objTable) => {
            let IsSame = false;
            arrSecondTable.map((objData) => {
                if (objTable.TABLE_NAME == objData.TABLE_NAME) {
                    IsSame = true;
                }
            });
            return IsSame ? false : true;
        });
        arrDifferenceTable.map((objData) => {
            arrTable = [...arrTable, { "TABLE_NAME": objData.TABLE_NAME, "IsShowColumn": false }]
        });
        return arrDifferenceTable;
    }

    /**
     * @name FormatDBTableList
     * @param {amy} objContext
     * @param {any} arrFirstDBData
     * @param {any} arrSecondDBData
     * @summary for formatting the DB list to separate common table & different table. 
     */
    FormatDBTableList(objContext, arrFirstDBData, arrSecondDBData) {
        let arrCommonFirstTable = [];
        let arrCommonSecondTable = [];
        let arrFirstDBTables = [];
        let arrSecondDBTables = [];
        let arrTablesWithEditedColumns = [];

        if (arrFirstDBData.length != 0 && arrSecondDBData.length != 0) {

            arrFirstDBTables = this.GetDifferenceTable(arrFirstDBData, arrSecondDBData);
            arrSecondDBTables = this.GetDifferenceTable(arrSecondDBData, arrFirstDBData);

            arrCommonFirstTable = this.GetCommonTable(arrFirstDBData, arrSecondDBData);
            arrCommonSecondTable = this.GetCommonTable(arrSecondDBData, arrFirstDBData);

            arrTablesWithEditedColumns = this.GetEditedTable(arrFirstDBData, arrSecondDBData);
        }

        objContext.dispatch({ type: "SET_STATE", payload: { "FirstDBTablesDiff": arrFirstDBTables } });
        objContext.dispatch({ type: "SET_STATE", payload: { "SecondDBTablesDiff": arrSecondDBTables } });
        objContext.dispatch({ type: "SET_STATE", payload: { "CommonFirstTable": arrCommonFirstTable } });
        objContext.dispatch({ type: "SET_STATE", payload: { "CommonSecondTable": arrCommonSecondTable } });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrTablesWithEditedColumns": arrTablesWithEditedColumns } });

        if (objContext.state.arrTablesWithEditedColumns) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "IsLoaded": true } });
        }
    }

    /**
     * @name OnClickExpand
     * @param {any} objContext
     * @param {any} objTableName
     * @param {any} strType
     * @summary event handler to expand the table from the list.
     */
    OnClickExpand(objContext, objTableName, strType) {
        let objModifiedTables = [];
        //let strTableName = "";
        let objPayload = {};

        if (strType == "Table only in IndianServer") {
            objModifiedTables = objContext.state.FirstDBTablesDiff;
            //strTableName = "FirstDBTablesDiff";
        }
        else if (strType == "Table only in Active" || strType == "Table only in Staging") {
            objModifiedTables = objContext.state.SecondDBTablesDiff;
            //strTableName = "SecondDBTablesDiff";
        }
        else if (strType == "Column only in IndianServer") {
            objModifiedTables = objContext.state.CommonFirstTable;
            //strTableName = "CommonFirstTable";
        }
        else if (strType == "Column only in Active" || strType == "Column only in Staging") {
            objModifiedTables = objContext.state.CommonSecondTable;
            //strTableName = "CommonSecondTable";
        }
        else if (strType == "Column Edited in IndianServer") {
            objModifiedTables = objContext.state.arrTablesWithEditedColumns;
        }


        objModifiedTables = objModifiedTables.map((objData) => {
            if (objData.TABLE_NAME == objTableName) {
                return { ...objData, IsShowColumn: !objData.IsShowColumn }
            }
            return objData;
        });

        if (strType == "Table only in IndianServer") {
            objPayload = { FirstDBTablesDiff: objModifiedTables };
        }
        else if (strType == "Table only in Active" || strType == "Table only in Staging") {
            objPayload = { SecondDBTablesDiff: objModifiedTables };
        }
        else if (strType == "Column only in IndianServer") {
            objPayload = { CommonFirstTable: objModifiedTables };
        }
        else if (strType == "Column only in Active" || strType == "Column only in Staging") {
            objPayload = { CommonSecondTable: objModifiedTables };
        }
        else if (strType == "Column Edited in IndianServer") {
            objPayload = { arrTablesWithEditedColumns: objModifiedTables };
        }


        objContext.dispatch({ type: "SET_STATE", payload: objPayload });

        //objContext.dispatch({ type: "SET_STATE", payload: { strTableName: objModifiedTables } });
    }

    /**
     * @name GetTablesFromSchema
     * @param {any} objContext
     * @param {any} strType
     * @param {any} strConnetionString
     * @summary to get the table info from schema
     */
    GetTablesFromSchema(objContext, strType, strConnetionString) {

        let objParams = {
            ["Params"]: {
                "ConnectionString": strConnetionString
            }
        };
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetTables", "POST", objParams)
            .then((objResponce) => {
                return objResponce.json();
            }).then((objJson) => {
                let objData = objJson["DatabaseCompare"].map((objTables) => { return { ...objTables, IsShowColumn: false } });
                if (strType == "FirstDBTables") {
                    objContext.dispatch({ type: "SET_STATE", payload: { FirstDBTables: objData } });
                }
                else if (strType == "SecondDBTables") {
                    objContext.dispatch({ type: "SET_STATE", payload: { SecondDBTables: objData } });
                }
            })

    }

    /**
     * @name OnChangeDBEventHandler
     * @param {any} objContext
     * @param {any} objSelectedItem
     * @summary handles the DB dropdown change.     * 
     */
    OnChangeDBEventHandler(objContext, objSelectedItem) {

        objContext.dispatch({ type: "SET_STATE", payload: { selectdDB: objSelectedItem } });
    }

    OnClickCheckBox(objContext) {

        let arrTabData = ApplicationState.GetProperty("TabData");
        let arrModifiedTab;

        if (!objContext.state.IsActive) {
            arrModifiedTab = arrTabData.map((objTabData) => {
                if (objTabData.Text.split(" ")[objTabData.Text.split(" ").length - 1] == "Staging") {
                    let strText = objTabData.Text.replace(objTabData.Text.split(" ")[objTabData.Text.split(" ").length - 1], "Active")
                    return { ...objTabData, Text: strText };
                }
                else
                    return objTabData;
            });
        }
        else {
            arrModifiedTab = arrTabData.map((objTabData) => {
                if (objTabData.Text.split(" ")[objTabData.Text.split(" ").length - 1] == "Active") {
                    let strText = objTabData.Text.replace(objTabData.Text.split(" ")[objTabData.Text.split(" ").length - 1], "Staging")
                    return { ...objTabData, Text: strText };
                }
                else
                    return objTabData;
            });
        }

        if (arrModifiedTab) {
            var objTabData = {
                TabData: arrModifiedTab
            };
            ApplicationState.SetProperty("ModuleTabData", { "DatabaseCompare": objTabData });
        }

        objContext.dispatch({ type: "SET_STATE", payload: { "FirstDBTablesDiff": [] } });
        objContext.dispatch({ type: "SET_STATE", payload: { "SecondDBTablesDiff": [] } });
        objContext.dispatch({ type: "SET_STATE", payload: { "CommonFirstTable": [] } });
        objContext.dispatch({ type: "SET_STATE", payload: { "CommonSecondTable": [] } });
        objContext.dispatch({ type: "SET_STATE", payload: { IsActive: !objContext.state.IsActive } });
    }

    /**
     * @name OnTabClick
     * @param {*} objSelectedTab objSelectedTab
     * @param {*} event event
     * @summary function to change table data on tab click and set that tab as active
     * @returns {string} returns the Item text
     */
    OnTabClick(event, objSelectedItem) {
        if (event && objSelectedItem) {
            let arrElements = Array.from(event.target.parentElement.children);
            arrElements.map((objElements) => {
                if (objElements.id.split('_')[objElements.id.split('_').length - 1] == objSelectedItem["Index"]) {
                    document.getElementById(objElements.id).style.backgroundColor = "gray";
                    document.getElementById(objElements.id).style.color = "white";
                }
                else {
                    document.getElementById(objElements.id).style.backgroundColor = "White";
                    document.getElementById(objElements.id).style.color = "gray";
                }
            })

            event.target.style.backgroundColor = "Gray";
            return objSelectedItem.Text;
        }
        else {
            let blnIsSeleted = false;
            let arrElements = Array.from(document.getElementById("DatabaseCompare_li_0").parentElement.children);

            arrElements.map((objElements) => {
                if (objElements.style.backgroundColor != "") {
                    blnIsSeleted = true
                }
            })
            if (!blnIsSeleted) {
                document.getElementById("DatabaseCompare_li_0").style.backgroundColor = "gray";
                document.getElementById("DatabaseCompare_li_0").style.color = "white";
            }
        }
    }

    /**
     * @name OnClickTable
     * @param {any} objEvent
     * @param {any} objContext
     * @param {any} strTable
     * @summary to open popup for Procedures     
     */
    OnClickTable(objEvent, objContext, strTable) {
        let strConnectionString = "";
        if (objEvent.target.id.split(" ")[objEvent.target.id.split(" ").length - 1] == "IndianServer") {
            strConnectionString = objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName];
        }
        else {
            strConnectionString = objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName];
        }
        let objParams =
        {
            'Params': {
                'ConnectionString': strConnectionString,
                'TableName': strTable
            }
        }

        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetProcedureForTable", "POST", objParams)
            .then((objResponce) => {
                return objResponce.json();
            }).then((objJson) => {
                let objData = objJson["DatabaseCompare"].map((objProcs) => { return { ...objProcs, IsShowProc: false } });
                Popup.ShowPopup({
                    Data: {
                        ModuleName: "ShowProcedure",
                        IsEdit: false,
                        ProcedureData: objData,
                        Id: objEvent.target.id.split(" ")[objEvent.target.id.split(" ").length - 1],
                        objContext: objContext
                    },
                    Meta: {
                        PopupName: "ShowProcedure",
                        ShowHeader: true,
                        ShowCloseIcon: true,
                        ShowToggleMaximizeIcon: true,
                        HeaderData: [],
                    },
                    Resource: {
                        Text: {},
                        ClientUserDetails: objContext.props.ClientUserDetails,
                        SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    },
                    Events: {
                    },
                    CallBacks: {
                    },
                });
            })

    }

    /**
     * @name OnClickProcedure
     * @param {any} objEvent
     * @param {any} objContext
     * @param {any} strTable
     * @summary to open popup for Procedures 
     */
    OnClickProcedure(objEvent, objContext, strProcName, strId) {
        let strConnectionString = "";
        if (strId == "IndianServer") {
            strConnectionString = objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName];
        }
        else {
            strConnectionString = objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName];;//check
        }
        let objParams =
        {
            'Params': {
                'ConnectionString': strConnectionString,
                'vProcName': strProcName
            }
        }

        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetProcedureDetails", "POST", objParams)
            .then((objResponce) => {
                return objResponce.json();
            }).then((objJson) => {
                let objData = objJson["DatabaseCompare"].map((objProcs) => { return { ...objProcs, IsShowProc: false } });
                Popup.ShowPopup({
                    Data: {
                        ModuleName: "ShowProcedureDefinition",
                        IsEdit: false,
                        ProcedureData: objData
                    },
                    Meta: {
                        PopupName: "ShowProcedureDefinition",
                        ShowHeader: true,
                        ShowCloseIcon: true,
                        ShowToggleMaximizeIcon: true,
                        HeaderData: [],
                    },
                    Resource: {
                        Text: {},
                        ClientUserDetails: objContext.props.ClientUserDetails,
                        SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    },
                    Events: {
                    },
                    CallBacks: {
                    },
                });
            })
    }

    /**
     * @name GetScripts
     * @param {any} objContext
     * @summary to open popup for script
     */
    GetScripts(objContext) {
        let arrData, arrScriptData = [], blnScriptForTable = false, blnScriptForProcs = false, arrProcsData = [], blnScriptForEditedProcs = false;
        if (objContext.state.ShowDataFor == "Table only in IndianServer") {
            blnScriptForTable = true;
        }
        else if (objContext.state.ShowDataFor == "Table only in Active" || objContext.state.ShowDataFor == "Table only in Staging")
            arrData = objContext.state.SecondDBTablesDiff;
        else if (objContext.state.ShowDataFor == "Column only in IndianServer") {
            arrData = objContext.state.CommonFirstTable;
            //arrData.map(obj => {
            //    let strScript = "alter table " + obj.TABLE_NAME + " add "
            //    obj.COLUMNS.map(objColumn => {
            //        strScript += objColumn.ColumnName + " ";
            //        strScript += objColumn.DataType + (objColumn.CHARACTER_MAXIMUM_LENGTH ? "(" + (objColumn.CHARACTER_MAXIMUM_LENGTH == "-1" ? "MAX" : objColumn.CHARACTER_MAXIMUM_LENGTH)  + ")" : "") + " ";
            //        strScript += (objColumn.IS_NULLABLE == "NO" ? "NOT NULL" : "") + " "; 
            //        strScript += objColumn.COLUMN_DEFAULT ? "DEFAULT " + objColumn.COLUMN_DEFAULT : "";
            //        strScript += ",";
            //    })
            //    strScript = strScript.substr(0, strScript.length - 1) ;
            //    arrScriptData = [...arrScriptData, strScript];
            //})

            arrData.map(obj => {
                let strScript = "";
                obj.COLUMNS.map(objColumn => {
                    strScript += "IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = N'" + objColumn.ColumnName + "' AND Object_ID = Object_ID(N'dbo." + obj.TABLE_NAME + "')) BEGIN ";
                    strScript += "alter table " + obj.TABLE_NAME + " add " + objColumn.ColumnName + " ";
                    strScript += objColumn.DataType + (objColumn.CHARACTER_MAXIMUM_LENGTH ? "(" + (objColumn.CHARACTER_MAXIMUM_LENGTH == "-1" ? "MAX" : objColumn.CHARACTER_MAXIMUM_LENGTH) + ")" : "") + " ";
                    strScript += (objColumn.IS_NULLABLE == "NO" ? "NOT NULL" : "") + " ";
                    strScript += objColumn.COLUMN_DEFAULT ? "DEFAULT " + objColumn.COLUMN_DEFAULT : "";
                    strScript += " END ";
                    strScript += "ELSE BEGIN alter table " + obj.TABLE_NAME + " alter COLUMN " + objColumn.ColumnName + " ";
                    strScript += objColumn.DataType + (objColumn.CHARACTER_MAXIMUM_LENGTH ? "(" + (objColumn.CHARACTER_MAXIMUM_LENGTH == "-1" ? "MAX" : objColumn.CHARACTER_MAXIMUM_LENGTH) + ")" : "") + " ";
                    strScript += (objColumn.IS_NULLABLE == "NO" ? "NOT NULL" : "") + " ";
                    strScript += objColumn.COLUMN_DEFAULT ? "DEFAULT " + objColumn.COLUMN_DEFAULT : "";
                    strScript += " END ";
                })
                //strScript = strScript.substr(0, strScript.length - 1);
                arrScriptData = [...arrScriptData, strScript];
            })
        }

        else if (objContext.state.ShowDataFor == "Column only in Active" || objContext.state.ShowDataFor == "Table only in Staging")
            arrData = objContext.state.CommonSecondTable;
        else if (objContext.state.ShowDataFor == "Procs only in IndianServer") {
            arrProcsData = this.GetNewProcedures(objContext);
            //arrScriptData = arrData ? arrData.map(obj => obj["vProcedureDefinition"]) : [];
            blnScriptForProcs = true;
        }
        else if (objContext.state.ShowDataFor == "Procs Edited in IndianServer") {
            arrProcsData = objContext.state.arrEditedProcedures;
            //arrScriptData = arrData ? arrData.map(obj => obj["vProcedureDefinition"]) : [];
            blnScriptForEditedProcs = true;
        }

        Popup.ShowPopup({
            Data: {
                ModuleName: "ShowScript",
                ScriptData: arrScriptData,
                TableData: objContext.state.FirstDBTablesDiff,
                ProcsData: arrProcsData,
                SourceConnectionString: objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName],
                DestinationConnectionString: objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName],
                ScriptForTable: blnScriptForTable,
                ScriptsForProcs: blnScriptForProcs,
                ScriptsForEditedProcs: blnScriptForEditedProcs
            },
            Meta: {
                PopupName: "ShowScript",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                HeaderData: [],
            },
            Resource: {
                Text: {},
                ClientUserDetails: objContext.props.ClientUserDetails,
                SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
            },
            Events: {
            },
            CallBacks: {
                ExecuteScript: (arrScriptData) => this.ExecuteScript(arrScriptData, objContext)
            },
        });
    }

    /**
    * @name GetScriptsForTables
    * @param {any} objContext
    * @summary to call the API to get the scripts
    */
    GetScriptsForTables(objContext) {
        let arrTableData = objContext.state.FirstDBTablesDiff;
        let objParams = {
            TableData: arrTableData,
            ConnectionString: objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName]
        }
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.GetScriptsForTables(objParams, (objReturn) => {
            //objContext.dispatch({ type: "SET_STATE", payload: { objDbConnectionStrings: objDbConnectionStrings } });
        });
    }

    /**
     * @name ExecuteScript
     * @param {any} objContext
     * @summary to call the API to execute the scripts
     */
    ExecuteScript(arrScriptData, objContext) {
        let strScriptToRun = "";
        arrScriptData.map(strScript => {
            if (strScript != "") {
                strScriptToRun += strScript + " ";
            }
        });
        let objParams = {
            ConnectionString: objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName],
            Script: strScriptToRun
        };
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.ExecuteScript(objParams, (objReturn) => {
            //objContext.dispatch({ type: "SET_STATE", payload: { objDbConnectionStrings: objDbConnectionStrings } });
        });
    }

    ///**
    // * @name GetNewProcedures
    // * @param {any} strFirstDbConnectionString
    // * @param {any} strSecondDbConnectionString
    // * @param {any} objContext
    // * @summary to call the API to get new procs
    // */
    //GetNewProcedures(objContext) {
    //    let strFirstDbConnectionString = objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName];
    //    let strSecondDbConnectionString = objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName];
    //    let strFirstDb = strFirstDbConnectionString.substr(strFirstDbConnectionString.indexOf("database="), strFirstDbConnectionString.length - 1);
    //    strFirstDb = strFirstDb.substr(0, strFirstDb.indexOf(";"));
    //    let strSecondDb = strSecondDbConnectionString.substr(strFirstDbConnectionString.indexOf("database="), strFirstDbConnectionString.length - 1);
    //    strSecondDb = strSecondDb.substr(0, strSecondDb.indexOf(";"));
    //    let objParams = {
    //        ConnectionString: objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName],
    //        strFirstDb: FirstDb,
    //        strSecondDb: SecondDb
    //    };
    //    Cockpit_SoftwareEngineerSupport_DatabaseCompare.GetNewProcedures(objParams, (objReturn) => {
    //        //objContext.dispatch({ type: "SET_STATE", payload: { objDbConnectionStrings: objDbConnectionStrings } });
    //    });
    //}

    /**
     * @name GetNewProcedures
     * @param {any} strFirstDbConnectionString
     * @param {any} strSecondDbConnectionString
     * @param {any} objContext
     * @summary to call the API to get new procs
     */
    GetProcedures(strDbConnectionString, strDbType, objContext) {
        let objParams = {
            ConnectionString: strDbConnectionString,
        };
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.GetProcedures(objParams, (objReturn) => {
            let arrProcedures = objReturn.DatabaseCompare && objReturn.DatabaseCompare.Data && objReturn.DatabaseCompare.Data.Procedures ? objReturn.DatabaseCompare.Data.Procedures : [];
            objContext.dispatch({ type: "SET_STATE", payload: { [strDbType]: arrProcedures } });
        });
    }

    /**
     * @name GetNewProcedures
     * @param {any} strFirstDbConnectionString
     * @param {any} strSecondDbConnectionString
     * @param {any} objContext
     * @summary to get the new procs
     */
    GetNewProcedures(objContext) {
        let arrNewProcs = [];
        let arrProcsFromIndianServer = objContext.state.arrProcsFromIndianServer ? objContext.state.arrProcsFromIndianServer : [];
        let arrProcsFromActiveServer = objContext.state.arrProcsFromActiveServer ? objContext.state.arrProcsFromActiveServer : [];
        arrProcsFromIndianServer.map(objProcFromIs => {
            let blnProcFromIsPresentInActive = false;
            arrProcsFromActiveServer.map(objProcFromActive => {
                if (objProcFromIs["vProcedureName"] == objProcFromActive["vProcedureName"]) {
                    blnProcFromIsPresentInActive = true;
                }
            })
            if (!blnProcFromIsPresentInActive) {
                arrNewProcs = [...arrNewProcs, objProcFromIs];
            }
        })
        //objContext.dispatch({ type: "SET_STATE", payload: { arrNewProcs: arrNewProcs } }); //For popup
        return arrNewProcs;
    }

    /**
     * @name GetEditedProcedures
     * @param {any} objContext
     * @summary to get the new procs
     */
    GetEditedProcedures(objContext) {
        let objParams = {
            ConnectionStringIndianServer: objContext.state.objDbConnectionStrings["SourceDataBase"][objContext.state.selectdDB.DBName],
            ConnectionStringActiveServer: objContext.state.objDbConnectionStrings["DestinationDataBase"][objContext.state.selectdDB.DBName]
        };
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.GetEditedProcedures(objParams, (objReturn) => {
            let arrProcedures = objReturn.DatabaseCompare && objReturn.DatabaseCompare.Data ? objReturn.DatabaseCompare.Data : [];
            objContext.dispatch({ type: "SET_STATE", payload: { arrEditedProcedures: arrProcedures } });
        });
    }

    /**
     * @name GetPrefetchFiles
     * @param {object} props props
     * @returns {object} PrefetchFiles
     */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"]
        }
    }

}

export default DatabaseCompare_ModuleProcessor