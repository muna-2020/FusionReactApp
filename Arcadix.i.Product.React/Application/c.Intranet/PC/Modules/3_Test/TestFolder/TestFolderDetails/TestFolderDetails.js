//React related imports...
import React, { useReducer } from "react";
import { connect } from 'react-redux';

//Module related files...
import TestFolderDetails_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/TestFolderDetails/TestFolderDetails_ModuleProcessor';
import * as TestFolderDetails_Hook from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/TestFolderDetails/TestFolderDetails_Hook';
import BasicProperty from '@root/Application/c.Intranet/PC/Modules/3_Test/TestFolder/TestFolderDetailsComponents/BasicProperties/BasicProperties';
import Language from '@root/Application/c.Intranet/PC/Modules/3_Test/TestFolder/TestFolderDetailsComponents/Language/Language';

/**
 * @name TestFolderDetails
 * @param {object} props props
 * @summary This component displays the Test Folder details.
 * @returns {object} jsx.
 */
const TestFolderDetails = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TestFolderDetails_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestFolderDetails", ["TestFolderDetails_ModuleProcessor"]: new TestFolderDetails_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TestFolderDetails_Hook.Initialize(objContext);

    /**
      * @name GetContent
      * @summary Forms the whole jsx required for the module.
      * @returns {object} jsx
      */
    const GetContent = () => {
        let objTestFolderData = objContext.TestFolderDetails_ModuleProcessor.GetTestFolderDetails(props.SelectedRow, objContext);
        return (<div className="file-explorer-detail">
            <WrapperComponent
                ComponentName={"FillHeight"}
                id={"FillHeight_" + props.Id}
                Meta={{
                    HeaderIds: ["MasterHeader", "TaskTitle", "filterHeader", "BreadCrumb", "OfflineExecution", "FilterBlock"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <h2>{Localization.TextFormatter(props.TextResource, 'Folder')}</h2>
                <BasicProperty
                    Data={{
                        TestFolderData: objTestFolderData
                    }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />

                <Language Data={{
                    TestFolderData: objTestFolderData
                }}
                    Resource={{
                        Text: props.TextResource
                    }}
                />
            </WrapperComponent>
        </div>
        )
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <div className="file-explorer-detail-empty-message" />;

};

export default connect(IntranetBase_Hook.MapStoreToProps(TestFolderDetails_ModuleProcessor.StoreMapList()))(TestFolderDetails);