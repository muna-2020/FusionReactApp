/**
 * @name GetInitialState
 * @param {any} props component props.
 * @returns {any} initial state object.
 * @summary return initial state of  the component.
 */
export const GetInitialState = (props) => {
    let arrColorPalette = [
        "#a2b9bc",
        "#b2ad7f",
        "#878f99",
        "#6b5b95",
        "#d64161",
        "#ff7b25",
        "#800000",
        "#FF0000",
        "#1b9ebc",
        "#808000",
        "#008000",
        "#800080",
        "#FF00FF",
        "#00FF00",
        "#008080",
        "#00FFFF",
        "#0000FF",
        "#a41adf",
        "#ffcc00",
        "#ff0066"
    ];
    return {
        arrColorPalette: arrColorPalette,
        arrBlnShowBorderColor: arrColorPalette.map((color) => { return false; }),
        arrSelectedColors: []
    };
}