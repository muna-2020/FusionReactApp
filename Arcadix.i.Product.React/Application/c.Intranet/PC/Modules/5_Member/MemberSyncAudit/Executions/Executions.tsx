import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import TestDriveFetchData from '../../../../../../Framework/DataService/TestDriveFetchData/TestDriveFetchData';
import TestDriveFetchAndCacheData from '../../../../../../Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';
import Animation from '../../../../../../Framework/Controls/Animation/Animation';
import '../MemberSyncAuditData/MemberSyncAuditData.css';

function mapStateToProps(state) {
    return {
        TextResource:state.Entity["textresource"]
    }
}

class Executions extends React.Component<any, any>{
    constructor(props: any, context:any) {
        super(props,context);
        this.state = {
            SelectedFile: "",
            blnIsProcessRunning: false,
            blnIsSameRowClicked: false,
            blnShowAnimation: false
           ,AuditData:null,
           objTextResource:{}
        };
        this.ShowProcessStatus = this.ShowProcessStatus.bind(this);
    }

    componentDidMount() {
        this.setState({ blnShowAnimation: true });
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
        });

        TestDriveFetchData.GetData('API/Intranet/Modules/6_Members/MemberSyncAudit/GetProcessData', {}, (response) => {
            console.log("response", response);
            this.setState({
                blnIsProcessRunning: response["Response"].blnIsStarted,
                blnShowAnimation: false
            })
        });
    }

    EditProcessStatus() {
        this.setState({ blnShowAnimation: true });
        TestDriveFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/EditData", {}, (res) => {
                this.setState({
                    blnIsProcessRunning: res["Response"].blnIsStarted,
                    blnShowAnimation: false
                })
            });
    }

    ShowProcessStatus() {
        return (
            <div>
                <div>{this.state.objTextResource["ProcessStatus"]} {this.state.blnIsProcessRunning ? this.state.objTextResource["StartedText"]: this.state.objTextResource["StoppedText"]}</div>
                <br />
        {/* <button className="process__btn" onClick={() => this.EditProcessStatus()}>{this.state.blnIsProcessRunning ? this.state.objTextResource["StoppedText_Button"] :this.state.objTextResource["StartedText_Button"] }</button> */}
            </div>);
    }    

    render() {
        return (
            <div className="memberSync__title">
                <Animation blnShowAnimation={this.state.blnShowAnimation} />
                {this.ShowProcessStatus()}
                <br />
                </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, {})(Executions));

