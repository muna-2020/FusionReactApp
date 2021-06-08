/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    //The NodeData is an array of objects to hold the Node Data.
    const NodeData = [
            { id: 1, pid: 'root', name: 'Discover Music' },
            { id: 2, pid: 1, name: 'Live Music' },
            { id: 3, pid: 1, name: 'Live Concert' },
            { id: 4, pid: 'root', name: 'Singles'},
            { id: 5, pid: 'root', name: 'Rising Artists' },
            { id: 6, pid: 'root', name: 'Live Music' },
            { id: 7, pid: 4, name: 'Sales and Events' },
            { id: 8, pid: 4, name: '100 Albums - $5 Each' },
            { id: 9, pid: 4, name: 'Hip-Hop and R&B Sale' },
            { id: 10, pid: 4, name: 'CD Deals' },
            { id: 11, pid: 10, name: 'amazon' },
            { id: 12, pid: 10, name: 'Songs' },
            { id: 13, pid: 10, name: 'Bestselling Albums' },
            { id: 14, pid: 10, name: 'New Releases' },
            { id: 15, pid: 10, name: 'Bestselling Songs' },
            { id: 16, pid: 15, name: 'MP3 Albums' },
            { id: 17, pid: 16, name: 'Rock' },
            { id: 18, pid: 16, name: 'Gospel' },
            { id: 19, pid: 16, name: 'Latin Music' },
            { id: 20, pid: 16, name: 'Jazz' },
            { id: 21, pid: 20, name: 'More in Music' },
            { id: 22, pid: 21, name: 'Music Trade-In' },
            { id: 23, pid: 21, name: 'Redeem a Gift Card' },
            { id: 24, pid: 21, name: 'Band T-Shirts' },
            { id: 25, pid: 6, name: 'Fiction Book Lists' },
            { id: 26, pid: 5, name: 'To Kill a Mockingbird' },
            { id: 27, pid: 25, name: 'Pride and Prejudice' },
            { id: 28, pid: 25, name: 'Harry Potter' },
            { id: 29, pid: 25, name: 'The Hobbit' }
        ]; 

    return {
        NodeData //The NodeData is an array of objects to hold the Node Data.
    };
};