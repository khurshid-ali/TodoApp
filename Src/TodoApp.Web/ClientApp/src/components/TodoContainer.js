import React, {useState, useEffect} from 'react';
import ItemEditor from './ItemEditor';
import ItemsList from './ItemsList';

function TodoContainer(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await fetch('todo');
            const data = await response.json();
            setItems(data);
        };

        getData();
    }, []);

    
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
        const createdItem = await response.json();
        const newItems = [createdItem, ...items];
        setItems(newItems);
    };

    const editItem = item => {
        console.log("Edit item " + item);
    };

    const deleteItem = async id => {

        const delResp = await fetch('todo/'+id, {
            method:'DELETE'
        });
        
        console.log(delResp);

        console.log("delete item " + id);
        const newArray = [...items].filter(x => x.id !== id);
        setItems(newArray);
    };

    const completeItem = id => {
        console.log("complete item " + id);
        let updatedItems = items.map(item => {
            if(item.id === id){
                item.IsComplete = !item.IsComplete;
            }
            return item;
        });
        setItems(updatedItems)
    };



    return (
        <div>
            <ItemEditor onAdd={addItem}/>
            <ItemsList 
                items={items} 
                editItem={editItem}
                deleteItem={deleteItem}
                completeItem={completeItem}
            />
        </div>
    )
}

export default TodoContainer;