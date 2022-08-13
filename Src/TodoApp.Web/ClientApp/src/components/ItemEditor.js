import React, {useState, useRef} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

/*
Item editor component
*/
function ItemEditor(props) {
    const descRef = useRef(null);
    const [description, setDescription] = useState('');
    const [isDisabled, setDisabled] = useState(true);

    
    const onFormSubmit = evt => {
        evt.preventDefault();
        
        if (description !== undefined) {
            props.onAdd({description: description, isComplete:false});
        }       
        
        setDescription('');
        evt.target.reset();
        setDisabled(true);

    };

    const onTxtChanged = evt => {
        var description = evt.target.value;
        setDisabled( description.length <= 0);
        setDescription(description);
    };

    const onAddClicked = evt => {
        evt.target.value = "";

    };


    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <input 
                    ref={descRef}
                    type="text"
                    name="text"
                    className="txtbx-item"
                    onChange={onTxtChanged}
                />
                <button type='submit'
                    disabled={isDisabled}
                    className='btn-item-add'
                    onClick={onAddClicked}
                >Add</button>
            </form>
        </div>
    )
}

export default ItemEditor;