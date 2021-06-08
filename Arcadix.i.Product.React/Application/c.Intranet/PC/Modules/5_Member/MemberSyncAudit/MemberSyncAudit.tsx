import * as React from 'react';
import { withRouter } from 'react-router-dom';
import TestDriveDataService from '../../../../../Framework/DataService/TestDriveDataService';
import './MemberSyncAudit.css';

class MemberSyncAudit extends React.Component<any, any>{

    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div>
                MemberSyncAudit
            </div>
        )
    }
}

export default withRouter(MemberSyncAudit);
