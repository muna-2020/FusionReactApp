
/**
 * @name GetInitialState
 * @param {object} props component props.
 * @returns {any} initial state object.
 * @summary return initial state of  the component.
 */
export const GetInitialState = (props) => {
    return {
            strActiveFont: "Tahoma",
            blnShowFonts: false,
            intActiveFontSize: 14,
            blnShowFontSizes: false,
            blnShowFontColorPalate: false,
            blnShowBckgColorPalate: false,
            strActiveFontColor: "",
            strActiveBckgColor: "",
            blnShowLineHeight: false,
            strLineHeight: "",
            strActiveStyleClass : "",
    };
}