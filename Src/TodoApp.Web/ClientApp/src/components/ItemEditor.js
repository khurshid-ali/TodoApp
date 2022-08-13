import React, {useState, useRef} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
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

        <Row className='text-align-center'>
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
                            
                            <Button 
                                variant='primary' 
                                type='submit' 
                                onClick={onAddClicked}
                                > 
                                Update
                            </Button>
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
                            
                            <Button 
                                variant={isDisabled? 'secondary':'primary'} 
                                type='submit' 
                                disabled={isDisabled}
                                onClick={onAddClicked}
                                > 
                                Add
                            </Button>
                        </ButtonGroup>      
                    )
                }


                      
            </Form>
        </Row>
        
    )
}

export default ItemEditor;