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
import '../MemberSyncAuditData/MemberSyncAuditData.css';
function mapStateToProps(state) {
    return {
        TextResource: state.Entity["textresource"]
    };
}
var Executions = /** @class */ (function (_super) {
    __extends(Executions, _super);
    function Executions(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            SelectedFile: "",
            blnIsProcessRunning: false,
            blnIsSameRowClicked: false,
            blnShowAnimation: false,
            AuditData: null,
            objTextResource: {}
        };
        _this.ShowProcessStatus = _this.ShowProcessStatus.bind(_this);
        return _this;
    }
    Executions.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ blnShowAnimation: true });
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
        ArcadixFetchData.GetData('API/Intranet/Modules/6_Members/MemberSyncAudit/GetProcessData', {}, function (response) {
            console.log("response", response);
            _this.setState({
                blnIsProcessRunning: response["Response"].blnIsStarted,
                blnShowAnimation: false
            });
        });
    };
    Executions.prototype.EditProcessStatus = function () {
        var _this = this;
        this.setState({ blnShowAnimation: true });
        ArcadixFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/EditData", {}, function (res) {
            _this.setState({
                blnIsProcessRunning: res["Response"].blnIsStarted,
                blnShowAnimation: false
            });
        });
    };
    Executions.prototype.ShowProcessStatus = function () {
        return (React.createElement("div", null,
            React.createElement("div", null,
                this.state.objTextResource["ProcessStatus"],
                " ",
                this.state.blnIsProcessRunning ? this.state.objTextResource["StartedText"] : this.state.objTextResource["StoppedText"]),
            React.createElement("br", null)));
    };
    Executions.prototype.render = function () {
        return (React.createElement("div", { className: "memberSync__title" },
            React.createElement(Animation, { blnShowAnimation: this.state.blnShowAnimation }),
            this.ShowProcessStatus(),
            React.createElement("br", null)));
    };
    return Executions;
}(React.Component));
export default withRouter(connect(mapStateToProps, {})(Executions));
//# sourceMappingURL=Executions.js.map