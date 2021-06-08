//React Related Import
import React from 'react';
import { withRouter } from 'react-router-dom';

//Module Imports
import ResultPageText from '@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageText/ResultPageText';
import ResultPageTextByRange from '@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageTextByRange/ResultPageTextByRange';
import ResultPageCertificate from '@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageCertificate/ResultPageCertificate';

/**
 * @name StandardResultLayout
 * @param {object} props props object
 * @summary Standard Result Layout
 * @returns null
 */
const StandardResultLayout = (props) => {
    return (
        <div>
        <table className="resultHead">
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="Headerstart">
                        <div className="IdNum"></div>
                        <div className="logo"></div>
                    </td>
                    <td></td>
                    <td><p></p></td>
                </tr>
                <tr className="topClientTitle"><td colSpan={5}><span>SCHLUSSSEITE</span></td>
                </tr>
            </tbody>
        </table>
        <div className="resultWrapper">
                <ResultPageText {...props} />
                <ResultPageTextByRange {...props} />
                <ResultPageCertificate {...props} />
        </div>
        </div>
    )
}

export default StandardResultLayout;