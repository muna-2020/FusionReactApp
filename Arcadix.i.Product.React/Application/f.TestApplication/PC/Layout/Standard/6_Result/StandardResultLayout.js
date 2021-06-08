//React Related Import
import React from "react";

//Module Imports
import ResultPageText from "@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageText/ResultPageText";
import ResultPageTextByRange from "@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageTextByRange/ResultPageTextByRange";
import ResultPageCertificate from "@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageCertificate/ResultPageCertificate";

/**
 * @name StandardResultLayout
 * @param {object} props props object
 * @summary Standard Result Layout
 * @returns null
 */
const StandardResultLayout = (props) => {
  return (
    <div className="result-page-container">
        <div className="result-page-header">
            <div className="header-left-block">
                <span>SCHLUSSSEITE</span>
            </div>
            <div className="logo-image">
                <img src={props.TestState.Logo} alt="" />
            </div>
            <div className="header-right-block"></div>
        </div>
        <div className="result-page-text">
            <ResultPageText {...props} />
            <ResultPageTextByRange {...props} />
              {/*<ResultPageCertificate {...props} />*/}
        </div>
    </div>
  );
};

export default StandardResultLayout;
