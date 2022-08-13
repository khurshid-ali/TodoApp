import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import {FaEdit, FaTrashAlt, FaCheckSquare} from 'react-icons/fa';


function ItemsList({items, editItem, deleteItem, completeItem}) {

    const spanStyle = {
        paddingTop:'10px'
    };


    return items.map((item) => (
        <div key={item.id}>
            <div style={spanStyle}>
                <Alert variant={item.isComplete? 'secondary':'primary'}>
                    <span>
                        {item.description}
                    </span>
                    <ButtonGroup>
                        <Button onClick={() => completeItem(item.id)}><FaCheckSquare /></Button>
                        <Button onClick={() => editItem(item.id)}><FaEdit /></Button>
                        <Button onClick={() => deleteItem(item.id)}><FaTrashAlt /></Button>
                    </ButtonGroup>
                </Alert>
            </div>
        </div>
    ));
}

export default ItemsList