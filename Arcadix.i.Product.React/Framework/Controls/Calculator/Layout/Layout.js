import React from 'react';

/**
 * @name Layout
 * @param {object} props props
 * @summary This component displays the respective calculator layout.
 * @returns {object} component JSX.
 */
const Layout = props => {
    const CalculatorLayout = props.Data.ComponentController.GetComponent(props.Data.CalculatorType ? props.Data.CalculatorType: "Standard");
    return (
        <React.Fragment>
            <CalculatorLayout {...props} />
        </React.Fragment>
    );
}

export default Layout;