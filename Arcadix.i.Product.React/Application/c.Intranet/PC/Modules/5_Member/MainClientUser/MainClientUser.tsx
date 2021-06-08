import * as React from 'react';
import { Link, Route, withRouter, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import Animation from '../../../../../Framework/Controls/Animation/Animation';
import TestDriveFetchAndCacheData from '../../../../../Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';
import Grid from '../../../../../Framework/Blocks/GridGenerator/Grid';
import AddEditDeletePopup from './AddEditDelete/AddEditDeletePopup';
import ApplicationState from "../../../../../Framework/DataService/ApplicationState/ApplicationState";
var ToolBarData = require('./ToolBarMainClientUserJson/ToolBarMainClientUser.json');

function mapStateToProps(state) {
    return {
        MainClientUserData: (state.Entity["mainclientuser"] != undefined && state.Entity["mainclientuser"]["mainclientuser;cIsDeleted;N"] != undefined) ? state.Entity["mainclientuser"]["mainclientuser;cIsDeleted;N"] : undefined,
        ShowPopup: state.ApplicationState["ShowPopup"]
    };
}
class MainClientUser extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.GetMainClientUserData = this.GetMainClientUserData.bind(this);
        this.state = {
            blnShowAnimation: false,
            headerData: [],
            rowData: [],
            objSelectedRow: {},
            blnColumnConfig: false,
            MainClientLanguageData: {},
            iRowsPerPage: 10,
            ToolBarData: ToolBarData,
            arrDependingTables: [],
            objTextResource: {}
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        ApplicationState.SetProperty('toobardata', this.state.ToolBarData);
        this.GetMainClientUserData();
    }

    componentWillReceiveProps(objNewProps) {
    }

    componentWillUnmount() {
    }

    GetMainClientUserData() {
        ApplicationState.SetProperty('ShowPopup', { "Mode": "", "blnShowPopup": false });
        this.setState({ blnShowAnimation: true });
        if (this.props.MainClientUserData == undefined || this.props.MainClientUserData.Data == undefined) {
            let objTestDriveFetchAndCacheData: TestDriveFetchAndCacheData = new TestDriveFetchAndCacheData();
            var objParams = {
                "SearchKeys": {
                    "must": [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "vFirstName": {
                            "order": "asc",
                            "missing": "_last",
                            "unmapped_type": "long"
                        }
                    }
                ]
            };
            var arrRequest = [
                {
                    "URL": "API/Intranet/Modules/6_Members/MainClientUser/MainClientUser",
                    "Params": objParams
                }
            ];
            objTestDriveFetchAndCacheData.GetData(arrRequest, (objResponse) => {
                if (objResponse != undefined
                    && objResponse["mainclientuser;cIsDeleted;N"] != undefined
                    && objResponse["mainclientuser;cIsDeleted;N"].Data != undefined
                    && objResponse["mainclientuser;cIsDeleted;N"].Data.length > 0) {
                    this.setState({
                        headerData: this.GetColumns(),
                        rowData: objResponse["mainclientuser;cIsDeleted;N"].Data,
                        blnShowAnimation: false
                    });
                }
            });
        }
        else if (this.props.MainClientUserData.Data.length > 0) {
            this.setState({
                headerData: this.GetColumns(),
                rowData: this.props.MainClientUserData.Data,
                blnShowAnimation: false
            });
        }
    }

    GetColumns() {
        return [
            {
                "ValidationId": "1",
                "Data": "vFirstName",
                "DataType": "string",
                "ControlType": "label",
                "AttributeName": "First Name"
            },
            {
                "ValidationId": "1",
                "Data": "vName",
                "DataType": "string",
                "ControlType": "label",
                "AttributeName": "Name"
            },
            {
                "ValidationId": "1",
                "Data": "vEmail",
                "DataType": "string",
                "ControlType": "label",
                "AttributeName": "Email"
            },
            {
                "ValidationId": "1",
                "Data": "dtCreatedOn",
                "DataType": "date",
                "ControlType": "label",
                "AttributeName": "Created On"
            },
            {
                "ValidationId": "1",
                "Data": "dtModifiedOn",
                "DataType": "date",
                "ControlType": "label",
                "AttributeName": "Modified On"
            }
        ]
    }

    onClickRow(objRowData: any) {
    }

    onDoubleClickRow() {
    }

    onClickIcon() {
    }

    updateSelectedRows() {
    }

    render() {
        return (
            <div>
                <Animation blnShowAnimation={this.state.blnShowAnimation} />
                <div className="h-100">
                    {
                        this.state.headerData != undefined && this.state.headerData.length > 0 ?
                            <Grid onDragFromGrid={this.props.onDragFromGrid} header={this.state.headerData} blnColumnConfig={this.state.blnColumnConfig} rowData={this.state.rowData} onRowClick={this.onClickRow} onRowDoubleClick={this.onDoubleClickRow} loadContextMenu={this.props.loadContextMenu} onClickIcon={this.onClickIcon} updateSelectedRows={this.updateSelectedRows} MainClientLanguageData={this.state.MainClientLanguageData} objTextResource={this.state.objTextResource} arrDependingTables={this.state.arrDependingTables} strILanguageId={this.props.JConfiguration.InterfaceLanguageId} JConfiguration={this.props.JConfiguration}/>
                            :
                            <div></div>
                    }
                </div>
                <div>
                    {(this.props.ShowPopup != undefined && this.props.ShowPopup.blnShowPopup == true) ? <AddEditDeletePopup /> : <div></div>}
                </div>
                <Animation blnShowAnimation={this.state.blnShowAnimation} />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, {})(MainClientUser));
