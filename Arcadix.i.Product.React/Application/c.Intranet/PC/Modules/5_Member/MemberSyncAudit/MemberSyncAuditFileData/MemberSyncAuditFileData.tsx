import * as React from 'react';
import TestDriveFetchData from '../../../../../../Framework/DataService/TestDriveFetchData/TestDriveFetchData';
import JSONBeautifier from '../../../../../../Framework/Controls/FileBeautifers/JSONBeautifier';
import '../MemberSyncAuditData/MemberSyncAuditData.css';
import Animation from '../../../../../../Framework/Controls/Animation/Animation';

class MemberSyncAuditFileData extends React.Component<any, any>{

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            AuditFileData: null,
            blnShowAnimation: false
        };
    }

    componentDidMount() {
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
        TestDriveFetchData.GetData("API/Intranet/Modules/6_Members/MemberSyncAudit/GetMemberSyncAuditFileData", objParams, (result) => {
            this.setState({
                AuditFileData: result["Response"]["membersyncaudit"]["Data"],
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

    LoadAuditDetails() {
        if (this.state.AuditFileData != null && this.state.AuditFileData.length > 0) {
            return (
                <tr>
                    <td className="dateCol"></td>
                    <td className="jsonCol">
                        <JSONBeautifier data={JSON.parse(this.state.AuditFileData[0].AuditDetails[0].vFileContent)} />
                    </td>
                    {
                        this.state.AuditFileData[0].AuditDetails.map(objAuditDetail => {
                            return (
                                <td className="auditId">
                                    {
                                        objAuditDetail["t_TestDrive_Audit_Table"].map(objAuditFile => {
                                            var oldJson = objAuditFile.vOldJson;
                                            var strAction = objAuditFile.vAction;
                                            var strTableName = oldJson.split(':')[0];
                                            var strJson = oldJson.substring(strTableName.length + 1);
                                            var objAuditFileDetails_Old = strJson != "" ? (JSON.parse(strJson))[0] : {};
                                            var objAuditFileDetails_New = (JSON.parse(objAuditFile.vNewJson.substring(strTableName.length + 1)))[0];
                                            return (
                                                <div>

                                                    <h1 className="page-contentMainTitle hdr">{this.props.objTextResource["TableText"]} {strTableName} </h1>
                                                    <h1 className="page-contentMainTitle hdr">{this.props.objTextResource["ActionText"]} {strAction.toUpperCase() ==   'INSERT' ?  this.props.objTextResource["InsertAction"] : this.props.objTextResource["UpdateAction"]}</h1>
                                                    <table className="memberAuditTable w-100">
                                                        <tr>
                                                            <th>{this.props.objTextResource["ColumnNameTxt"]}</th>
                                                            <th>{this.props.objTextResource["OldColumnText"]}</th>
                                                            <th>{this.props.objTextResource["NewColumnText"]}</th>
                                                        </tr>
                                                        {
                                                            Object.keys(objAuditFileDetails_New).map(objKey => {
                                                                return (
                                                                    <tr className={objAuditFileDetails_Old[objKey] != undefined && objAuditFileDetails_Old[objKey] != objAuditFileDetails_New[objKey] ? "highlight" : ""} >
                                                                        <td className="auditId">{objKey}</td>
                                                                        <td className="auditId">{(objKey.toLowerCase() == "dtcreatedon" || objKey.toLowerCase() == "dtmodifiedon") ? this.RenderDateTimeinGermanFormat(objAuditFileDetails_Old[objKey]) : objAuditFileDetails_Old[objKey]}</td>
                                                                        <td className="auditId">{(objKey.toLowerCase() == "dtcreatedon" || objKey.toLowerCase() == "dtmodifiedon") ? this.RenderDateTimeinGermanFormat(objAuditFileDetails_New[objKey]) : objAuditFileDetails_New[objKey]}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </table>
                                                </div>
                                            )
                                        })
                                    }
                                </td>);
                        })
                    }
                </tr>)
        }
        else {
            return (<div>
                <h3>{this.props.objTextResource["NoAuditDataText"]}</h3>
            </div>);
        }
    }

    render() {
        return (
            this.state.blnShowAnimation ? <Animation blnShowAnimation={this.state.blnShowAnimation} /> : this.LoadAuditDetails()
        )
    }
}

export default MemberSyncAuditFileData;