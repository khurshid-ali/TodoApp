import React, {useState} from 'react';
import {FaEdit, FaTrashAlt, FaCheckSquare} from 'react-icons/fa';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import ItemEditor from './ItemEditor';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function ItemsList({items, editItem, deleteItem, completeItem}) {
    const [edit, setEdit] = useState({id:null, description:''});

    
    const stackStyle = {
        padding:'10px',
        border: 'solid 1px lightGray',
        marginTop: '15px',
        borderRadius:'15px',
        backgroundColor:'black'
    };

    const submitUpdate = value => {
        editItem(value);
        console.log('submit update ' + value);
        setEdit({id:null, description:''});
    };

    return (
        <Stack style={stackStyle}>
            {items.map((item) => (
                <Alert key={item.id} variant={item.isComplete? 'secondary':'success'}>
                    {edit.id === item.id ? 
                        //if in edit mode show the editor
                        <ItemEditor edit={edit} onSubmit={submitUpdate}/>
                    :
                        <>
                            <div className='float-start fw-bolder'>
                                <div className='align-items-center' style={{fontSize:'22px'}}>{item.description}</div>
                            </div>
                            <div className='float-end'>
                                <ButtonGroup >
                                    {!item.isComplete ? 
                                        <>
                                            <OverlayTrigger
                                                key='complete'
                                                placement='left'
                                                overlay={
                                                    <Tooltip id={`tooltip-complete`}>
                                                        <strong>Mark Complete</strong>.
                                                     </Tooltip>
                                                }   
                                            >
                                                <Button variant='link' onClick={() => completeItem(item.id)} aria-label='Complete'>
                                                    <FaCheckSquare />
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                key='edit'
                                                placement='bottom'
                                                overlay={
                                                    <Tooltip id={`tooltip-edit`}>
                                                        <strong>Edit Item</strong>.
                                                     </Tooltip>
                                                }  
                                            >
                                                <Button variant='link' onClick={() => setEdit({id:item.id, description:item.description})} aria-label='Edit'>
                                                    <FaEdit/>
                                                </Button>
                                            </OverlayTrigger>
                                        </>
                                        :
                                        null
                                    }
                                    <OverlayTrigger
                                        key='delete'
                                        placement='right'
                                        overlay={
                                            <Tooltip id={`tooltip-delete`}>
                                                <strong>Delete Item</strong>.
                                             </Tooltip>
                                        }                                    
                                    >
                                        <Button variant='link'  onClick={() => deleteItem(item.id)} aria-label='Delete'>
                                            <FaTrashAlt />
                                        </Button>
                                    </OverlayTrigger>                            
                                </ButtonGroup>
                            </div>
                        </>
                        


                    }
                </Alert>
            ))}
        </Stack>
    );
}

export default ItemsList