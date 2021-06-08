//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files...
import PropertyDisplay_ModuleProcessor from "@shared/Application/c.Intranet/Modules/3_Test/PropertyDisplay/PropertyDisplay_ModuleProcessor";

//Components used...
import TestPropertyDetails from '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetails/TestPropertyDetails';
import TestFolderDetails from '@root/Application/c.Intranet/PC/Modules/3_Test/TestFolder/TestFolderDetails/TestFolderDetails';

/**
* @name PropertyDisplay
* @param {object} props props
* @summary This component displays the Test/TestFolder Properties.
* @returns {object} React.Fragment that encapsulated the display grid with Test details.
*/
const PropertyDisplay = props => {

    const GetContent = () => {
        let objSelectedRow = props.SelectedRows && props.SelectedRows["TestGrid"] ? props.SelectedRows["TestGrid"][0] : null;
        return objSelectedRow ?
            (objSelectedRow.vTestName ?
                <TestPropertyDetails
                    {...props}
                    SelectedRow={objSelectedRow}
                    JConfiguration={props.ParentProps.JConfiguration}
                    //TestData={props.CallBacks.GetTestDisplayData(objSelectedRow)}
                    TextResource={props.Resource.Text}
                />
                :
                <TestFolderDetails
                    {...props}
                    SelectedRow={objSelectedRow}
                    JConfiguration={props.ParentProps.JConfiguration}
                    ComponentController={props.ParentProps.ComponentController}
                    //TestFolderData={props.CallBacks.GetTestFolderDisplayData(objSelectedRow)}
                    TextResource={props.Resource.Text} />
            )
            :
            <div className="file-explorer-detail-empty-message" />
    }

    return GetContent();
}

export default connect(IntranetBase_Hook.MapStoreToProps(PropertyDisplay_ModuleProcessor.StoreMapList()))(PropertyDisplay);