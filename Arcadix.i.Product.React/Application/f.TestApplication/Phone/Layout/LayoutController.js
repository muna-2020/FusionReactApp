//Module Import
import loadable from '@loadable/component'

/**
 * @name Layout
 * @param {object}  
 * @summary Layout method contains path for Layout.
 * @returns null
 */
const Layout = {
    Standard: {
        StandardPreLoginLayout: function () {
            return loadable(() => import(/* webpackChunkName: "StandardPreLoginLayout" */ '@root/Application/f.TestApplication/PC/Layout/Standard/2_PreLogin/StandardPreLoginLayout'));
        },
        StandardLoginLayout: function () {
            return loadable(() => import(/* webpackChunkName: "StandardLoginLayout" */ '@root/Application/f.TestApplication/Phone/Layout/Standard/3_Login/StandardLoginLayout'));
        },
        StandardIntroductionLayout: function () {
            return loadable(() => import(/* webpackChunkName: "StandardIntroductionLayout" */ '@root/Application/f.TestApplication/Phone/Layout/Standard/4_Introduction/StandardIntroductionLayout'));
        },
        StandardTaskLayout: function () {
            return loadable(() => import(/* webpackChunkName: "StandardTaskLayout" */ '@root/Application/f.TestApplication/Phone/Layout/Standard/5_Task/StandardTaskLayout'));
        },
        StandardResultLayout: function () {
            return loadable(() => import(/* webpackChunkName: "StandardResultLayout" */ '@root/Application/f.TestApplication/PC/Layout/Standard/6_Result/StandardResultLayout'));
        },  
    }
};

/**
 * @name LayoutController
 * @param {object}
 * @summary Get Layout Name
 * @returns null
 */
const LayoutController = {
    GetLayout: function (strLayout, strPage) {   
  
        strPage = strLayout + strPage + "Layout";
        if (Layout[strLayout]) {
            if (Layout[strLayout][strPage]) {                
                try {
                    return Layout[strLayout][strPage]();
                }
                catch (error) {
                    console.error("Layout Import Error", error);
                }
            }
            else {
                console.error('%cthis page doesnt exist in this layout', 'background: beige; color: red; font-weight: bold');
                return undefined;
            }  
        }
        else {
            console.error('%cno such layout exists','background: beige; color: red; font-weight: bold');
            return undefined;
        }
    }
}

export default LayoutController;