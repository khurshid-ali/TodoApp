import React, {useState, useEffect} from 'react';
import ItemEditor from './ItemEditor';
import ItemsList from './ItemsList';
import Stack from 'react-bootstrap/Stack';

function TodoContainer(props) {
    const [items, setItems] = useState([]);
    
    const stackStyle = {
        marginTop:'20px',
        backgroundColor:'darkblue',
        padding:'10px',
        borderRadius:'15px'
    };

    useEffect(() => {
        async function getData() {
            const response = await fetch('todo');
            const data = await response.json();
            setItems(data);
        };

        getData();
    }, []);

    /*
        addItem()
    */
    const addItem = async item => {
        const response = await fetch('todo', 
            {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: item.description
                })
            }
        );

        if (response.ok){
            const createdItem = await response.json();
            const newItems = [createdItem, ...items];
            setItems(newItems);
        }
        else {
            console.log("Could not add item to db. Error: " + response.statusText);
        }
        
    };

    /*
        editItem()
    */
    const editItem = async item => {
        const patchResp = await fetch('todo/' + item.id, {
            method:'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify([
                {Key: 'Description',Value: item.description}
            ])
        });

        if (patchResp.ok){
            const entity = await patchResp.json(); 
            let updatedItems = [...items].filter(x => x.id !== item.id);
            updatedItems.push(entity);
            setItems(updatedItems);

        }
        else {
            console.log("Could not update item with id " + item.id + " error: " + patchResp.statusText);
        }
        console.log("Edit item " + item.id + "value:" + item.description);
    };

    /*
        deleteItem()
    */
    const deleteItem = async id => {

        const delResp = await fetch('todo/'+id, {
            method:'DELETE'
        });

        console.log(delResp);
        
        if (delResp.ok)
        {
            console.log("delete item " + id);
            const newArray = [...items].filter(x => x.id !== id);
            setItems(newArray);
        }
        else 
        {
            console.log('Could not delete item with id ' + id + '. Error : ' + delResp.statusText);
        }
    };

    /*
        completeItem()
    */
    const completeItem = async id => {

        const completeResp = await fetch('todo/' + id, {
            method:'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify([
                {Key: 'IsComplete',Value: 'true'}
            ])
        });

        if (completeResp.ok) {
            console.log("complete item " + id);
            const updatedItem = await completeResp.json();
            let updatedItems = [...items].filter(x => x.id !== id);
            updatedItems.push(updatedItem);
            setItems(updatedItems);           
        }
        else 
        {
            console.log("Could not update item with id " + id + " error: " + completeResp.statusText);
        }        
    };



    return (
        <Stack style={stackStyle}>
            <ItemEditor onAdd={addItem}/>
            <ItemsList 
                items={items} 
                editItem={editItem}
                deleteItem={deleteItem}
                completeItem={completeItem}
            />
        </Stack>
    )
}

export default TodoContainer;