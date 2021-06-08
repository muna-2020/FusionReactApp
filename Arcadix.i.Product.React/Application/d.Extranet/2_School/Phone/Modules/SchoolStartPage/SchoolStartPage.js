//React related imports.
import React from 'react';

/**
* @name SchoolStartPage
* @param {object} props props
* @summary This component displays the SchoolStartPage data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with SchoolStartPage details.
*/
const SchoolStartPage = (props) => {

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        var jsxReturn =
            (<div>
                SchoolStartPage
            </div>);

        return jsxReturn;
    };

    return GetContent();
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default SchoolStartPage;