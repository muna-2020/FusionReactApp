var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Animation from '../../../../../Framework/Controls/Animation/Animation';
import ArcadixFetchAndCacheData from '../../../../../Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
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
var MainClientUser = /** @class */ (function (_super) {
    __extends(MainClientUser, _super);
    function MainClientUser(props) {
        var _this = _super.call(this, props) || this;
        _this.GetMainClientUserData = _this.GetMainClientUserData.bind(_this);
        _this.state = {
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
        };
        return _this;
    }
    MainClientUser.prototype.componentWillMount = function () {
    };
    MainClientUser.prototype.componentDidMount = function () {
        ApplicationState.SetProperty('toobardata', this.state.ToolBarData);
        this.GetMainClientUserData();
    };
    MainClientUser.prototype.componentWillReceiveProps = function (objNewProps) {
    };
    MainClientUser.prototype.componentWillUnmount = function () {
    };
    MainClientUser.prototype.GetMainClientUserData = function () {
        var _this = this;
        ApplicationState.SetProperty('ShowPopup', { "Mode": "", "blnShowPopup": false });
        this.setState({ blnShowAnimation: true });
        if (this.props.MainClientUserData == undefined || this.props.MainClientUserData.Data == undefined) {
            var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
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
            objArcadixFetchAndCacheData.GetData(arrRequest, function (objResponse) {
                if (objResponse != undefined
                    && objResponse["mainclientuser;cIsDeleted;N"] != undefined
                    && objResponse["mainclientuser;cIsDeleted;N"].Data != undefined
                    && objResponse["mainclientuser;cIsDeleted;N"].Data.length > 0) {
                    _this.setState({
                        headerData: _this.GetColumns(),
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
    };
    MainClientUser.prototype.GetColumns = function () {
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
        ];
    };
    MainClientUser.prototype.onClickRow = function (objRowData) {
    };
    MainClientUser.prototype.onDoubleClickRow = function () {
    };
    MainClientUser.prototype.onClickIcon = function () {
    };
    MainClientUser.prototype.updateSelectedRows = function () {
    };
    MainClientUser.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation }),
            React.createElement("div", { className: "h-100" }, this.state.headerData != undefined && this.state.headerData.length > 0 ?
                React.createElement(Grid, { onDragFromGrid: this.props.onDragFromGrid, header: this.state.headerData, blnColumnConfig: this.state.blnColumnConfig, rowData: this.state.rowData, onRowClick: this.onClickRow, onRowDoubleClick: this.onDoubleClickRow, loadContextMenu: this.props.loadContextMenu, onClickIcon: this.onClickIcon, updateSelectedRows: this.updateSelectedRows, MainClientLanguageData: this.state.MainClientLanguageData, objTextResource: this.state.objTextResource, arrDependingTables: this.state.arrDependingTables, strILanguageId: this.props.JConfiguration.InterfaceLanguageId, JConfiguration: this.props.JConfiguration })
                :
                    React.createElement("div", null)),
            React.createElement("div", null, (this.props.ShowPopup != undefined && this.props.ShowPopup.blnShowPopup == true) ? React.createElement(AddEditDeletePopup, null) : React.createElement("div", null)),
            React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation })));
    };
    return MainClientUser;
}(React.Component));
export default withRouter(connect(mapStateToProps, {})(MainClientUser));
//# sourceMappingURL=MainClientUser.js.map