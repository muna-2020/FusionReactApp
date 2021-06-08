// React related imports.
import React from 'react';

/**
 * @name Extras
 * @param {object} props props
 * @summary This component is used for Extras in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const Extras = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'Extras') + ":"}</h3>
            <table>
                {props.Data.TestData.strTestUsage == "LowStake" || props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Survey" || props.Data.TestData.strTestUsage == "Wrapper" ? 
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Price')}</td><td>{Localization.CurrencyFormatter(props.Data.TestData.dPrice)}</td></tr>
                    : <div />}
                <tr><td>{Localization.TextFormatter(objTextResource, 'Owner')}</td><td>{props.Data.TestData.strOwner}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'EditedBy')}</td><td>{props.Data.TestData.strEditedBy}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'CreatedOn')}</td><td>{Localization.DateFormatter(props.Data.TestData.dtCreatedOn)}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'EditedOn')}</td><td>{Localization.DateFormatter(props.Data.TestData.dtModifiedOn)}</td></tr>                         
            </table>
        </div>
    }
    return (
         GetContent()
    );
};

export default Extras;
