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
import './MemberSyncAudit.css';
var MemberSyncAudit = /** @class */ (function (_super) {
    __extends(MemberSyncAudit, _super);
    function MemberSyncAudit(props, context) {
        return _super.call(this, props, context) || this;
    }
    MemberSyncAudit.prototype.render = function () {
        return (React.createElement("div", null, "MemberSyncAudit"));
    };
    return MemberSyncAudit;
}(React.Component));
export default withRouter(MemberSyncAudit);
//# sourceMappingURL=MemberSyncAudit.js.map