import React, {useState, useRef} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
/*
Item editor component
*/
function ItemEditor(props) {
    const descRef = useRef(null);
    const [description, setDescription] = useState(props.edit? props.edit.description:'');
    const [isDisabled, setDisabled] = useState(true);

    
    const onFormSubmit = evt => {
        evt.preventDefault();
        
        if (props.edit) {
            let editVal = props.edit;
            editVal.description = description;
            props.onSubmit(editVal);
        }

        if ( !props.edit && description !== undefined) {
            props.onAdd({description: description, isComplete:false});
        } 
        
        setDescription('');
        evt.target.reset();
        setDisabled(true);

    };

    const onTxtChanged = evt => {
        var description = evt.target.value;
        setDisabled(!props.edit && description.length <= 0);
        setDescription(description);
    };

    const onAddClicked = evt => {
        evt.target.value = "";

    };


    return (

        
            <Form onSubmit={onFormSubmit}>
                {props.edit? 
                    (
                        <ButtonGroup>
                            <Form.Control 
                                className='lg'
                                type='text' 
                                placeholder='a todo item'
                                ref={descRef}
                                onChange={onTxtChanged}
                                value={description}
                            />
                            <OverlayTrigger
                                key='update'
                                placement='right'
                                overlay={
                                    <Tooltip id={`tooltip-update`}>
                                        <strong>Update Item</strong>.
                                        </Tooltip>
                                }                                    
                            >
                                <Button 
                                    variant='primary' 
                                    type='submit' 
                                    onClick={onAddClicked}
                                    > 
                                    Done
                                </Button>
                            </OverlayTrigger>
                            
                        </ButtonGroup>
                    )
                    :
                    (
                        <ButtonGroup>
                            <Form.Control 
                                className='lg'
                                type='text' 
                                placeholder='a todo item'
                                ref={descRef}
                                onChange={onTxtChanged}
                            />
                            <OverlayTrigger
                                key='add'
                                placement='right'
                                overlay={
                                    <Tooltip id={`tooltip-add`}>
                                        <strong>Add Item</strong>.
                                        </Tooltip>
                                }                                    
                            >
                                <Button 
                                    variant={isDisabled? 'secondary':'primary'} 
                                    type='submit' 
                                    disabled={isDisabled}
                                    onClick={onAddClicked}
                                > 
                                    Add
                                </Button>
                            </OverlayTrigger>
                            
                        </ButtonGroup>      
                    )
                }


                      
            </Form>
        
        
    )
}

export default ItemEditor;