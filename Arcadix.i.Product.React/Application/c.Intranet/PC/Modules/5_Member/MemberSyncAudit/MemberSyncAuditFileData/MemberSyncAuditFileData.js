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
import ArcadixFetchData from '../../../../../../Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import JSONBeautifier from '../../../../../../Framework/Controls/FileBeautifers/JSONBeautifier';
import '../MemberSyncAuditData/MemberSyncAuditData.css';
import Animation from '../../../../../../Framework/Controls/Animation/Animation';
var MemberSyncAuditFileData = /** @class */ (function (_super) {
    __extends(MemberSyncAuditFileData, _super);
    function MemberSyncAuditFileData(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            AuditFileData: null,
            blnShowAnimation: false
        };
        return _this;
    }
    MemberSyncAuditFileData.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        var objParams = {
            SearchKeys: {
                must: [
                    {
                        match: {
                            vFileName: this.props.FileName
                        }
                    }
                ]
            },
            SortKeys: [
                {
                    iMainClientId: {
                        order: "asc",
                        missing: "_last",
                        unmapped_type: "long"
                    }
                }
            ],
            OutputColumns: ["vFileName", "vFileContent", "t_TestDrive_Audit_Table", "dtModifiedOn"]
        };
        ArcadixFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/GetMemberSyncAuditFileData", objParams, function (result) {
            _this.setState({
                AuditFileData: result["Response"]["membersyncaudit"]["Data"],
                blnShowAnimation: false
            });
        });
    };
    MemberSyncAuditFileData.prototype.RenderDateTimeinGermanFormat = function (dtDate) {
        if (dtDate != undefined && dtDate != "") {
            var dt = new Date(dtDate);
            return (React.createElement("div", null, dt.toLocaleString('de')));
        }
        else {
            return (React.createElement("div", null));
        }
    };
    MemberSyncAuditFileData.prototype.LoadAuditDetails = function () {
        var _this = this;
        if (this.state.AuditFileData != null && this.state.AuditFileData.length > 0) {
            return (React.createElement("tr", null,
                React.createElement("td", { className: "dateCol" }),
                React.createElement("td", { className: "jsonCol" },
                    React.createElement(JSONBeautifier, { data: JSON.parse(this.state.AuditFileData[0].AuditDetails[0].vFileContent) })),
                this.state.AuditFileData[0].AuditDetails.map(function (objAuditDetail) {
                    return (React.createElement("td", { className: "auditId" }, objAuditDetail["t_TestDrive_Audit_Table"].map(function (objAuditFile) {
                        var oldJson = objAuditFile.vOldJson;
                        var strAction = objAuditFile.vAction;
                        var strTableName = oldJson.split(':')[0];
                        var strJson = oldJson.substring(strTableName.length + 1);
                        var objAuditFileDetails_Old = strJson != "" ? (JSON.parse(strJson))[0] : {};
                        var objAuditFileDetails_New = (JSON.parse(objAuditFile.vNewJson.substring(strTableName.length + 1)))[0];
                        return (React.createElement("div", null,
                            React.createElement("h1", { className: "page-contentMainTitle hdr" },
                                _this.props.objTextResource["TableText"],
                                " ",
                                strTableName,
                                " "),
                            React.createElement("h1", { className: "page-contentMainTitle hdr" },
                                _this.props.objTextResource["ActionText"],
                                " ",
                                strAction.toUpperCase() == 'INSERT' ? _this.props.objTextResource["InsertAction"] : _this.props.objTextResource["UpdateAction"]),
                            React.createElement("table", { className: "memberAuditTable w-100" },
                                React.createElement("tr", null,
                                    React.createElement("th", null, _this.props.objTextResource["ColumnNameTxt"]),
                                    React.createElement("th", null, _this.props.objTextResource["OldColumnText"]),
                                    React.createElement("th", null, _this.props.objTextResource["NewColumnText"])),
                                Object.keys(objAuditFileDetails_New).map(function (objKey) {
                                    return (React.createElement("tr", { className: objAuditFileDetails_Old[objKey] != undefined && objAuditFileDetails_Old[objKey] != objAuditFileDetails_New[objKey] ? "highlight" : "" },
                                        React.createElement("td", { className: "auditId" }, objKey),
                                        React.createElement("td", { className: "auditId" }, (objKey.toLowerCase() == "dtcreatedon" || objKey.toLowerCase() == "dtmodifiedon") ? _this.RenderDateTimeinGermanFormat(objAuditFileDetails_Old[objKey]) : objAuditFileDetails_Old[objKey]),
                                        React.createElement("td", { className: "auditId" }, (objKey.toLowerCase() == "dtcreatedon" || objKey.toLowerCase() == "dtmodifiedon") ? _this.RenderDateTimeinGermanFormat(objAuditFileDetails_New[objKey]) : objAuditFileDetails_New[objKey])));
                                }))));
                    })));
                })));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("h3", null, this.props.objTextResource["NoAuditDataText"])));
        }
    };
    MemberSyncAuditFileData.prototype.render = function () {
        return (this.state.blnShowAnimation ? React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation }) : this.LoadAuditDetails());
    };
    return MemberSyncAuditFileData;
}(React.Component));
export default MemberSyncAuditFileData;
//# sourceMappingURL=MemberSyncAuditFileData.js.map