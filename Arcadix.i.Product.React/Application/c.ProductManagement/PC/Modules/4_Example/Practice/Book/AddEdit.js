import React from 'react';

const AddEdit = (props) => {
    return (
        <table>
            <tr>
                <td>GenreId</td>
                <td><input type="text" value={props.value ? props.value.iGenreId : null} onChange={(e) => console.log(e.target.value)} /></td>
            </tr>
            <tr>
                <td>Edition</td>
                <td><input type="text" value={props.value ? props.value.iEdition: null} /></td>
            </tr>
            <tr>
                <td>BookName</td>
                <td><input type="text" value={props.value ? props.value.t_Fusion_Demo_Book_Data[0].vBookName: null } /></td>
            </tr>
            <tr>
                <td>Author</td>
                <td><input type="text" value={props.value ? props.value.t_Fusion_Demo_Book_Data[0].vAuthor: null} /></td>
            </tr>
            <tr>
                <td>Publisher</td>
                <td><input type="text" value={props.value ? props.value.t_Fusion_Demo_Book_Data[0].vPublisher: null} /></td>
            </tr>
            <tr>
                <td>LanguageId</td>
                <td><input type="text" value={props.value ? props.value.t_Fusion_Demo_Book_Data[0].iLanguageId: null} /></td>
            </tr>
            <tr>
                <button>Add</button>
                <button>Edit</button>
            </tr>
        </table>
        );
}

export default AddEdit;