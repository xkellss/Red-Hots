import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import './css/supportdialog.css';

const SupportDialog = ({ supportOpen, setSupportOpen }) => {

    return (
        <div className='SupportDialog' style={ supportOpen ? {display: 'block'} : {display: 'none'} } onClick={() => setSupportOpen(false)}>
            <div className='SupportDialog_Container' onClick={e => e.stopPropagation()}>
                <div className='SupportDialog_Header'>
                    <span>Support</span>
                    <div style={{flexGrow: '1'}}></div>
                    <div onClick={() => setSupportOpen(false)}>
                        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                            <IoMdClose onClick={() => setSupportOpen(true)} className='SupportDialog_Close_Icon' />
                        </IconContext.Provider>
                    </div>
                </div>
                <div className='SupportDialog_Content'>
                    <div className='SupportDialog_Content_Left'>
                        <div style={{fontSize: '0.9rem', textAlign: 'left', fontWeight: '400', marginBottom: '10px'}}>Find answers on our support site</div>

                        <div style={{fontSize: '0.8rem', textAlign: 'left', fontWeight: 'lighter'}}>
                            Search our detailed collection of articles, guides, and videos covering everything ALDI.
                        </div>
                    </div>
                    <div className='SupportDialog_Content_Right'>
                        We're here to help 24/7.
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className='SupportDialog_Buttons'>
                    <button id='support-button' className='SupportDialog_Button'>Visit Support</button>
                </div>
            </div>
        </div>
    )
}

export default SupportDialog;