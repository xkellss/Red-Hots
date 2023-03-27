import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillCheckCircleFill, BsCheckSquareFill, BsCalendarWeek } from 'react-icons/bs';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { MdPending, MdOutlinePending, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { TbSquare } from 'react-icons/tb';
import { FcCheckmark } from 'react-icons/fc';
import { IconContext } from 'react-icons/lib';
import MiniCalendar from '../../../components/MiniCalendar';
import { getLastSevenDays, monthStrings } from '../../../components/functions/DateInfo';
import './orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [openItem, setOpenItem] = useState({});
    const [daySelected, setDaySelected] = useState([]);
    const [miniCalendarOpen, setMiniCalendarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

    const handleFilterDate = (dateArr) => {
        console.log(dateArr);
    }
    const currDate = new Date();
    console.log(currDate);
    const [filterDate, setFilterDate] = useState(getLastSevenDays());
    console.log(filterDate);

    const getOrders = async () => {
        await axios.get("https://localhost:7074/api/orders")
            .then(res => {
                console.log(res.data);
                setOrders(res.data);
            }).catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        getOrders();
        setIsLoading(false);
    }, []);

    const openOrder = (id) => {
        const order = orders.find(order => order["orderId"] === id);
        console.log(order);
        setOpenItem(order);
    }

    const CalendarButton = () => {
        return (
            <>
                <button className="Orders_OrderItem_Calendar_Button" onClick={() => setMiniCalendarOpen(prev => !prev)}>
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle', marginRight: "5px"}, size: '1em' }}>
                        <BsCalendarWeek className='calendar-icon' />
                    </IconContext.Provider>
                    <div>{`${monthStrings[filterDate[0].Month - 1]} ${filterDate[0].Day}, ${filterDate[0].Year} - ${monthStrings[filterDate[1].Month - 1]} ${filterDate[1].Day}, ${filterDate[1].Year}`}</div>
                </button>
                <MiniCalendar handleFilterDate={handleFilterDate} miniCalendarOpen={miniCalendarOpen} setMiniCalendarOpen={setMiniCalendarOpen} daySelected={daySelected} setDaySelected={setDaySelected} setFilterDate={setFilterDate} />
            </>
        )
    }
    
    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    function getModifierLabel(modifier, type) {
        if (!isNaN(modifier[type]["price"]) && modifier[type]["price"] > 0) return `${modifier[type]["name"]} ($${modifier[type]["price"].toFixed(2)})`;
        return modifier[type]["name"];
    }

    const Status = ({ status }) => {
        if (status === "Complete") return <><span className="Orders_Status_Checkmark_Icon_Wrapper"><MdOutlineCheckCircleOutline size={"1em"}/></span>{status}</>
        return <><span className="Orders_Status_Checkmark_Icon_Wrapper"><MdOutlinePending size={"1em"}/></span>{status}</>
    }

    function formatDate(dateString) {
        let split = dateString.split("T")[0].split("-");
        if (split[1][0] === "0") split[1] = split[1][1];
        if (split[2][0] === "0") split[2] = split[2][1];
        return `${split[1]}/${split[2]}/${split[0]}`
    }
    function formatTime(dateString) {
        var date = new Date(dateString);
        var hours = date.getHours();
        var minutes = date.getMinutes();
          
        // Check whether AM or PM
        var newformat = hours >= 12 ? 'PM' : 'AM';
          
        // Find current hour in AM-PM Format
        hours = hours % 12;
          
        // To display "0" as "12"
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes} ${newformat}`;
    }

    const handleClose = event => {
        event.preventDefault();
        setOpenItem({});
    }

    const Checkbox = () => {
        return (
            <span className="Orders_Status_Checkbox_Icon">
                <BsCheckSquareFill size={"1em"} />
            </span>
        )
    }

    function checkDate(date) {
        const min_time = new Date(filterDate[0].Year, filterDate[0].Month - 1, filterDate[0].Day).getTime();
        console.log("min=>" + min_time);
        const max_time = new Date(filterDate[1].Year, filterDate[1].Month - 1, filterDate[1].Day).getTime();
        console.log("max=>" + max_time);
        const checked_time = new Date(date).getTime();
        console.log(checked_time);
        return checked_time < max_time && checked_time > min_time;
    }

    const OrderItem = () => {
        if (isEmpty(openItem)) return <></>
        else return (
            <div className="Orders_OrderItem_Modal_Stretch" onClick={handleClose}>
                <div className="Orders_OrderItem_Modal_Container" onClick={e => e.stopPropagation()}>
                    <div className="Orders_OrderItem_Modal">
                        <div className="Orders_OrderItem_Modal_Header">
                            <h2 className="Orders_OrderItem_Modal_Header_Title">Order #{openItem.orderId}</h2>
                            <div className="Orders_OrderItem_Modal_Close_Button" onClick={handleClose}><IoMdClose size={"1.5em"}/></div>
                        </div>
                        <div className="Orders_OrderItem_Modal_Gap"></div>
                        <div className="Orders_OrderItem_Modal_Customer_Details">
                            <h2 className="Orders_OrderItem_Modal_Customer_Details_Header">Pick-Up Details</h2>
                            <div className="Orders_OrderItem_Modal_Customer_Details_Item">
                                <div className="Orders_OrderItem_Modal_Customer_Details_Label">Customer</div>
                                <div className="Orders_OrderItem_Modal_Customer_Details_Value">{`${openItem.customerAccount.firstName} ${openItem.customerAccount.lastName}`}</div>
                            </div>
                            <div className="Orders_OrderItem_Modal_Details_Border"></div>
                            <div className="Orders_OrderItem_Modal_Customer_Details_Item">
                                <div className="Orders_OrderItem_Modal_Customer_Details_Label">Picked Up</div>
                                <div className="Orders_OrderItem_Modal_Customer_Details_Value">12:00 PM<span className="Orders_OrderItem_Modal_Customer_Details_Value--description">(Quoted 12:05 PM)</span></div>
                                <div className="Orders_OrderItem_Modal_Customer_Details_Value">{new Date(openItem["orderDate"]).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div className="Orders_OrderItem_Modal_Gap"></div>
                        <div className="Orders_OrderItem_Modal_Details">
                            <h2 className="Orders_OrderItem_Modal_Details_Header">Order Details</h2>
                            <div className="Orders_OrderItem_Modal_Details_Content">
                            {
                                openItem["orderItems"].map(orderItem => (
                                    <div key={`order-${openItem["orderId"]}-orderitem-${orderItem["orderItemId"]}`} className="Orders_OrderItem_Modal_Details_Content_Item">
                                        <div className="Orders_OrderItem_Modal_Details_Content_Item_Count">1x</div>
                                        <div className="Orders_OrderItem_Modal_Details_Content_Item_Base_Details">
                                            <div className="Orders_OrderItem_Modal_Details_Content_Item_Name">{orderItem["itemName"]}</div>
                                            <div className="Orders_OrderItem_Modal_Details_Content_Item_Price">$11.95</div>
                                        </div>
                                        <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_Addons">
                                        {
                                            (orderItem["addons"].length === 0) ? <></> : orderItem["addons"].map(addon => (
                                                <div key={`order-${openItem["orderId"]}-orderitem-${orderItem["orderItemId"]}-addon-${addon["addon"]["addonId"]}`}>
                                                    <span className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier_Label">Add-On:</span>
                                                    <span className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier">{getModifierLabel(addon, "addon")}</span>
                                                </div>
                                            ))
                                        }
                                        </div>
                                        <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_NoOptions">
                                        {
                                            (orderItem["noOptions"].length === 0) ? <></> : orderItem["noOptions"].map(noOption => (
                                                <div key={`order-${openItem["orderId"]}-orderitem-${orderItem["orderItemId"]}-noOption-${noOption["noOption"]["noOptionId"]}`}>
                                                    <span className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier_Label">Remove:</span>
                                                    <span className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier">{getModifierLabel(noOption, "noOption")}</span>
                                                </div>
                                            ))
                                        }
                                        </div>
                                        <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_Groups">
                                        {
                                            (orderItem["groups"].length === 0) ? <></> : orderItem["groups"].map(group => (
                                                <div key={`order-${openItem["orderId"]}-orderitem-${orderItem["orderItemId"]}-group-${group["group"]["groupId"]}-groupOption-${group["groupOption"]["groupOptionId"]}`}>
                                                    <span className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier_Label">{group["group"]["name"]}</span>
                                                    <span className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier">{getModifierLabel(group, "groupOption")}</span>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="Orders_OrderItem_Totals_Container">
                                <div className="Orders_OrderItem_Totals_Item">
                                    <span className="Orders_OrderItem_Totals_Label">Subtotal</span>
                                    <span className="Orders_OrderItem_Totals_Value">{`$${openItem["subtotal"].toFixed(2)}`}</span>
                                </div>
                                <div className="Orders_OrderItem_Totals_Item">
                                    <span className="Orders_OrderItem_Totals_Label">Subtotal Tax</span>
                                    <span className="Orders_OrderItem_Totals_Value">{`$${openItem["subtotalTax"].toFixed(2)}`}</span>
                                </div>
                                <div className="Orders_OrderItem_Totals_Item">
                                    <span className="Orders_OrderItem_Totals_Label" style={{fontSize: "16px", fontWeight: "700"}}>Total</span>
                                    <span className="Orders_OrderItem_Totals_Value" style={{fontSize: "16px", fontWeight: "700", margin: "6px 0 0 0"}}>{`$${openItem["total"].toFixed(2)}`}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <div className="Orders">
            <div className="Orders_Header">
                <h1 className="Orders_Header_Title">Orders</h1>
            </div>
            <div className="Orders_Content_Container">
                <OrderItem />
                <div className="Orders_Content_Tabs">
                    <button type="button" className="Orders_Content_Tabs_Button">Active</button>
                    <button type="button" className="Orders_Content_Tabs_Button Current">History</button>
                </div>
                <div className="Orders_Table_Controls">
                    <CalendarButton />
                    <div className="Orders_Status_Dropdown_Container">
                        <button 
                            className={`Orders_Status_Dropdown_Button ${statusDropdownOpen ? "DropdownOpen" : ""}`}
                            onClick={() => (setStatusDropdownOpen(prev => !prev))}>
                            <span>Status</span>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle', height: '100%', float: 'right', color: 'rgb(139, 139, 139)' }, size: '1.25em' }}>
                                {statusDropdownOpen ? <TiArrowSortedUp className='Modifiers_Groups_Copy_Import_Arrow' /> : <TiArrowSortedDown className='Modifiers_Groups_Copy_Import_Arrow' /> }
                            </IconContext.Provider>
                        </button>
                        <div className="Orders_Status_Dropdown" style={statusDropdownOpen ? {display: "block"} : {display: "none"}} onClick={e => e.stopPropagation()}>
                                    <ul className='Orders_Status_Dropdown_List'>
                                        <li className='Orders_Status_Dropdown_Item'><Checkbox />Pending</li>
                                        <li className='Orders_Status_Dropdown_Item'>Complete</li>
                                        <li className='Orders_Status_Dropdown_Item'>Cancelled</li>
                                    </ul>
                        </div>
                    </div>
                    <div className="Orders_Table_Controls_Search_Wrapper">
                        <input type="text" className="Orders_Table_Controls_Search" placeholder="Search Orders..." />
                    </div>
                </div>
                <div className="Orders_Content_Table_Wrapper">
                    <table className="Orders_Content_Table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            orders.map(order => {
                                if (checkDate(order["orderDate"])) {
                                    return (
                                        <tr key={"orderid-" + order["orderId"]} onClick={() => openOrder(order["orderId"])}>
                                            <td>{order["orderId"]}</td>
                                            <td><Status status={order["status"]} /></td>
                                            <td>{formatDate(order["orderDate"])}</td>
                                            <td>{formatTime(order["orderDate"])}</td>
                                            <td className="Orders_Content_Table_Name_Col">{`${order["customerAccount"]["firstName"]} ${order["customerAccount"]["lastName"]}`}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders;

// {/* <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_Addons">
//     {/* <ul className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_Addons_List">
//         {
//             (orderItem["addons"].length === 0) ? <></> :
//             orderItem["addons"].map(addon => (
//                 <li className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item">
//                     {/* <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Label">Addon:</div> */}
//                     <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier">{addon["addon"]["name"]}</div>
//                 </li>
//             ))
//         }
//     </ul> */}
// </div>
// <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_NoOptions">
//     <ul className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_NoOptions_List">
//         {
//             (orderItem["noOptions"].length === 0) ? <></> :
//             orderItem["noOptions"].map(noOption => (
//                 <li className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item">
//                     {/* <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Label">No Option:</div> */}
//                     <div className="Orders_OrderItem_Modal_Details_Content_Item_Modifiers_List_Item_Modifier">{noOption["noOption"]["name"]}</div>
//                 </li>
//             ))
//         }
//     </ul>
// </div> */}