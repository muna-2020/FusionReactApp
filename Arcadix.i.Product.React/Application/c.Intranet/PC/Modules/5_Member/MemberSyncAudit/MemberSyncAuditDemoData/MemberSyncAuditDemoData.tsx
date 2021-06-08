import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import TestDriveFetchData from '../../../../../../Framework/DataService/TestDriveFetchData/TestDriveFetchData';
import TestDriveFetchAndCacheData from '../../../../../../Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';
import JSONBeautifier from '../../../../../../Framework/Controls/FileBeautifers/JSONBeautifier';
import Animation from '../../../../../../Framework/Controls/Animation/Animation';
import ComponentLoader from '../../../../../../Framework/ServerRenderLoader/ComponentLoader/ComponentLoader';
import MemberSyncAuditFileData from '../MemberSyncAuditFileData/MemberSyncAuditFileData';
import Paging from '../../../../../../Framework/Controls/Paging/Paging';
import '../MemberSyncAuditData/MemberSyncAuditData.css';

function mapStateToProps(state) {
    return {
        TextResource:state.Entity["textresource"]
    }
}

class MemberSyncAuditDemoData extends React.Component<any, any>{

    constructor(props: any, context: any) {
        super(props, context);
        this.PageNumberClick = this.PageNumberClick.bind(this);
        this.state = {
            SelectedFile: "",
            blnIsProcessRunning: false,
            blnIsSameRowClicked: false,
            blnShowAnimation: false,
            AuditData: null,
            iRowsPerPage: 10,
            iTotalRowCount: 0,
            iFrom: 0,
            objTextResource:{}
        };
    }

    componentDidMount() {
        let arrRequest = [
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

        let objTestDriveFetchAndCacheData: TestDriveFetchAndCacheData = new TestDriveFetchAndCacheData();
        objTestDriveFetchAndCacheData.GetData(arrRequest,(objResponse)=>{
            this.setState({
                objTextResource:JSON.parse(objResponse["textresource;Id;de/Intranet/Modules/6_Members/MemberSyncAudit"].Data[0].MemberSyncAudit)
            });
        })


        this.PageNumberClick(1);
    }

    PageNumberClick(iStartPageNumber:number){
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

        TestDriveFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/GetData", objParams, (result) => {
            this.setState({
                AuditData: result["Response"]["membersyncaudit"]["Data"],
                iTotalRowCount: result["Response"]["membersyncaudit"].Count/2,
                blnShowAnimation: false
            });
        });        
    }

    RenderDateTimeinGermanFormat(dtDate) {
        if (dtDate != undefined && dtDate != "") {
            var dt = new Date(dtDate);
            return (<div>{dt.toLocaleString('de')}</div>)
        } else {
            return (<div></div>)
        }
    }

    RenderMemberSyncDetails() {
        if (this.state.AuditData) {
            if (this.state.AuditData.length > 0) {
                return (
                    <div style="max-height:85%; overflow:auto;">
                        <table className="memberAuditTable w-100">
                            <thead>
                                <th>{this.state.objTextResource["ColumnHeaderText_Date"]}</th>
                                <th>{this.state.objTextResource["ColumnHeaderText_JSON"]}</th>
                                <th>{this.state.objTextResource["ColumnHeaderText_Lernlupe"]}</th>
                                <th>{this.state.objTextResource["ColumnHeaderText_LernPass"]}</th>
                            </thead>
                            {
                                this.state.AuditData.map(objAudit => {
                                    return (
                                        <tbody>
                                            <tr  onClick={() => { this.setState({ blnIsSameRowClicked: (this.state.SelectedFile == objAudit.FileName && !this.state.blnIsSameRowClicked), SelectedFile: objAudit.FileName }) }}>
                                                <td className="dateCol">
                                                    {this.RenderDateTimeinGermanFormat(objAudit.dtCreatedOn)}
                                                </td>
                                                <td className="jsonCol">
                                                    {objAudit.FileName}
                                                </td>
                                                {
                                                    objAudit.TransactionIds.map(objTransactionId => {
                                                        return (
                                                            <td className="auditId">{objTransactionId}</td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                            {
                                                (this.state.SelectedFile != "" && this.state.SelectedFile == objAudit.FileName && !this.state.blnIsSameRowClicked) &&
                                                <MemberSyncAuditFileData FileName={objAudit.FileName} objTextResource={this.state.objTextResource} />
                                            }
                                        </tbody>
                                    )
                                })
                            }

                        </table>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h3>{this.state.objTextResource["EmptyGridText"]}</h3>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <h3>Loading ... </h3>
                </div>
            );
        }
    }

    

    ResetDemoData() {
        this.setState({ blnShowAnimation: true });
        TestDriveFetchData.GetData("/api/Intranet/Modules/6_Members/MemberSyncAudit/deletedata", {}, (result) => {
            this.setState({
                AuditData: [],
                blnShowAnimation: false
            })
        })
    }

    render() {
        return (
            <div className="memberSync__title">
                <Animation blnShowAnimation={this.state.blnShowAnimation} />
                <div>
                    <button className="process__btn" onClick={() => this.ResetDemoData()}>{this.state.objTextResource["RestButtonText"]}</button>
                </div>
                <br />
                {this.RenderMemberSyncDetails()}
                {/*
                    this.state.iTotalRowCount != 0 ?
                    <Paging iRowsPerPage={this.state.iRowsPerPage} iTotalRowCount={this.state.iTotalRowCount} iForm={this.state.iFrom} PageNumberClick={this.PageNumberClick} />
                    :
                    <div></div>
                    */
                } 
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, {})(MemberSyncAuditDemoData));

