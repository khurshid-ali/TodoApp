import React, {useState, useEffect} from 'react';
import ItemEditor from './ItemEditor';
import ItemsList from './ItemsList';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

function TodoContainer(props) {
    const [items, setItems] = useState([]);
    const [errors, setError] = useState('');
    const [showErrorAlert, setShow] = useState(false);
    
    const stackStyle = {
        marginTop:'20px',
        backgroundColor:'DarkBlue',
        padding:'10px',
        borderRadius:'15px'
    };

    const headingStyle = {
        color:"white",
        FontFace:'Bold',
        width:'100%',
        textAlign:'center'        
    }

    const setSortedItems = itemsList => {
        var sorted = [...itemsList.filter(x => !x.isComplete).sort((a,b)=>(
            a.id < b.id? 1:-1
        ))];

        setItems([...sorted, ...itemsList.filter(x => x.isComplete)])
    };

    useEffect(() => {
        async function getData() {
            try {

                const response = await fetch('todo');
                if (response.ok){
                    const data = await response.json();
                    setSortedItems(data);
                }
                else {
                    throw "Errors occured while retrieveing the list.";
                }

            } catch (exc) {
                handleError(exc);
            }
        };
        
        getData();
    }, []);

    /*
        addItem()
    */
    const addItem = async item => {
        try {
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

            if (!response.ok){
                throw 'Error: Could not add item to db.';
            }
            

            const createdItem = await response.json();
            const newItems = [createdItem, ...items];
            setSortedItems(newItems);
        }catch (exc){
            handleError(exc);
        }        
    };

    /*
        editItem()
    */
    const editItem = async item => {

        try {

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
    
            if (!patchResp.ok){
                
                throw 'Error: Could not update item.';
            }
            
            const entity = await patchResp.json(); 
            let updatedItems = [...items].filter(x => x.id !== item.id);
            updatedItems.push(entity);
            setSortedItems(updatedItems);

        } catch (exc) {
            handleError(exc);
        }
    };

    /*
        deleteItem()
    */
    const deleteItem = async id => {
        try {
            const delResp = await fetch('todo/'+id, {
                method:'DELETE'
            });
            
            if (!delResp.ok)
            {
                throw 'Error: Could not delete item.';
            }
            

            console.log("delete item " + id);
            const newArray = [...items].filter(x => x.id !== id);
            setSortedItems(newArray);

        } catch(exc) {
            handleError(exc);
        }        
    };

    /*
        completeItem()
    */
    const completeItem = async id => {
        try {
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
    
            if (!completeResp.ok) {
                throw 'Error: Could not mark item with id ' + id +  ' as complete.';
            }
            
            
            console.log("complete item " + id);
            const updatedItem = await completeResp.json();
            let updatedItems = [...items].filter(x => x.id !== id);
            updatedItems.push(updatedItem);
            setSortedItems(updatedItems);

        } catch (exc) {
            handleError(exc)
        }        
    };

    const handleError = error => {
        setShow(true);
        setError(error);
        console.error(error);
    };



    return (
        <Stack style={stackStyle}>
            <div style={headingStyle}>
                <h1>Add an item to the Todo List.</h1>
            </div>
            <div style={{textAlign:'center', marginTop:'15px'}}>
                <ItemEditor onAdd={addItem}/>
            </div>

            {errors && showErrorAlert ? (
                    <div style={{marginTop:'10px',paddingTop:'20px'}}>
                        <Alert variant='danger' onClose={() => setShow(false)} dismissible>{errors}</Alert>
                    </div>
                ):            
                null       
            }
            {items.length > 0 ? 
                <ItemsList 
                    items={items} 
                    editItem={editItem}
                    deleteItem={deleteItem}
                    completeItem={completeItem}
                /> 
            : null }
        </Stack>
    )
}

export default TodoContainer;