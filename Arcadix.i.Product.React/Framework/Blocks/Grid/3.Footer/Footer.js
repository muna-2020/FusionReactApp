// React related imports.
import React from 'react';

//Components used in module.
import Pagination from '@root/Framework/Blocks/Grid/3.Footer/Pagination/Pagination';

//Helper File.
import * as Localization from "@root/Framework/Blocks/Localization/Localization";

/**
 * @name Footer
 * @param {*} props
 * @summary The Footer is designed to display the number of rows or the pagination.
 * @returns {object} React.Fragement that encapsulated the Footer.
 */
const Footer = props => {

    /**
     * @name DataFooter
     * @sumarry Forms JSX for the Footer 
     * @returns {jsx} JSX of the footer
     */
    const GetContent = () => {
        let Footer = null;
        if (props.Meta.AllowPaging == "Y") {
            Footer = <Pagination
                Id={props.Id}
                Data={{
                    RowsPerPage: props.Data.RowsPerPage,
                    TotalRowCount: props.Data.TotalRowCount,
                    PageNumber: props.Data.PageNumber
                }}
                ParentProps={{ ...props, ...props.ParentProps }}
                Events={{ PageNumberClick: props.Events.PageNumberClick }}
            />
        }
        else {
            let strFooterText = Localization.TextPluralFormatter(props.Resource.Text, "FooterText", props.Data.Count);
            Footer = strFooterText.length == 0 ? <React.Fragment /> : <React.Fragment>({strFooterText})</React.Fragment >;
        }
        return (
            <div className="grid-footer" id={props.Id}>{Footer}</div>
        );
    };

    return GetContent();
};

export default Footer;