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
import Paging from '../../../../../../Framework/Controls/Paging/Paging';
import './MemberSyncAuditData.css';
function mapStateToProps(state) {
    return {
        TextResource: state.Entity["textresource"]
    };
}
var MemberSyncAuditData = /** @class */ (function (_super) {
    __extends(MemberSyncAuditData, _super);
    function MemberSyncAuditData(props, context) {
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
    MemberSyncAuditData.prototype.componentDidMount = function () {
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
    MemberSyncAuditData.prototype.PageNumberClick = function (iStartPageNumber) {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        var objParams = {
            From: this.state.iRowsPerPage * (iStartPageNumber - 1),
            Size: this.state.iRowsPerPage,
            SearchKeys: {
                must: [
                    {
                        match: {
                            cIsDemoData: "N"
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
    MemberSyncAuditData.prototype.RenderDateTimeinGermanFormat = function (dtDate) {
        if (dtDate != undefined && dtDate != "") {
            var dt = new Date(dtDate);
            return (React.createElement("div", null, dt.toLocaleString('de')));
        }
        else {
            return (React.createElement("div", null));
        }
    };
    MemberSyncAuditData.prototype.RenderMemberSyncDetails = function () {
        var _this = this;
        if (this.state.AuditData) {
            if (this.state.AuditData.length > 0) {
                return (React.createElement("div", null,
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
    MemberSyncAuditData.prototype.render = function () {
        return (React.createElement("div", { className: "memberSync__title" },
            React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation }),
            this.RenderMemberSyncDetails(),
            this.state.iTotalRowCount != 0 ?
                React.createElement(Paging, { iRowsPerPage: this.state.iRowsPerPage, iTotalRowCount: this.state.iTotalRowCount, iForm: this.state.iFrom, PageNumberClick: this.PageNumberClick })
                :
                    React.createElement("div", null)));
    };
    return MemberSyncAuditData;
}(React.Component));
export default withRouter(connect(mapStateToProps, {})(MemberSyncAuditData));
//# sourceMappingURL=MemberSyncAuditData.js.map