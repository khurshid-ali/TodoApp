import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {FaEdit, FaTrashAlt, FaCheckSquare} from 'react-icons/fa';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import ItemEditor from './ItemEditor';


function ItemsList({items, editItem, deleteItem, completeItem}) {
    const [edit, setEdit] = useState({id:null, description:''});

    // const spanStyle = {
    //     paddingTop:'10px'
    // };

    const stackStyle = {
        padding:'10px',
        border: 'solid 1px lightGray',
        marginTop: '15px',
        borderRadius:'15px',
        backgroundColor: 'black'
    };

    const submitUpdate = value => {
        editItem(value);
        console.log('submit update ' + value);
        setEdit({id:null, description:''});
    };

    if (edit.id) 
    {
        return <ItemEditor edit={edit} onSubmit={submitUpdate}/>;
    }

    return (

        <Stack style={stackStyle}>
            {items.map((item) => (
                <Alert key={item.id} variant={item.isComplete? 'primary':'success'}>
                    <Row>
                        <Col className=''><div className='fw-bold'>{item.description}</div></Col>
                        <Col className='align-content-end'>
                        <ButtonGroup className="align-content-end">
                            {!item.isComplete ? 
                                <>
                                    <Button variant='outline-success' onClick={() => completeItem(item.id)}><FaCheckSquare /></Button>
                                    <Button variant='outline-primary' onClick={() => setEdit({id:item.id, description:item.description})}><FaEdit /></Button>
                                </>
                                :
                                null
                            }                            
                            <Button variant='outline-danger' onClick={() => deleteItem(item.id)}><FaTrashAlt /></Button>
                        </ButtonGroup>
                        </Col>
                    </Row>
                </Alert>
            ))}
        </Stack>
    );
}

export default ItemsList