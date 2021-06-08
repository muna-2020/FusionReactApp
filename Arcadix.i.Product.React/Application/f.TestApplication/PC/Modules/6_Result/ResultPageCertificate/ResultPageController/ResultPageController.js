//For Loading Component
import loadable from '@loadable/component'

/**
 * @name ResultControl
 * @summary Contains path to StandardResult
 * @returns null
 */
const ResultControl = {    
    StandardCertificate: function () {
        return loadable(() => import(/* webpackChunkName: "StandardCertificate" */ '@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageCertificate/ResultPageController/StandardCertificate/StandardCertificate'));
    }    
};

/**
 * @name ResultFormController
 * @summary Getting Result Control
 * @returns null
 */
const ResultPageController = {
    GetResultControl: function (strResultControlName) {
        if (ResultControl[strResultControlName]) {
            return ResultControl[strResultControlName]();
        }
        else {
            console.error('%cno such ResultControl exists', 'background: beige; color: red; font-weight: bold');
            return undefined;
        }
    }
}

export default ResultPageController ;