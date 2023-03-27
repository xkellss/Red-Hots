import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/deleteitemmodal.css';

const DeleteItemModal = ({ dialogOpen, setDialogOpen, itemId }) => {
    const navigate = useNavigate();

    const handleDelete = async event => {
        event.preventDefault();
        await axios.delete(`https://localhost:7074/api/items/${itemId}`)
            .then(res => {
                console.log(res);
                navigate("/salerno/items");
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div className='DeleteItemModal_Dialog' style={ dialogOpen ? {display: 'block'} : {display: 'none'} } onClick={() => setDialogOpen(false)}>
            <div className='DeleteItemModal_Dialog_Backdrop'></div>
            <div className='DeleteItemModal_Dialog_Container' onClick={e => e.stopPropagation()}>
                <div className='DeleteItemModal_Dialog_Header'>
                    <h4>Are you sure?</h4>
                    <div>
                        <button className='DeleteItemModal_Dialog_Close_Button'>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' }, size: '1.4em' }}>
                                <IoMdClose onClick={() => setDialogOpen(false)} className='DeleteItemModal_Dialog_Close_Icon' />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className='DeleteItemModal_Dialog_Content'>
                    <div className='DeleteItemModal_Text'>
                        This will permanently delete this stock item. Are you sure you want to do this?
                    </div>
                    <div className='DeleteItemModal_Buttons_Wrapper'>
                        <button type='button' className='DeleteItemModal_Cancel_Button' onClick={() => setDialogOpen(false)}>Cancel</button>
                        <button type='button' className='DeleteItemModal_Continue_Button'onClick={handleDelete}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteItemModal;