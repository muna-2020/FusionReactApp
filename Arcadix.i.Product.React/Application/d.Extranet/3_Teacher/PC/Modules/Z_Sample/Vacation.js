//import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react';
//import '@root/App_Themes/Default/Extranet/Skin2018/Css/Teacher/Modules/4_Teacher/TeacherLearningTest/TeacherLearningTest.css';
import ArcadixFetchAndCacheData from '@root/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData'
//import VacationSingleDetail from '@root/Application/Extranet/3_Teacher/Modules/Z_Sample/VacationSingleDetail';

function mapStateToProps(state) {
    return {
        selectedItem: state.ApplicationState.selectedItem,
        EntityVacationDataArray: (state.Entity["vacation"] != undefined) ?
            state.Entity["vacation"] : undefined,
        TextResource: (state.Entity["textresource"] != undefined && state.Entity["textresource"]["textresource;Id;de/Extranet/Teacher/Modules/Z_Sample/Vacation"] != undefined) ?
            state.Entity["textresource"]["textresource;Id;de/Extranet/Teacher/Modules/Z_Sample/Vacation"] : undefined
    }
}
class Vacation extends React.Component{
    constructor(props) {
        super(props);
        this.editData = this.editData.bind(this);
        this.state = {
            selectedDetails: {}
        };
        
    }

    componentDidMount() {
        var objParams = {};
        var objResourceParams = {
            "SearchKeys": {
                "must": [
                    {
                        "match": {
                            "Id": JConfiguration.LanguageCultureInfo + "/Extranet/Teacher/Modules/Z_Sample/Vacation"                            
                        }
                    }
                ]
            }
        };
        var arrRequest = [
            {
                "URL": "API/Object/Z_Sample/Vacation/Vacation",
                "Params": objParams,
                "MethodType": "Get"
            },
            {
                "URL": "API/Object/Blocks/TextResource/TextResource",
                "Params": objResourceParams,
                "MethodType": "Get"
            }
        ];
        
        var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();        
        return new Promise(function (resolve, reject) {
            objArcadixFetchAndCacheData.Execute(arrRequest, function (objReturn) {                
                console.log(objReturn);
                resolve({ success: true });
            });               
        });
    }
    getDetails(Item) {
        this.setState({
            selectedDetails: Item
        });
        ApplicationState.SetProperty("selectedItem", Item);
    }
    editData() {
        var objTaskParams = {};
        var objSelectedRowData = {};
        objSelectedRowData["uID"] = 1,
            objSelectedRowData["FromDate"] = "2018-09-19";
        objSelectedRowData["ToDate"] = "2018-09-19";
        objSelectedRowData["Reason"] = "OFFICE WORK";
        objSelectedRowData["Location"] = "Madurai";

        var objData = objSelectedRowData;
        objData["Params"] = objTaskParams;


        var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        return new Promise(function (resolve, reject) {
            objArcadixFetchAndCacheData.EditData("API/Object/Z_Sample/VacationDetail/VacationDetail/EditData", objData, function (objReturn) {
                var abc = objReturn;
                console.log(abc);
                //    this.setState({ blnShowAnimation: false });
                resolve({ success: true });
            });
        });
    }

    render() {
        const arr = this.props.EntityVacationDataArray ? this.props.EntityVacationDataArray.Data : [];
        const vacationDetailTable = arr ? arr.map((item) => {
            return <tr key={item.uID}><td>{item.uID}</td>
                <td >{item.FromDate}</td>
                <td >{item.ToDate}</td>
                <td >{item.Reason}</td>
                <td>{item.Location}</td>
                <td>{item.dtCreatedOn}</td>
                <td>{item.dtModifiedOn}</td>
                <td><span onClick={this.editData}>Edit</span></td>
                <td><span onClick={() => this.getDetails(item)}>GetDetails</span></td>
            </tr>
        }) : <tr></tr>;

        var TextResourceData = this.props.TextResource ? this.props.TextResource.Data[0].Vacation : {}
        console.log(TextResourceData);
        var selectedItemData = this.props.selectedItem ? this.props.selectedItem : {}
        return (
                <div className="hdrTop ">
                    <h2 className="pageTitle m0"> Vacation Details</h2>
                    <div id="VacationDetailsTable"className="tableSection clear">
                        <table className="pupilTestDetailsTbl wid100">
                            <tbody>
                                <tr>
                                    <th>UserId</th>
                                    <th>FromDtae</th>
                                    <th>ToDate</th>
                                    <th>Reason</th>
                                    <th>Location</th>
                                    <th>DateCreatedOn</th>
                                    <th>DateModifiedOn</th>
                                </tr>
                                {vacationDetailTable}
                            </tbody>
                        </table>
                    <div>
                    <div>
                        <h2>Details from Resource:</h2>
                        <p>                 
                            {JSON.stringify(TextResourceData ? TextResourceData : "")}                    
                            {/*  {TextResourceData ?JSON.parse(TextResourceData).iStateId : ""} */}
                        </p>
                    </div>      
                    </div>
                    </div>
                    {/*<div id="VacationSingleDetail">   
                        <VacationSingleDetail />    
                    </div>*/}
                </div>
        
        );
    }

}

export default connect(mapStateToProps)(Vacation);