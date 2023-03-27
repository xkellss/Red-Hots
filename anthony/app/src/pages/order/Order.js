import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import './order.css';

import MenuItem from '../../raquel/components/menu/MenuItem';
import OrderDetailsModifiers from './OrderDetailsModifiers';
import { IoMdClose } from 'react-icons/io';
import OrderDetails from './OrderDetails';

const Order = () => {
    const customerAccountId = 1;

    const [items, setItems] = useState([]);
    const [order, setOrder] = useState({
        "subtotal": 0,
        "subtotalTax": 0,
        "total": 0,
        "orderItems": []
    });
    // TODO: drop subtotal.
    const [orderItem, setOrderItem] = useState({});
    const [editItemIndex, setEditItemIndex] = useState(null);
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getItems = async () => {
        await axios.get("https://localhost:7074/api/items")
        .then(res => {
            console.log(res);
            setItems(res.data);
            console.log(res.data)
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getItems();
    }, []);
    const editOrderItem = (index) => {
        const item = items[index];
        setOrderItem(item);
    }
    const handleEditItemClick = (index, itemId) => {
        setEditItemIndex(index);
        const item = items.find(i => i["itemId"] === itemId);
        setOrderItem(item);
    }
    const handleOpenItem = (itemId) => {
        if (orderItem["itemId"] === itemId) setOrderItem({})
        else {
            const item = items.find(i => i["itemId"] === itemId);
            let orderItem = {
                "itemId": item["itemId"],
                "name": item["name"],
                "price": item["price"],
                "modifier": {
                    "addons": [],
                    "noOptions": [],
                    "groups": []
                }
            }
            console.log(JSON.stringify(orderItem));
            setOrderItem(item);
        }
    }
    const handleRemoveItem = event => {
        event.preventDefault();
        const index = event.target.value;
        console.log("hey")
        const temp = Object.assign({}, order);
        temp["orderItems"].splice(index, 1);
        let subtotal = temp["subtotal"] - orderItem['price'];
        if (isNaN(subtotal)) subtotal = 0;
        temp["subtotal"] = subtotal;
        setOrder(temp);
    }
    const handleCheckout = async event => {
        event.preventDefault();
        let orderItems = [];
        order["orderItems"].forEach(orderItem => {
            let addons = [];
            let noOptions = [];
            let groupOptions = [];
            orderItem["modifier"]["addons"].forEach(addon => {
                addons.push({
                    "addonId": addon["addonId"]
                });
            });
            orderItem["modifier"]["noOptions"].forEach(noOption => {
                noOptions.push({
                    "noOptionId": noOption["noOptionId"]
                });
            });
            orderItem["modifier"]["noOptions"].forEach(group => {
                groupOptions.push({
                    "groupId": group["groupId"],
                    "groupOptionId": group["groupOptionId"]
                });
            });
            orderItems.push({
                "itemId": orderItem["itemId"],
                "groupOptions": groupOptions,
                "addons": addons,
                "noOptions": noOptions
            })
        });
        
        await axios.post("https://localhost:7074/api/orders",
            {
                "customerAccountId": customerAccountId,
                "subtotal": order["subtotal"],
                "subtotalTax": (order["subtotal"] * 0.0825).toFixed(2),
                "total": ((order["subtotal"] * 0.0825) + order["subtotal"]).toFixed(2),
                "orderItems": orderItems
            }
        )
        .then(res => {
            setResponse("Success!");
            console.log(res);
        })
        .catch(err => {
            setResponse(err.message + ". \n" + err.response.data);
            console.log(err);
        });

    }

    function formatPrice(price, type) {
        if (!isNaN(price) && price > 0) {
            if (type === "noOptions")
                return `-$${price.toFixed(2)}`;
            return `+$${price.toFixed(2)}`;
        }
            return "";
    }

    console.log(order)
    return (
        <div className="order">
            <OrderItem itemI={orderItem} setOrder={setOrder} setOrderItem={setOrderItem} order={order} editItemIndex={editItemIndex} setEditItemIndex={setEditItemIndex} />
            { (response === "Success!") ? <h3 style={{color: "green"}}>{response}</h3> : (response !== null) ? <h3 style={{color: "red"}}>{response}</h3> : <></> }
                <div className="order__itemlist">
                    <h2 className="Order_Details_Header">Category Name...</h2>
                    <div className="itemlist__container">
                        {
                            items.map(item => (
                                <MenuItem
                                    key={item.itemId}
                                    itemId={item.itemId}
                                    name={item.name}
                                    price={item.price}
                                    description={item.description}
                                    handleOpenItem={handleOpenItem}
                                />
                            ))
                        }
                    </div>
                </div>
                <OrderDetails order={order} handleRemoveItem={handleRemoveItem} handleEditItemClick={handleEditItemClick} />
        </div>
    );
}

export default Order;


/*
    <table className="Order_ItemList_Table">
        <tbody>
            {
                items.map(item => (
                    <tr key={item['itemId']}>
                        <td>
                            <div className="Order_ItemList_Grid">
                                <div className="Order_ItemList_Grid_Button_Wrapper">
                                    <button className="Order_ItemList_Button" onClick={handleOpenItem} value={item['itemId']} type="button">{item['name']}</button>
                                </div>
                                <div className="Order_ItemList_Grid_Price_Wrapper">
                                    <div>${item['price'].toFixed(2)}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>

    const handleAddAddonCheckboxChange = event => {
        event.preventDefault();
        const modifierId = event.target.attributes.modifierid.value;
        console.log("modifierid => " + modifierId);
        const addonId = event.target.attributes.addonid.value;
        console.log("addonid => " + addonId);
        const addonModifierParent = orderItem["basemodifier"].find(bm => bm["modifierId"] == modifierId);
        console.log(JSON.stringify(addonModifierParent))
        const addonToAdd = addonModifierParent["addons"].find(a => a["addonId"] == addonId);
        const tempOrderItem = Object.assign({}, orderItem);
        console.log(JSON.stringify(tempOrderItem))
        if (event.target.checked)
            tempOrderItem["modifier"]["addons"].push(addonToAdd);
        else if (!event.target.checked)
            tempOrderItem["modifier"]["addons"] = tempOrderItem["modifier"]["addons"].filter(a => a["addonId"] != addonId);
        setOrderItem(tempOrderItem);
    }
    const handleAddItem = event => {
        event.preventDefault();
        const temp = Object.assign({}, order);
        temp["orderItems"].push(orderItem);
        temp["subtotal"] = temp["subtotal"] + orderItem['price']
        setOrder(temp);
        setOrderItem({});
    }
*/