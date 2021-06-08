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
import Paging from '../../../../../../Framework/Controls/Paging/Paging';
import Grid from '../../../../../../Framework/Blocks/GridGenerator/Grid';
function mapStateToProps(state) {
    return {
        TextResource: state.Entity["textresource"]
    };
}
var FtpFileDetails = /** @class */ (function (_super) {
    __extends(FtpFileDetails, _super);
    function FtpFileDetails(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.iRowsPerPage = 10;
        _this.iFrom = 1;
        _this.strFilePath = '/';
        _this.PageNumberClick = _this.PageNumberClick.bind(_this);
        _this.state = {
            FtpFileData: [],
            blnShowAnimation: false,
            iTotalRowCount: 0
        };
        return _this;
    }
    FtpFileDetails.InitialDataParams = function (JConfiguration, objParams) {
        var arrDataRequest = [];
        var arrResourceRequest = [
            {
                "URL": "API/Object/Blocks/TextResource/TextResource",
                "Params": {
                    "SearchKeys": {
                        "must": [
                            {
                                "match": {
                                    "Id": JConfiguration.LanguageCultureInfo + "/Intranet/Modules/6_Members/FtpFileDetails"
                                }
                            }
                        ]
                    }
                }
            }
        ];
        return { "DataCalls": arrDataRequest, "ResourceCalls": arrResourceRequest };
    };
    FtpFileDetails.prototype.componentDidMount = function () {
        this.setState({ blnShowAnimation: true });
        var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        var objInitialParams = FtpFileDetails.InitialDataParams(this.props.JConfiguration, this.props);
        if (this.props.TextResource == undefined || this.props.TextResource["textresource;Id;de/Intranet/Modules/6_Members/FtpFileDetails"] == undefined) {
            objArcadixFetchAndCacheData.GetData(objInitialParams.ResourceCalls, function () { });
        }
        this.PageNumberClick(1);
    };
    FtpFileDetails.prototype.PageNumberClick = function (iStartPageNumber) {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        var objParams = {
            iFrom: this.iRowsPerPage * (iStartPageNumber - 1),
            iSize: this.iRowsPerPage,
            FilePath: this.strFilePath,
            blnIsDemoData: false
        };
        ArcadixFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/GetFtpFileDetails", objParams, function (objResult) {
            if (objResult["Response"]["FileDetails"] != undefined) {
                _this.setState({
                    iTotalRowCount: objResult["Response"]["Count"],
                    blnShowAnimation: false,
                    FtpFileData: objResult["Response"]["FileDetails"]
                });
            }
        });
    };
    FtpFileDetails.prototype.UpdateFtpFolderPath = function (objEvent) {
        this.strFilePath = objEvent.target.value;
        this.iFrom = 1;
        this.PageNumberClick(1);
    };
    FtpFileDetails.prototype.GetColumns = function () {
        return [
            {
                "ValidationId": "1",
                "Data": "Name",
                "DataType": "string",
                "ControlType": "label",
                "AttributeName": "Name"
            },
            {
                "ValidationId": "1",
                "Data": "LastModifiedOn",
                "DataType": "date",
                "ControlType": "label",
                "AttributeName": "LastModifiedOn"
            }
        ];
    };
    FtpFileDetails.prototype.render = function () {
        var _this = this;
        var objTextResourceForGrid = {};
        var objTextResource = {};
        if (this.props.TextResource != undefined && this.props.TextResource["textresource;Id;de/Intranet/Modules/6_Members/FtpFileDetails"] != undefined
            && this.props.TextResource["textresource;Id;de/Intranet/Modules/6_Members/FtpFileDetails"]["Data"].length > 0) {
            objTextResourceForGrid = this.props.TextResource["textresource;Id;de/Intranet/Modules/6_Members/FtpFileDetails"]["Data"][0];
            objTextResource = JSON.parse(objTextResourceForGrid["FtpFileDetails"]);
        }
        return (React.createElement("div", null,
            React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation }),
            React.createElement("div", { className: "h-100" },
                (this.props.TextResource != undefined && this.props.TextResource["textresource;Id;de/Intranet/Modules/6_Members/FtpFileDetails"] != undefined
                    && this.props.TextResource["textresource;Id;de/Intranet/Modules/6_Members/FtpFileDetails"]["Data"].length > 0) &&
                    React.createElement("div", { id: "divFilterCriteria" },
                        React.createElement("table", { className: "managementTbl" },
                            React.createElement("tr", null,
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("span", { className: "Label" },
                                        objTextResource["FolderText"],
                                        ":")),
                                React.createElement("td", { className: "pL10" },
                                    React.createElement("select", { className: "Dropdown", onChange: function (e) { return _this.UpdateFtpFolderPath(e); } },
                                        React.createElement("option", { value: '/' }, objTextResource["RootFolderPath"]),
                                        React.createElement("option", { value: objTextResource["SuccessfullFolderPath"] }, objTextResource["SuccessfullFolderPath"]),
                                        React.createElement("option", { value: objTextResource["FailureFolderPath"] }, objTextResource["FailureFolderPath"])))))),
                (this.state.FtpFileData.length > 0) ?
                    React.createElement(Grid, { onDragFromGrid: this.props.onDragFromGrid, header: this.GetColumns(), blnColumnConfig: false, rowData: this.state.FtpFileData, onRowClick: function () { }, onRowDoubleClick: function () { }, loadContextMenu: this.props.loadContextMenu, onClickIcon: function () { }, updateSelectedRows: function () { }, MainClientLanguageData: [], objTextResource: objTextResourceForGrid, arrDependingTables: [], strILanguageId: this.props.JConfiguration.InterfaceLanguageId, JConfiguration: this.props.JConfiguration })
                    :
                        React.createElement("div", null),
                this.state.iTotalRowCount != 0 ?
                    React.createElement(Paging, { iRowsPerPage: this.iRowsPerPage, iTotalRowCount: this.state.iTotalRowCount, iFrom: this.iFrom, PageNumberClick: this.PageNumberClick })
                    :
                        React.createElement("div", null))));
    };
    return FtpFileDetails;
}(React.Component));
export default withRouter(connect(mapStateToProps, {})(FtpFileDetails));
//# sourceMappingURL=FtpFileDetails.js.map