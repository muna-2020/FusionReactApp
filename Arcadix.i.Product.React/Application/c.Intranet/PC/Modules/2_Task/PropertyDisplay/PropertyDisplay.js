//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import PropertyDisplay_ModuleProcessor from "@shared/Application/c.Intranet/Modules/2_Task/PropertyDisplay/PropertyDisplay_ModuleProcessor";

//Components used...
import TaskPropertyDetails from '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetails';
import TaskFolderDetails from '@root/Application/c.Intranet/PC/Modules/2_Task/TaskFolder/TaskFolderDetails/TaskFolderDetails';

/**
* @name PropertyDisplay
* @param {object} props props
* @summary This component displays the Task data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Task details.
*/
const PropertyDisplay = props => {

     /**
      * @name GetContent
      * @summary Returns the content for TaskFolderDtail or TaskPropertyDetails
      * @returns JSX for Grid Properties.
      */
    const GetContent = () => {
        let objSelectedRow = props.SelectedRows && props.SelectedRows["TaskGrid"] ? props.SelectedRows["TaskGrid"][0] : null;
        return objSelectedRow ?
            (objSelectedRow.vPageName ?
                <TaskPropertyDetails
                    {...props}
                    {...props.Data}
                    JConfiguration={props.ParentProps.JConfiguration}
                    SelectedRow={objSelectedRow}
                    TextResource={props.Resource.Text}
                />
                :
                <TaskFolderDetails
                    {...props}
                    {...props.Data}
                    JConfiguration={props.ParentProps.JConfiguration}
                    SelectedRow={objSelectedRow}
                    ComponentController={props.ParentProps.ComponentController}
                    TextResource={props.Resource.Text} />
            )
            :
            <div className="file-explorer-detail-empty-message" ><span>{props.Resource.Text["ErrorEditorPopup_ErrorText"]}</span></div>
    }
    return GetContent();
}

export default connect(IntranetBase_Hook.MapStoreToProps(PropertyDisplay_ModuleProcessor.StoreMapList()))(PropertyDisplay);