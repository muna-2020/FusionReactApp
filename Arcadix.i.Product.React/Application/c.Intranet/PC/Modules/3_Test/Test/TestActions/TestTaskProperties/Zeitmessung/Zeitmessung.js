import React from 'react';
import DisplayGrid from '@root/Framework/Blocks/Grid/Grid';

const Zeitmessung = props => {
    return (
        <React.Fragment>
            <DisplayGrid
                RowData={props.RowData}
                Header={props.Header}
                ResourceText={props.ResourceText}
                ColumnTextResource={props.ColumnTextResource}
                JConfiguration={props.JConfiguration}
                MainClientLanguageData={props.MainClientLanguageData}
                LanguageData={props.LanguageData}
                DropDownData={props.DropDownData}
                ImagePath={props.ImagePath} />
        </React.Fragment>
    )
}

export default Zeitmessung;