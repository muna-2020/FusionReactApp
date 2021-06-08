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
import { connect } from "react-redux";
import './AddEditDelete.css';
function mapStateToProps(state) {
    return {
        SelectedRowData: state.ApplicationState["selectedRows"],
        ShowPopup: state.ApplicationState.showPopUp,
        ClosePopup: state.ApplicationState.closePopUp
    };
}
var AddEditDeletePopup = /** @class */ (function (_super) {
    __extends(AddEditDeletePopup, _super);
    function AddEditDeletePopup(props) {
        var _this = _super.call(this, props) || this;
        _this.OnPopupClose = _this.OnPopupClose.bind(_this);
        _this.GetPopupContent = _this.GetPopupContent.bind(_this);
        _this.GetAddData = _this.GetAddData.bind(_this);
        _this.GetEditData = _this.GetEditData.bind(_this);
        _this.GetDeleteData = _this.GetDeleteData.bind(_this);
        _this.GetSendMail = _this.GetSendMail.bind(_this);
        _this.handleChangeAdd = _this.handleChangeAdd.bind(_this);
        _this.handleChangeEdit = _this.handleChangeEdit.bind(_this);
        _this.AddData = _this.AddData.bind(_this);
        _this.EditData = _this.EditData.bind(_this);
        _this.DeleteData = _this.DeleteData.bind(_this);
        _this.state = {
            arrSelectedRowData: [],
            objSelectedRowData: {},
            objSelectedRowDataUnchanged: {},
            objNewData: {
                "uBusinessUnitId": "6456441E-B104-415B-82FA-A908A9468BFA",
                "uUserId": "AE27E1A5-CEAF-48DC-9FD7-5EE49BF434C6",
                "vEmail": "",
                "vFirstName": "",
                "vIPRestriction": "",
                "vName": "",
                "vPassword": "",
                "vPasswordHash": ""
            }
        };
        return _this;
    }
    AddEditDeletePopup.prototype.componentDidMount = function () {
        if (this.props.SelectedRowData != undefined && this.props.SelectedRowData.length > 0) {
            this.setState({
                arrSelectedRowData: this.props.SelectedRowData,
                objSelectedRowData: this.props.SelectedRowData[0],
                objSelectedRowDataUnchanged: JSON.parse(JSON.stringify(this.props.SelectedRowData[0]))
            });
        }
    };
    AddEditDeletePopup.prototype.componentWillReceiveProps = function (objNewProps) {
        if (objNewProps.SelectedRowData != undefined && objNewProps.SelectedRowData.length > 0) {
            this.setState({
                arrSelectedRowData: this.props.SelectedRowData,
                objSelectedRowData: objNewProps.SelectedRowData[0],
                objSelectedRowDataUnchanged: this.props.SelectedRowData[0]
            });
        }
    };
    AddEditDeletePopup.prototype.OnPopupClose = function () {
        this.props.ClosePopup(this.props.objModal);
    };
    AddEditDeletePopup.prototype.GetPopupContent = function () {
        var arrDisplayContent = "<div></div>";
        if (this.props.Data.Action.toLowerCase() == "new") {
            return this.GetAddData();
        }
        else if (this.props.Data.Action.toLowerCase() == "edit") {
            return this.GetEditData();
        }
        else if (this.props.Data.Action.toLowerCase() == "delete") {
            return this.GetDeleteData();
        }
        else if (this.props.Data.Action.toLowerCase() == "invokeribbonaction") {
            return this.GetSendMail();
        }
        return arrDisplayContent;
    };
    AddEditDeletePopup.prototype.GetAddData = function () {
        var objDisplayData = [];
        if (this.state.objNewData != undefined) {
            return (React.createElement("div", null,
                React.createElement("div", { className: "popup__title" }, "Add User"),
                React.createElement("div", { className: "action-buttons" },
                    React.createElement("img", { src: JConfiguration.CommonImages + "Toolbar/Save_Large.svg", onClick: this.AddData }),
                    React.createElement("span", { className: "action-buttons-title" }, "Save")),
                React.createElement("div", { className: "displayTable" },
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "vFirstName: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" },
                            React.createElement("input", { placeholder: "First Name", type: "text", className: "firstname", id: "txtFirstName", value: this.state.objNewData.vFirstName, onChange: this.handleChangeAdd }))),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "vName: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" },
                            React.createElement("input", { placeholder: "Last Name", type: "text", className: "lastname", id: "txtLastName", value: this.state.objNewData.vName, onChange: this.handleChangeAdd }))),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "vEmail: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" },
                            React.createElement("input", { placeholder: "Email", type: "text", className: "email", id: "txtEmail", value: this.state.objNewData.vEmail, onChange: this.handleChangeAdd }))))));
        }
        else
            return (React.createElement("div", { className: "displayTable" }, "Unavailable to fetch view"));
    };
    AddEditDeletePopup.prototype.GetEditData = function () {
        var objDisplayData = [];
        if (this.props.SelectedRowData != undefined && this.props.SelectedRowData.length > 0) {
            return (React.createElement("div", null,
                React.createElement("div", { className: "popup__title" }, "Edit User"),
                React.createElement("div", { className: "action-buttons" },
                    React.createElement("img", { src: JConfiguration.CommonImages + "Toolbar/Save_Large.svg", onClick: this.EditData }),
                    React.createElement("span", { className: "action-buttons-title" }, "Save")),
                React.createElement("div", { className: "displayTable" },
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "uUserId: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" }, this.state.objSelectedRowData.uMainClientUserId)),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "vFirstName: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" },
                            React.createElement("input", { placeholder: "First Name", type: "text", className: "firstname", id: "txtFirstName", value: this.state.objSelectedRowData.vFirstName, onChange: this.handleChangeEdit }))),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "vName: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" },
                            React.createElement("input", { placeholder: "Last Name", type: "text", className: "lastname", id: "txtLastName", value: this.state.objSelectedRowData.vName, onChange: this.handleChangeEdit }))),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "vEmail: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" },
                            React.createElement("input", { placeholder: "Email", type: "text", className: "email", id: "txtEmail", value: this.state.objSelectedRowData.vEmail, onChange: this.handleChangeEdit }))),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "dtCreatedOn: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" }, this.GetDisplayDate(this.state.objSelectedRowData.dtCreatedOn))),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }, "dtModifiedOn: "),
                        " ",
                        React.createElement("div", { className: "displayTableCell inputTd" }, this.GetDisplayDate(this.state.objSelectedRowData.dtModifiedOn))))));
        }
        else
            return (React.createElement("div", { className: "displayTable" }, "Data not available"));
    };
    AddEditDeletePopup.prototype.GetDeleteData = function () {
        var objDisplayData = [];
        if (this.state.arrSelectedRowData != undefined && this.state.arrSelectedRowData.length > 0) {
            var arrMainClientuserIds = [];
            this.state.arrSelectedRowData.forEach(function (data, i) {
                arrMainClientuserIds.push(data["vFirstName"] + data["vName"]);
            });
            return (React.createElement("div", null,
                React.createElement("div", { className: "popup__title" }, "Delete User"),
                React.createElement("div", { className: "displayTable" },
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }),
                        React.createElement("div", null,
                            "Do you want to delete ",
                            arrMainClientuserIds.toString(),
                            " ?")),
                    React.createElement("div", { className: "displayTableRow" },
                        React.createElement("div", { className: "displayTableCell labelTd" }),
                        React.createElement("div", { className: "displayTableCell inputTd" },
                            React.createElement("div", { className: "yes-button", onClick: this.DeleteData }, "Yes"),
                            React.createElement("div", { className: "no-button", onClick: this.OnPopupClose }, "Cancel"))))));
        }
        else
            return (React.createElement("div", { className: "displayTable" }, "Data not available"));
    };
    AddEditDeletePopup.prototype.GetSendMail = function () {
        return (React.createElement("div", { className: "displayTable" }, "Send Mail"));
    };
    AddEditDeletePopup.prototype.GetDisplayDate = function (strDate) {
        var objDate = new Date(strDate);
        return objDate.getDate() + "." + (objDate.getMonth() + 1) + "." + objDate.getFullYear();
    };
    AddEditDeletePopup.prototype.handleChangeAdd = function (event) {
        var objData = this.state.objNewData;
        if (event.target.id == "txtFirstName")
            objData["vFirstName"] = event.target.value;
        else if (event.target.id == "txtLastName")
            objData["vName"] = event.target.value;
        else if (event.target.id == "txtEmail")
            objData["vEmail"] = event.target.value;
        this.setState({ objNewData: objData });
    };
    AddEditDeletePopup.prototype.handleChangeEdit = function (event) {
        var objData = this.state.objSelectedRowData;
        if (event.target.id == "txtFirstName")
            objData["vFirstName"] = event.target.value;
        else if (event.target.id == "txtLastName")
            objData["vName"] = event.target.value;
        else if (event.target.id == "txtEmail")
            objData["vEmail"] = event.target.value;
        this.setState({ objSelectedRowData: objData });
    };
    AddEditDeletePopup.prototype.AddData = function () {
        //let objTestDriveDataService: TestDriveDataService = new TestDriveDataService();
        //return new Promise((resolve, reject) => {
        //    objTestDriveDataService.GetData("/api/MainClientUser/adddata", this.state.objNewData, () => {
        //        //if (objResponse != undefined && objResponse.Data != undefined && objResponse.Data.length > 0) {
        //        //    this.setState({ blnShowAnimation: false });
        //        //}
        //    });
        //    //need to move inside getdata call
        //    ApplicationStateService.SetProperty('ShowPopup', { "Mode": "", "blnShowPopup": false });
        //    resolve({ success: true });
        //});
    };
    AddEditDeletePopup.prototype.EditData = function () {
        //let objTestDriveDataService: TestDriveDataService = new TestDriveDataService();
        //return new Promise((resolve, reject) => {
        //    objTestDriveDataService.GetData("/api/MainClientUser/editdata", this.state.objSelectedRowData, () => {
        //        //if (objResponse != undefined && objResponse.Data != undefined && objResponse.Data.length > 0) {
        //        //    this.setState({ blnShowAnimation: false });
        //        //}
        //    });
        //    //need to move inside getdata call
        //    this.setState({ objSelectedRowDataUnchanged: this.state.objSelectedRowData });
        //    ApplicationStateService.SetProperty('ShowPopup', { "Mode": "", "blnShowPopup": false });            
        //    resolve({ success: true });
        //});
    };
    AddEditDeletePopup.prototype.DeleteData = function () {
        //let objTestDriveDataService: TestDriveDataService = new TestDriveDataService();
        //if (this.state.arrSelectedRowData != undefined && this.state.arrSelectedRowData.length > 0) {
        //    var arrMainClientuserIds = [];
        //    this.state.arrSelectedRowData.forEach((data, i) => {
        //        arrMainClientuserIds.push(data["uMainClientUserId"]);
        //    });
        //    if (arrMainClientuserIds != null && arrMainClientuserIds.length > 0) {
        //        return new Promise((resolve, reject) => {
        //            objTestDriveDataService.GetData("/api/MainClientUser/deletedata", { "MainClientUserIds": arrMainClientuserIds }, () => {
        //                //if (objResponse != undefined && objResponse.Data != undefined && objResponse.Data.length > 0) {
        //                //    this.setState({ blnShowAnimation: false });
        //                //}
        //            });
        //            //need to move inside getdata call
        //            this.setState({ SelectedRowData: [] });
        //            ApplicationStateService.SetProperty('ShowPopup', { "Mode": "", "blnShowPopup": false });
        //            resolve({ success: true });
        //        });
        //    }
        //    else
        //        return (<div className="displayTable">Select atleast one user</div>);
        //}
        //else
        return (React.createElement("div", { className: "displayTable" }, "Select atleast one user"));
    };
    AddEditDeletePopup.prototype.render = function () {
        return (React.createElement("div", { className: "popup-overlay" },
            React.createElement("div", { className: "Popup" },
                React.createElement("div", { onClick: this.OnPopupClose, className: "popup__close fR" }),
                this.GetPopupContent())));
    };
    return AddEditDeletePopup;
}(React.Component));
export default connect(mapStateToProps, {})(AddEditDeletePopup);
//# sourceMappingURL=AddEditDeletePopup.js.map