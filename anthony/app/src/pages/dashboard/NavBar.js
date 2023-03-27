import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/navbar.css';
import { AiOutlineBarChart, AiFillSetting } from 'react-icons/ai';
import { IoMdShirt } from 'react-icons/io';
import { BiSupport } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import InnerNavBar from './InnerNavBar';

const NavBar = ({ navRef, navOpen }) => {
    const location = useLocation();

    const [innerNavType, setInnerNavType] = useState("");
    const [loc, setLoc] = useState(location.pathname.substring(location.pathname.search(/^\/salerno\/items/)));
    console.log(loc);
    return (
        <div className='NavBar' ref={navRef} style={navOpen ? {width: '260px', minWidth: '260px'} : {width: '0', minWidth: '0'}}>
            <div className='NavBar_Container' style={innerNavType.length > 0 ? { minWidth: '64px' } : { minWidth: '260px' }}>
                <div className='NavBar_Header'>
                    <div>Salerno's</div>
                </div>
                <div className='NavBar_Button_Wrapper'>
                    <button type='button' className={(location.pathname === '/salerno/reports' || innerNavType === "reports") ? 'NavBar_Button NavBar_Active' : 'NavBar_Button NavBar_Inactive'}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <AiOutlineBarChart size=' 1.25em'  />
                        </div>
                        <span>Reports</span>
                    </button>
                    <button type='button' className={loc === '/salerno/items' ? 'NavBar_Button NavBar_Active' : 'NavBar_Button NavBar_Inactive'} onClick={() => { setInnerNavType(prev => (prev !== "items") ? "items" : ""); setLoc("/salerno/items");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <IoMdShirt size='1.25em'  />
                        </div>
                        <span>Items</span>
                    </button>
                    <button type='button' className={loc === '/salerno/employees' ? 'NavBar_Button NavBar_Active' : 'NavBar_Button NavBar_Inactive'} onClick={() => { setInnerNavType(prev => (prev !== "staff") ? "staff" : ""); setLoc("/salerno/employees");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <BsPeopleFill size=' 1.25em'  />
                        </div>
                        <span>Staff</span>
                    </button>
                    <button type='button' className={loc === '/salerno/settings' ? 'NavBar_Button NavBar_Active' : 'NavBar_Button NavBar_Inactive'} onClick={() => { setInnerNavType(prev => (prev !== "settings") ? "settings" : ""); setLoc("/salerno/settings");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <AiFillSetting size=' 1.25em'  />
                        </div>
                        <span>Settings</span>
                    </button>
                    <button type='button' className={loc === '/salerno/support' ? 'NavBar_Button NavBar_Active' : 'NavBar_Button NavBar_Inactive'} onClick={() => { setInnerNavType(""); setLoc("");}}>
                        <div className='NavBar_Button_Icon_Wrapper'>
                            <BiSupport size=' 1.25em'  />
                        </div>
                        <span>Support</span>
                    </button>
                </div>
            </div>
            <InnerNavBar innerNavType={innerNavType} />
        </div>
    )
}

export default NavBar;