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
import ArcadixFetchData from '../../../../../../Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ArcadixFetchAndCacheData from '../../../../../../Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import Animation from '../../../../../../Framework/Controls/Animation/Animation';
import ApplicationState from '../../../../../../Framework/DataService/ApplicationState/ApplicationState';
import Paging from '../../../../../../Framework/Controls/Paging/Paging';
import Grid from '../../../../../../Framework/Blocks/GridGenerator/Grid';
function mapStateToProps(state) {
    return {
        KeyClockCurrentRows: state.ApplicationState["KeyClockCurrentRows"],
        KeyClockConfig: (state.Entity["objectgenerator"] != undefined && state.Entity["objectgenerator"]["objectgenerator;cIsDeleted;N;vObjectName;KeyClocksGrid"] != undefined) ?
            state.Entity["objectgenerator"]["objectgenerator;cIsDeleted;N;vObjectName;KeyClocksGrid"] : undefined,
        TextResource: (state.Entity["textresource"] != undefined && state.Entity["textresource"]["textresource;Id;de/Intranet/Modules/6_Members/KeyClockLogs"] != undefined) ?
            state.Entity["textresource"]["textresource;Id;de/Intranet/Modules/6_Members/KeyClockLogs"] : undefined
    };
}
var KeyClockLogs = /** @class */ (function (_super) {
    __extends(KeyClockLogs, _super);
    function KeyClockLogs(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.blnIsSearchButtonClicked = false;
        _this.objKeyClockConfig = {};
        _this.PageNumberClick = _this.PageNumberClick.bind(_this);
        _this.state = {
            iApplicationTypeId: '1',
            iMainClientId: '97',
            headerData: [],
            blnColumnConfig: false,
            blnShowAnimation: false,
            KeyClockData: [],
            iRowsPerPage: 10,
            iTotalRowCount: 0,
            iFrom: 0,
            objTextResource: {},
            objTextResourceForGrid: {},
            arrDependingTables: [],
            cIsForExternalUsers: 'N'
        };
        return _this;
    }
    KeyClockLogs.InitialDataParams = function (JConfiguration, objParams) {
        var arrDataRequest = [
            {
                "URL": "API/Framework/Blocks/ObjectGenerator/ObjectGenerator",
                "Params": {
                    "SearchKeys": {
                        "must": [
                            {
                                "match": {
                                    "cIsDeleted": "N"
                                }
                            },
                            {
                                "match": {
                                    "vObjectName": "KeyClocksGrid"
                                }
                            }
                        ]
                    }
                }
            }
        ];
        var arrResourceRequest = [
            {
                "URL": "API/Object/Blocks/TextResource/TextResource",
                "Params": {
                    "SearchKeys": {
                        "must": [
                            {
                                "match": {
                                    "Id": JConfiguration.LanguageCultureInfo + "/Intranet/Modules/6_Members/KeyClockLogs"
                                }
                            }
                        ]
                    }
                }
            }
        ];
        return { "DataCalls": arrDataRequest, "ResourceCalls": arrResourceRequest };
    };
    KeyClockLogs.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        var objInitialParams = KeyClockLogs.InitialDataParams(this.props.JConfiguration, this.props);
        if ((this.props.KeyClockCurrentRows == undefined || this.props.KeyClockCurrentRows.length == 0)
            && this.props.KeyClockConfig == undefined) 
        // && this.props.TextResource == undefined) 
        {
            objArcadixFetchAndCacheData.GetData(objInitialParams.ResourceCalls, function (objResource) {
                objArcadixFetchAndCacheData.GetData(objInitialParams.DataCalls, function (objCachedData) {
                    if (objCachedData != undefined
                        && objCachedData["objectgenerator;cIsDeleted;N;vObjectName;KeyClocksGrid"] != undefined
                        && objCachedData["objectgenerator;cIsDeleted;N;vObjectName;KeyClocksGrid"].Data != undefined
                        && objCachedData["objectgenerator;cIsDeleted;N;vObjectName;KeyClocksGrid"].Data.length > 0) {
                        _this.objKeyClockConfig = Object.assign({}, objCachedData["objectgenerator;cIsDeleted;N;vObjectName;KeyClocksGrid"].Data[0]);
                        _this.PageNumberClick(1);
                        _this.setState({
                            headerData: _this.objKeyClockConfig,
                            blnColumnConfig: true,
                            objTextResourceForGrid: objResource["textresource;Id;de/Intranet/Modules/6_Members/KeyClockLogs"]["Data"][0],
                            objTextResource: JSON.parse(objResource["textresource;Id;de/Intranet/Modules/6_Members/KeyClockLogs"]["Data"][0]["KeyClockLogs"]),
                        });
                    }
                });
            });
        }
        else if ((this.props.KeyClockCurrentRows != undefined || this.props.KeyClockCurrentRows.length == 0)
            && this.props.KeyClockConfig != undefined
            && this.props.KeyClockConfig.Data.length > 0
            && this.props.TextResource != undefined) {
            this.setState({
                headerData: this.props.KeyClockConfig.Data[0],
                blnColumnConfig: true,
                objTextResourceForGrid: this.props.TextResource.Data[0],
                objTextResource: JSON.parse(this.props.TextResource["Data"][0]["KeyClockLogs"])
            });
            this.PageNumberClick(1);
        }
    };
    KeyClockLogs.prototype.PageNumberClick = function (iStartPageNumber) {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        var objParams = {
            SearchKeys: {
                iApplicationTypeId: this.state.iApplicationTypeId,
                iMainClientId: this.state.iMainClientId,
                cIsForExternalUsers: this.state.cIsForExternalUsers,
                iFrom: this.state.iRowsPerPage * (iStartPageNumber - 1),
                iSize: this.state.iRowsPerPage
            }
        };
        ArcadixFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/GetKeyClockLogs", objParams, function (objResult) {
            if (objResult["Response"]["LoggedinUserInfo"] != undefined) {
                if (_this.blnIsSearchButtonClicked) {
                    _this.blnIsSearchButtonClicked = false;
                    _this.setState({ iFrom: 1 });
                }
                _this.setState({
                    KeyClockData: objResult["Response"]["LoggedinUserInfo"],
                    iTotalRowCount: objResult["Response"]["Count"],
                    blnShowAnimation: false
                });
                ApplicationState.SetProperty('KeyClockCurrentRows', []);
                ApplicationState.SetProperty('KeyClockCurrentRows', objResult["Response"]["LoggedinUserInfo"]);
            }
        });
    };
    KeyClockLogs.prototype.UpdateApplicatioType = function (objEvent, strParam) {
        if (strParam == "Application") {
            this.setState({
                iApplicationTypeId: objEvent.target.value
            });
        }
        else {
            this.setState({
                iMainClientId: objEvent.target.value
            });
        }
    };
    KeyClockLogs.prototype.GetKeyClockData = function () {
        this.blnIsSearchButtonClicked = true;
        this.PageNumberClick(1);
    };
    KeyClockLogs.prototype.onClickRow = function (objRowData) { };
    KeyClockLogs.prototype.onDoubleClickRow = function () { };
    KeyClockLogs.prototype.onClickIcon = function () { };
    KeyClockLogs.prototype.updateSelectedRows = function () { };
    KeyClockLogs.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation }),
            React.createElement("div", { className: "h-100" },
                (this.state.objTextResource != undefined && this.state.objTextResource != {}) &&
                    React.createElement("div", { id: "divFilterCriteria" },
                        React.createElement("table", { className: "managementTbl" },
                            React.createElement("tr", null,
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("span", { className: "Label" },
                                        this.state.objTextResource["ApplicationTypeText"],
                                        ":")),
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("select", { className: "Dropdown", onChange: function (e) { return _this.UpdateApplicatioType(e, "Application"); } },
                                        React.createElement("option", { value: 1 }, this.state.objTextResource["TeacherApplicationType"]),
                                        React.createElement("option", { value: 16 }, this.state.objTextResource["PupilApplicationType"]))),
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("span", { className: "Label" },
                                        this.state.objTextResource["MainClientText"],
                                        ":")),
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("select", { className: "Dropdown", onChange: function (e) { return _this.UpdateApplicatioType(e, "MainClient"); } },
                                        React.createElement("option", { value: 97 }, this.state.objTextResource["MainClient_97"]),
                                        React.createElement("option", { value: 115 }, this.state.objTextResource["MainClient_115"])))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("span", { className: "Label" },
                                        this.state.objTextResource["UserTypeText"],
                                        ":")),
                                React.createElement("td", null,
                                    React.createElement("select", { className: "Dropdown", onChange: function (e) { _this.setState({ cIsForExternalUsers: e["target"]["value"] }); } },
                                        React.createElement("option", { value: 'N' }, this.state.objTextResource["AllUsers"]),
                                        React.createElement("option", { value: 'Y' }, this.state.objTextResource["ExternalUsers"])))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 3 }),
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("button", { className: "btn btnOrnge saveBtn fR", onClick: function () { return _this.GetKeyClockData(); } }, this.state.objTextResource["SearchButtonText"]))))),
                (this.state.headerData != undefined && this.state.blnColumnConfig != undefined && this.props.KeyClockCurrentRows != undefined) ?
                    React.createElement(Grid, { onDragFromGrid: this.props.onDragFromGrid, header: this.state.headerData, blnColumnConfig: this.state.blnColumnConfig, rowData: this.props.KeyClockCurrentRows, onRowClick: this.onClickRow, onRowDoubleClick: this.onDoubleClickRow, loadContextMenu: this.props.loadContextMenu, onClickIcon: this.onClickIcon, updateSelectedRows: this.updateSelectedRows, MainClientLanguageData: [], objTextResource: this.state.objTextResourceForGrid, arrDependingTables: this.state.arrDependingTables, strILanguageId: this.props.JConfiguration.InterfaceLanguageId, JConfiguration: this.props.JConfiguration })
                    :
                        React.createElement("div", null),
                this.state.iTotalRowCount != 0 ?
                    React.createElement(Paging, { iRowsPerPage: this.state.iRowsPerPage, iTotalRowCount: this.state.iTotalRowCount, iFrom: this.state.iFrom, PageNumberClick: this.PageNumberClick })
                    :
                        React.createElement("div", null))));
    };
    return KeyClockLogs;
}(React.Component));
export default withRouter(connect(mapStateToProps, {})(KeyClockLogs));
//# sourceMappingURL=KeyClockLogs.js.map