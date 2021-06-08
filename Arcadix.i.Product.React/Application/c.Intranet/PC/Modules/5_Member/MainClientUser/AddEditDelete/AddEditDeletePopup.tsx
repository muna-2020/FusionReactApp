import * as React from 'react';
import { Link, Route, withRouter, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import TestDriveDataService from '../../../../../../Framework/DataService/TestDriveDataService';
import Animation from '../../../../../../Framework/Controls/Animation/Animation';
import ApplicationStateService from "../../../../../../Framework/DataService/ApplicationState/ApplicationState";
import './AddEditDelete.css';
import { json } from 'express';
declare var JConfiguration: any;

function mapStateToProps(state) {
    return {
        SelectedRowData: state.ApplicationState["selectedRows"],
        ShowPopup: state.ApplicationState.showPopUp,
        ClosePopup: state.ApplicationState.closePopUp
    };
}

class AddEditDeletePopup extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.OnPopupClose = this.OnPopupClose.bind(this);
        this.GetPopupContent = this.GetPopupContent.bind(this);
        this.GetAddData = this.GetAddData.bind(this);
        this.GetEditData = this.GetEditData.bind(this);
        this.GetDeleteData = this.GetDeleteData.bind(this);
        this.GetSendMail = this.GetSendMail.bind(this);
        this.handleChangeAdd = this.handleChangeAdd.bind(this);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.AddData = this.AddData.bind(this);
        this.EditData = this.EditData.bind(this);
        this.DeleteData = this.DeleteData.bind(this);
        this.state = {
            arrSelectedRowData:[],
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
    }

    componentDidMount() {
        if (this.props.SelectedRowData != undefined && this.props.SelectedRowData.length > 0) {
            this.setState({
                arrSelectedRowData: this.props.SelectedRowData,
                objSelectedRowData: this.props.SelectedRowData[0],
                objSelectedRowDataUnchanged: JSON.parse(JSON.stringify(this.props.SelectedRowData[0]))
            });
        }
    }

    componentWillReceiveProps(objNewProps) {
        if (objNewProps.SelectedRowData != undefined && objNewProps.SelectedRowData.length > 0) {
            this.setState({
                arrSelectedRowData: this.props.SelectedRowData,
                objSelectedRowData: objNewProps.SelectedRowData[0],
                objSelectedRowDataUnchanged: this.props.SelectedRowData[0]
            });
        }
    }

    OnPopupClose() {
        this.props.ClosePopup(this.props.objModal);
    }

    GetPopupContent() {
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
        return arrDisplayContent
    }

    GetAddData() {        
        var objDisplayData = [];
        if (this.state.objNewData != undefined) {
            return (
                <div>
                    <div className="popup__title">Add User</div>
                    <div className="action-buttons">
                        <img src={JConfiguration.CommonImages + "Toolbar/Save_Large.svg"} onClick={this.AddData} />
                        <span className="action-buttons-title">Save</span>
                    </div>
                    <div className="displayTable">
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">vFirstName: </div> <div className="displayTableCell inputTd"><input placeholder="First Name" type="text" className="firstname" id="txtFirstName" value={this.state.objNewData.vFirstName} onChange={this.handleChangeAdd} /></div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">vName: </div> <div className="displayTableCell inputTd"><input placeholder="Last Name" type="text" className="lastname" id="txtLastName" value={this.state.objNewData.vName} onChange={this.handleChangeAdd} /></div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">vEmail: </div> <div className="displayTableCell inputTd"><input placeholder="Email" type="text" className="email" id="txtEmail" value={this.state.objNewData.vEmail} onChange={this.handleChangeAdd} /></div>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (<div className="displayTable">Unavailable to fetch view</div>);
    }

    GetEditData() {
        var objDisplayData = [];
        if (this.props.SelectedRowData != undefined && this.props.SelectedRowData.length > 0) {            
            return (
                <div>
                    <div className="popup__title">Edit User</div>
                    <div className="action-buttons">
                        <img src={JConfiguration.CommonImages + "Toolbar/Save_Large.svg"} onClick={this.EditData} />
                        <span className="action-buttons-title">Save</span>
                    </div>
                    <div className="displayTable">
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">uUserId: </div> <div className="displayTableCell inputTd">{this.state.objSelectedRowData.uMainClientUserId}</div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">vFirstName: </div> <div className="displayTableCell inputTd"><input placeholder="First Name" type="text" className="firstname" id="txtFirstName" value={this.state.objSelectedRowData.vFirstName} onChange={this.handleChangeEdit} /></div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">vName: </div> <div className="displayTableCell inputTd"><input placeholder="Last Name" type="text" className="lastname" id="txtLastName" value={this.state.objSelectedRowData.vName} onChange={this.handleChangeEdit} /></div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">vEmail: </div> <div className="displayTableCell inputTd"><input placeholder="Email" type="text" className="email" id="txtEmail" value={this.state.objSelectedRowData.vEmail} onChange={this.handleChangeEdit} /></div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">dtCreatedOn: </div> <div className="displayTableCell inputTd">{this.GetDisplayDate(this.state.objSelectedRowData.dtCreatedOn)}</div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd">dtModifiedOn: </div> <div className="displayTableCell inputTd">{this.GetDisplayDate(this.state.objSelectedRowData.dtModifiedOn)}</div>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (<div className="displayTable">Data not available</div>);
    }

    GetDeleteData() {
        var objDisplayData = [];
        if (this.state.arrSelectedRowData != undefined && this.state.arrSelectedRowData.length > 0) {
            var arrMainClientuserIds = [];
            this.state.arrSelectedRowData.forEach((data, i) => {
                arrMainClientuserIds.push(data["vFirstName"] + data["vName"]);
            });
            return (
                <div>
                    <div className="popup__title">Delete User</div>
                    <div className="displayTable">
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd"></div>
                            <div>Do you want to delete { arrMainClientuserIds.toString() } ?</div>
                        </div>
                        <div className="displayTableRow">
                            <div className="displayTableCell labelTd"></div>
                            <div className="displayTableCell inputTd">
                                <div className="yes-button" onClick={this.DeleteData}>Yes</div>
                                <div className="no-button" onClick={this.OnPopupClose}>Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (<div className="displayTable">Data not available</div>);
    }

    GetSendMail() {
        return (<div className="displayTable">Send Mail</div>);
    }

    GetDisplayDate(strDate: any) {
        var objDate = new Date(strDate);
        return objDate.getDate() + "." + (objDate.getMonth() + 1) + "." + objDate.getFullYear();
    }

    handleChangeAdd(event: any) {
        var objData = this.state.objNewData;
        if (event.target.id == "txtFirstName")
            objData["vFirstName"] = event.target.value;
        else if (event.target.id == "txtLastName")
            objData["vName"] = event.target.value;
        else if (event.target.id == "txtEmail")
            objData["vEmail"] = event.target.value;
        this.setState({ objNewData: objData });
    }

    handleChangeEdit(event: any) {
        var objData = this.state.objSelectedRowData;
        if (event.target.id == "txtFirstName")
            objData["vFirstName"] = event.target.value;
        else if (event.target.id == "txtLastName")
            objData["vName"] = event.target.value;
        else if (event.target.id == "txtEmail")
            objData["vEmail"] = event.target.value;
        this.setState({ objSelectedRowData: objData });
    }

    AddData() {
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
    }

    EditData() {
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
    }  

    DeleteData() {
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
            return (<div className="displayTable">Select atleast one user</div>);
    }

    render() {
        return (
            <div className="popup-overlay">
                <div className="Popup">
                    <div onClick={this.OnPopupClose} className="popup__close fR"></div>                                                 
                    {this.GetPopupContent()}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, {})(AddEditDeletePopup);