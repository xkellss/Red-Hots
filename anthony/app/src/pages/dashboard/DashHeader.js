import './css/dashboard.css';
import { BsPersonCircle, BsCaretDownFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { AiFillQuestionCircle } from 'react-icons/ai';
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const DashHeader = ({ name, setSupportOpen, setNavOpen }) => {
    const [dropdown, setDropdown] = useState(false);
    const date = new Date();
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        console.log('loggin out...');
        await logout();
        navigate("/salerno")
    }
    
    return (
        <div className='DashHeader'>
            <div>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.5em' }}>
                    <BiMenu className='DashHeader_Hamburger_Icon' onClick={() => setNavOpen(prev => !prev)} />
                </IconContext.Provider>
            </div>
            <div className='DashHeader_Title'>Salerno's Red Hots</div>
            <div style={{flexGrow: '1'}}></div>
            <div className='DashHeader_Support'>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.1em' }}>
                    <AiFillQuestionCircle onClick={() => setSupportOpen(true)} className='DashHeader_Support_Icon' />
                </IconContext.Provider>
            </div>
            <div className='DashHeader_Dropdown' onClick={() => setDropdown(prev => !prev)}>
                <div className='DashHeader_User_Header' key={'hey'}>
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.2em' }}>
                        <BsPersonCircle className='DashHeader_User_Icon' />
                    </IconContext.Provider>
                        {name/* {`${auth.first_name} ${auth.last_name}`} */}
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '0.75em' }}>
                        <BsCaretDownFill className='DashHeader_Dropdown_Icon' />
                    </IconContext.Provider>
                </div>
                <div className='DashHeader_Dropdown_Content' style={{display: (dropdown ? 'block' : 'none')}}>
                    <div>{date.toDateString()}</div>
                    <div className='DashHeader_Dropdown_Logout' onClick={signOut}><span>Logout</span></div>
                </div>
            </div>
        </div>
    )
}
export default DashHeader;