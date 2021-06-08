//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name Pagination_ComponentProcessor.
* @summary Class for GridPagination.
*/
class Pagination_ComponentProcessor extends Base_ModuleProcessor {

    /**
    * @name OnPageNumberChange
    * @param {string} strValue
    * @param {object} objContext context object
    * @summary To change the page on entering the page number and make a callback.
    */
    OnPageNumberChange(strValue, objContext) {
        let intPageNumber, intTotalPages = Math.ceil(objContext.props.Data.TotalRowCount / objContext.props.Data.RowsPerPage);
        if (/^\s*$/.test(strValue)) {
            intPageNumber = "";
        }
        else if (isNaN(strValue)) {
            intPageNumber = "";
        }
        else if (strValue > intTotalPages) {
            intPageNumber = intTotalPages;
        }
        else if (strValue < 1) {
            intPageNumber = 1;
        }
        else {
            intPageNumber = parseInt(value);
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": intPageNumber } });
        objContext.props.ParentProps.Events.PageNumberClick(intPageNumber);
    }

    /**
    * @name HandlePagingClick
    * @param {object} objContext context object
    * @param {string} strPagingType
    * @summary To change the page on clicking the navigate icons and make a callback.
    */
    HandlePagingClick(objContext, strPagingType) {
        let intPageNumber, intCurrentPageNumber = objContext.state.intPageNumber, intTotalPages = Math.ceil(objContext.props.Data.TotalRowCount / objContext.props.Data.RowsPerPage);
        switch (strPagingType) {
            case "PreviousPageClick":
                intPageNumber = intCurrentPageNumber == 1 ? 1 : intCurrentPageNumber - 1;
                break;
            case "NextPageClick":
                intPageNumber = intCurrentPageNumber == intTotalPages ? intTotalPages : intCurrentPageNumber + 1;
                break;
            case "FirstPageClick":
                intPageNumber = 1;
                break;
            case "LastPageClick":
                intPageNumber = intTotalPages;
                break;
            case "OnPageNumberChange":
                break;
        }
        objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": intPageNumber } });
        objContext.props.ParentProps.Events.PageNumberClick(intPageNumber);
    }

}

export default Pagination_ComponentProcessor;