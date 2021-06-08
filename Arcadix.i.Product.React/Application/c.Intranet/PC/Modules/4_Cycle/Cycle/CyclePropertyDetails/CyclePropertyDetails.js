//React related imports...
import React from "react";

/**
 * @name CyclePropertyDetails
 * @param {object} props props
 * @summary This component displays the Cycle property details.
 * @returns {object} jsx.
 */
const CyclePropertyDetails = props => {

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        var objCycleData = props.Data.CycleData ?? {};
        let objTextResource = props.Resource.Text ?? [];
        return <div className="file-explorer-detail">
            <WrapperComponent
                ComponentName={"FillHeight"}
                Meta={{
                    HeaderIds: ["MasterHeader", "TaskTitle", "FilterBlock", "BreadCrumb"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <h2>{Localization.TextFormatter(objTextResource, 'CycleProperties')}</h2>
                <h3>{Localization.TextFormatter(objTextResource, 'BasicProperty')}</h3>

                <table>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsCycleId')}</td>
                        <td>{objCycleData["uCycleId"]}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'CycleName')}</td>
                        <td>{objCycleData["vCycleName"]}</td>
                    </tr>

                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsReps')}</td>
                        <td>{objCycleData["iCycleNumberOfRepetitions"]}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsArchiveSchool')}</td>
                        <td>{props.Events.GetYesOrNo(objTextResource, objCycleData["cIsArchiveSchool"])}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsArchiveTeacher')}</td>
                        <td>{props.Events.GetYesOrNo(objTextResource, objCycleData["cIsArchiveTeacher"])}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsExternalAccessAllowed')}</td>
                        <td>{props.Events.GetYesOrNo(objTextResource, objCycleData["cIsExternalAccessAllowed"])}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsActive')}</td>
                        <td>{props.Events.GetYesOrNo(objTextResource, objCycleData["cIsActive"])}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsKeyword')}</td>
                        <td>{objCycleData["vKeyword"]}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsResultsDatabase')}</td>
                        <td>-</td>
                    </tr>

                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsCreatedOn')}</td>
                        <td>{Localization.DateFormatter(objCycleData["dtCreatedOn"], props.Resource.JConfiguration["LanguageCultureInfo"])}</td>
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'DetailsModifiedOn')}</td>
                        <td>{Localization.DateFormatter(objCycleData["dtModifiedOn"])}</td>
                    </tr>
                </table>

                <h3>{Localization.TextFormatter(objTextResource, 'Description')}</h3>
                <span>{objCycleData["tCycleDescription"]}</span>
            </WrapperComponent>
        </div>
    }

    return (
        props.Data.CycleData ? GetContent() : <React.Fragment />
    );
};

///**
// * @name DynamicStyles
// * @param {object} props props
// * @summary required for loading the CSS
// * @returns {array} arrStyles
// */
//CyclePropertyDetails.DynamicStyles = props => {
//    var arrStyles = [
//        props.Resource.JConfiguration.IntranetSkinPath +
//        "/Css/Application/ReactJs/PC/Modules/Task/TaskDetails/TaskDetails.css"
//    ];
//    return arrStyles;
//};

export default CyclePropertyDetails;
