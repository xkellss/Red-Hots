import React, { useEffect, useState } from 'react';
import { BsSquare } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { FaRegCircle } from 'react-icons/fa';
import { GiPlainCircle } from 'react-icons/gi';
import { TbSquare } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import OrderItemAddons from './OrderItem_Addons';
import OrderItemNoOptions from './OrderItem_NoOptions';
import OrderItemGroups from './OrderItem_Groups';
import ItemImage from '../../components/ItemImage';
import OrderItemStyles from './css/OrderItem.module.css';

const OrderItem = ({ itemI, setOrder, setOrderItem, order, editItemIndex, setEditItemIndex }) => {
    let item = itemI;
    const [optionsSelected, setOptionsSelected] = useState({ groups: [], addons: [], noOptions: [] });

    useEffect(() => {
        if (editItemIndex !== null) {
            const item = order.orderItems[editItemIndex];
            setOptionsSelected({ groups: item.modifier.groups, addons: item.modifier.addons, noOptions: item.modifier.noOptions });
        }
    }, [editItemIndex]);
    const getPrice = () => {
        let price = Number(item["price"]);
        console.log(optionsSelected.noOptions)
        optionsSelected.groups.forEach(group => {
            price += group.price
        });
        optionsSelected.addons.forEach(addon => {
            price += addon.price
        });
        optionsSelected.noOptions.forEach(noOption => {
            console.log(noOption.discountPrice)
            price -= noOption.discountPrice;
        });
        return price.toFixed(2);
    }

    const handleAddToCartClick = event => {
        event.preventDefault();
        if (optionsSelected.groups.length < item.modifier.groups.length) {
            // If not all required groups are selected, prevent add to cart.
            return;
        }
        const orderItem = {
            "itemId": item.itemId,
            "name": item.name,
            "price": getPrice(),
            "modifier": {
                "addons": optionsSelected.addons,
                "noOptions": optionsSelected.noOptions,
                "groups": optionsSelected.groups
            }
        }
        console.log(orderItem);
        const temp = Object.assign({}, order);
        if (editItemIndex !== null) {
            temp.orderItems[editItemIndex] = orderItem;
        } else {
            temp["orderItems"].push(orderItem);
        }
        temp["subtotal"] = Number(temp["subtotal"]) + Number(orderItem['price'])
        setOrder(temp);
        setOrderItem({});
        setEditItemIndex(null);
        setOptionsSelected({ groups: [], addons: [], noOptions: [] });
        console.log(orderItem)
    }
    const handleEditItemClick = event => {
        event.preventDefault();
        const orderItem = {
            "itemId": item.itemId,
            "name": item.name,
            "price": getPrice(),
            "modifier": {
                "addons": optionsSelected.addons,
                "noOptions": optionsSelected.noOptions,
                "groups": optionsSelected.groups
            }
        }
        console.log(orderItem);
        const temp = Object.assign({}, order);
        temp.orderItems[editItemIndex] = orderItem;
        temp["subtotal"] = Number(temp["subtotal"]) + Number(orderItem['price'])
        setOrder(temp);
        setOrderItem({});
        setOptionsSelected({ groups: [], addons: [], noOptions: [] });
        setEditItemIndex(null)
        console.log(orderItem)

    }
    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    const handleClose = event => {
        event.preventDefault();
        setOrderItem({});
        setOptionsSelected({ groups: [], addons: [], noOptions: [] });
    }
    const getButton = () => {
        if (editItemIndex !== undefined)
            <button className={OrderItemStyles.add_button} onClick={handleEditItemClick}>Update item - ${getPrice()}</button>
        return <button className={OrderItemStyles.add_button} onClick={handleAddToCartClick}>Add to cart - ${getPrice()}</button>
    }
    console.log(item)
    console.log(item == {});
    if (isEmpty(item)) {
        return <></>
    } else return (
        <div className={OrderItemStyles.backdrop} onClick={handleClose}>
            <div className={OrderItemStyles.container} onClick={e => e.stopPropagation()}>
                <div className={OrderItemStyles.header}>
                    <button className={OrderItemStyles.close_button} onClick={handleClose}><IoMdClose size={"1.5em"}/></button>
                </div>
                <div className={OrderItemStyles.content}>
                    <h1 className={OrderItemStyles.content_header}>{item["name"]}</h1>
                    <span className={OrderItemStyles.description}>{item["description"]}</span>
                    <div className={OrderItemStyles.image_wrapper}>
                        <ItemImage itemName={item.name} />
                    </div>
                    <OrderItemGroups
                        groups={item.modifier.groups}
                        optionsSelected={optionsSelected}
                        setOptionsSelected={setOptionsSelected}
                    />
                    <OrderItemAddons 
                        itemName={item.name}
                        addons={item.modifier.addons}
                        optionsSelected={optionsSelected}
                        setOptionsSelected={setOptionsSelected}
                    />
                    <OrderItemNoOptions 
                        itemName={item.name}
                        noOptions={item.modifier.noOptions}
                        optionsSelected={optionsSelected}
                        setOptionsSelected={setOptionsSelected}
                    />
                </div>
                <div className={OrderItemStyles.footer}>
                    <button className={OrderItemStyles.add_button} onClick={handleAddToCartClick}>Add to cart - ${getPrice()}</button>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;