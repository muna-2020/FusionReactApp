import { connect } from "react-redux";
import React, {
    useEffect,
    } from "react";
import * as TestBussinessLogic from '@shared/Application/c.Intranet/Modules/3_Test/TestBusinessLogic';

const TestDetail = props => {

    useEffect(() => {

    }, [props.TestDetail]);

    const GetContent = () => {
        var objTestData = props.TestData;
        var objTextResource = props.objTextResource;
        return (<div className="file-explorer-detail">
            <WrapperComponent
                ComponentName={"FillHeight"} id={"FillHeight_" + props.Id}
                Meta={{
                    HeaderIds: ["Header", "TaskTitle", "filterHeader", "OfflineExecution"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <h2>{objTextResource.General}</h2>
                <h3>{objTextResource.KeyFeatures}</h3>

                <table>
                    <tr>
                        <td>{objTextResource.Name}</td>
                        <td>{objTestData.vTestName}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource.Number}</td>
                        <td>{objTestData.iPageId}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource.Owner}</td>
                        <td>{"======="}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource.EditedBy}</td>
                        <td>{objTestData.uModifiedById}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource.CreatedOn}</td>
                        <td>{objTestData.dtCreatedOn}</td>
                    </tr>
                    <tr>
                        <td>{objTextResource.EditedOn}</td>
                        <td>{objTestData.dtModifiedOn}</td>
                    </tr>
                </table>


                <h3>Extra:</h3>
                <table>
                    <tr>
                        <td>{objTextResource.PricePerTest}</td>
                        <td>{objTestData.dPrice ? Localization.CurrencyFormatter(objTestData.dPrice) : "-"}</td>
                        <td>{objTestData.dPrice ? Localization.NumberFormatter(objTestData.dPrice) : "-"}</td>
                    </tr>
                </table>

            </WrapperComponent>
        </div>
        )

    }

    return (

        props.TestData ? GetContent() : <React.Fragment />
    );
};

TestDetail.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.IntranetSkinPath +
        "/Css/Application/ReactJs/PC/Modules/Test/TestDetails/TestDetails.css"
    ];
    return arrStyles;
};
export default connect(TestBussinessLogic.mapStateToProps)(TestDetail);
