/**
* @DisplayName GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {
    let SuggestionData = [
        {
            ValueColumn: '1',
            DependingTableName: [
                {
                    DisplayName: "india"
                },
            ]
        },
        {
            ValueColumn: '2',
            DependingTableName: [
                {
                    DisplayName: "ind"
                },
            ]
        },
        {
            ValueColumn: '3',
            DependingTableName: [
                {
                    DisplayName: "i"
                },
            ]
        },
        {
            ValueColumn: '4',
            DependingTableName: [
                {
                    DisplayName: "indiasdf"
                },
            ]
        },
        {
            ValueColumn: '5',
            DependingTableName: [
                {
                    DisplayName: "inia"
                },
            ]
        }
    ]; //Suggestion Data to control.

    return {
        SuggestionData,
        //SelectedValue: "1" //pre selected value.
    };
};