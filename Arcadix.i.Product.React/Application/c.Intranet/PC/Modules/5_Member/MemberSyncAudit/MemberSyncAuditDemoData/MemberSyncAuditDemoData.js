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
import MemberSyncAuditFileData from '../MemberSyncAuditFileData/MemberSyncAuditFileData';
import '../MemberSyncAuditData/MemberSyncAuditData.css';
function mapStateToProps(state) {
    return {
        TextResource: state.Entity["textresource"]
    };
}
var MemberSyncAuditDemoData = /** @class */ (function (_super) {
    __extends(MemberSyncAuditDemoData, _super);
    function MemberSyncAuditDemoData(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.PageNumberClick = _this.PageNumberClick.bind(_this);
        _this.state = {
            SelectedFile: "",
            blnIsProcessRunning: false,
            blnIsSameRowClicked: false,
            blnShowAnimation: false,
            AuditData: null,
            iRowsPerPage: 10,
            iTotalRowCount: 0,
            iFrom: 0,
            objTextResource: {}
        };
        return _this;
    }
    MemberSyncAuditDemoData.prototype.componentDidMount = function () {
        var _this = this;
        var arrRequest = [
            {
                "URL": "API/Object/Blocks/TextResource/TextResource",
                "Params": {
                    "SearchKeys": {
                        "must": [
                            {
                                "match": {
                                    "Id": "de/Intranet/Modules/6_Members/MemberSyncAudit"
                                }
                            }
                        ]
                    }
                }
            }
        ];
        var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        objArcadixFetchAndCacheData.GetData(arrRequest, function (objResponse) {
            _this.setState({
                objTextResource: JSON.parse(objResponse["textresource;Id;de/Intranet/Modules/6_Members/MemberSyncAudit"].Data[0].MemberSyncAudit)
            });
        });
        this.PageNumberClick(1);
    };
    MemberSyncAuditDemoData.prototype.PageNumberClick = function (iStartPageNumber) {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        // From:  this.state.iRowsPerPage * (iStartPageNumber - 1),
        // Size: this.state.iRowsPerPage,     
        var objParams = {
            SearchKeys: {
                must: [
                    {
                        match: {
                            cIsDemoData: "Y"
                        }
                    }
                ]
            },
            SortKeys: [
                {
                    "dtCreatedOn": {
                        order: "desc",
                        missing: "_last",
                        unmapped_type: "long"
                    }
                }
            ]
        };
        ArcadixFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/GetData", objParams, function (result) {
            _this.setState({
                AuditData: result["Response"]["membersyncaudit"]["Data"],
                iTotalRowCount: result["Response"]["membersyncaudit"].Count / 2,
                blnShowAnimation: false
            });
        });
    };
    MemberSyncAuditDemoData.prototype.RenderDateTimeinGermanFormat = function (dtDate) {
        if (dtDate != undefined && dtDate != "") {
            var dt = new Date(dtDate);
            return (React.createElement("div", null, dt.toLocaleString('de')));
        }
        else {
            return (React.createElement("div", null));
        }
    };
    MemberSyncAuditDemoData.prototype.RenderMemberSyncDetails = function () {
        var _this = this;
        if (this.state.AuditData) {
            if (this.state.AuditData.length > 0) {
                return (React.createElement("div", { className: "divAutoFLow" },
                    React.createElement("table", { className: "memberAuditTable w-100" },
                        React.createElement("thead", null,
                            React.createElement("th", null, this.state.objTextResource["ColumnHeaderText_Date"]),
                            React.createElement("th", null, this.state.objTextResource["ColumnHeaderText_JSON"]),
                            React.createElement("th", null, this.state.objTextResource["ColumnHeaderText_Lernlupe"]),
                            React.createElement("th", null, this.state.objTextResource["ColumnHeaderText_LernPass"])),
                        this.state.AuditData.map(function (objAudit) {
                            return (React.createElement("tbody", null,
                                React.createElement("tr", { onClick: function () { _this.setState({ blnIsSameRowClicked: (_this.state.SelectedFile == objAudit.FileName && !_this.state.blnIsSameRowClicked), SelectedFile: objAudit.FileName }); } },
                                    React.createElement("td", { className: "dateCol" }, _this.RenderDateTimeinGermanFormat(objAudit.dtCreatedOn)),
                                    React.createElement("td", { className: "jsonCol" }, objAudit.FileName),
                                    objAudit.TransactionIds.map(function (objTransactionId) {
                                        return (React.createElement("td", { className: "auditId" }, objTransactionId));
                                    })),
                                (_this.state.SelectedFile != "" && _this.state.SelectedFile == objAudit.FileName && !_this.state.blnIsSameRowClicked) &&
                                    React.createElement(MemberSyncAuditFileData, { FileName: objAudit.FileName, objTextResource: _this.state.objTextResource })));
                        }))));
            }
            else {
                return (React.createElement("div", null,
                    React.createElement("h3", null, this.state.objTextResource["EmptyGridText"])));
            }
        }
        else {
            return (React.createElement("div", null,
                React.createElement("h3", null, "Loading ... ")));
        }
    };
    MemberSyncAuditDemoData.prototype.ResetDemoData = function () {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        ArcadixFetchData.GetData("/api/Intranet/Modules/6_Members/MemberSyncAudit/deletedata", {}, function (result) {
            _this.setState({
                AuditData: [],
                blnShowAnimation: false
            });
        });
    };
    MemberSyncAuditDemoData.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "memberSync__title" },
            React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation }),
            React.createElement("div", null,
                React.createElement("button", { className: "process__btn", onClick: function () { return _this.ResetDemoData(); } }, this.state.objTextResource["RestButtonText"])),
            React.createElement("br", null),
            this.RenderMemberSyncDetails()));
    };
    return MemberSyncAuditDemoData;
}(React.Component));
export default withRouter(connect(mapStateToProps, {})(MemberSyncAuditDemoData));
//# sourceMappingURL=MemberSyncAuditDemoData.js.map