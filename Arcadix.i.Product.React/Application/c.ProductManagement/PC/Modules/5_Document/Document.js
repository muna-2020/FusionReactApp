//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as Document_Hook from '@shared/Application/c.ProductManagement/Modules/5_Document/Document_Hook';
import Document_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/5_Document/Document_ModuleProcessor';

//Components used...
import SignalRClass from '@shared/Framework/Services/SignalRClass/SignalRClass';

//In-line Image imports...
import CopyImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Copy.svg?inline';
import CutImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cut.svg?inline';
import PasteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Paste.svg?inline';
import NewImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/New_Large.svg?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Edit_Large.svg?inline';
import DeleteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Delete_Large.svg?inline';
import CheckInImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/check_in.svg?inline';
import CheckGreyImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/check_grey.svg?inline';
import CheckOutImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/check_out.svg?inline';
import ReadWriteImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/readwrite.svg?inline';
import ReadOnlyImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/readonly.svg?inline';
import DownloadImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/download.svg?inline';

/**
* @name Document
* @param {object} props props
* @summary This component displays the Document data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Document details.
*/
const Document = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Document_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Document", ["Document_ModuleProcessor"]: new Document_ModuleProcessor(), ["SignalRClass"]: new SignalRClass(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @param {object} ModuleProcessor Props
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Document_ModuleProcessor.Initialize(objContext, objContext.Document_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    Document_Hook.Initialize(objContext);

    /**
     * @name useSignalRConnection
     * @param {object} objContext context object
     * @summary Initialize method Initialize the SignalR connection.
     * @returns null
     */
    Document_Hook.useSignalRConnection(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        return <div className="subject-container" id="Document">
            <Grid
                Id="DocumentGrid"
                Meta={objContext.Document_ModuleProcessor.GetDocumentMetaData(objContext)}
                Data={objContext.Document_ModuleProcessor.GetDocumentGridData(objContext)}
                Resource={objContext.Document_ModuleProcessor.GetResourceData(objContext)}
                Events={objContext.Document_ModuleProcessor.GetDocumentGridEvents(objContext)}
                CallBacks={objContext.Document_ModuleProcessor.GetDocumentGridCallBacks(objContext)}
                ParentProps={{ ...props }}
            />
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
};

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        CopyImage: CopyImage,
        CutImage: CutImage,
        PasteImage: PasteImage,
        NewImage: NewImage,
        EditImage: EditImage,
        DeleteImage: DeleteImage,
        CheckInImage: CheckInImage,
        CheckGreyImage: CheckGreyImage,
        CheckOutImage: CheckOutImage,
        ReadOnlyImage: ReadOnlyImage,
        ReadWriteImage: ReadWriteImage,
        DownloadImage: DownloadImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(Document_ModuleProcessor.StoreMapList()))(Document);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Document_ModuleProcessor;