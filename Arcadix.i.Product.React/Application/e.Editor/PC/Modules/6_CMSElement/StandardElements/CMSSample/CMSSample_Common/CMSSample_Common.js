//React imports
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * @name CMSSample_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSSample
 * @returns {any} returns the cms Sample's JSX
 */

const CMSSample_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    let ListValues = [];
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState([]);

    /**
     * @name GetContent
     * @summary Render the Sample body
     * @returns {any} Returns the JSX for the Sample.
     */


    const GetContent = () => {

        const addItems = () => {
            setItems([...items, {
                id: 'List' + items.length,
                value: 'List ' + items.length
            }]);
        };

        const removeItems = idx => {
            const temp = [...items];
            temp.pop();
            setItems(temp);
        };

        function handleChange(e) {
            ListValues = [];
            setStatus([...status, {
                ListValues: ListValues.push(e.target.value)
            }]);
            console.clear();
            console.log(ListValues);
        }

        return (

            <div ielementid={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]} onContextMenu={(event) => {
                Events.OpenContextMenu(event, { 'ContextMenuParams': 'ContextMenu' });
            }}
            >

                <button className='sampleapp-button' onClick={addItems}>Add</button>
                <button className='sampleapp-button' onClick={removeItems}>Remove</button>
                <ul>
                    {items.map(item => (
                        <div>
                            <input type="checkbox" key={item.id + 1} id={item.id} className="sampleList" onChange={handleChange} />
                            <span className="checkmark" key={item.id}>{item.value}</span>
                        </div>
                    ))}
                </ul>

            </div>
        );
    };

    return GetContent();
};
CMSSample_Common.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSSample/CMSSampleStyles.css"
    ];
};

export default CMSSample_Common;
