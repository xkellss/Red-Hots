import React from 'react';
import './orderdetails.css';
import OrderDetailsStyles from './css/OrderDetails.module.css';

import CheeseDogImage from "../../imgs/items/cheesedog (Small).jpeg";
import ChicagoPolishImage from "../../imgs/items/chicagopolish (Small).jpeg";
import ChickenImage from "../../imgs/items/chicken (Small).jpeg";
import ChiliCheeseDogImage from "../../imgs/items/chilicheesedog (Small).jpeg";
import ChiliDogImage from "../../imgs/items/chilidog (Small).jpeg";
import CokeCanImage from "../../imgs/items/coke_can (Small).jpeg";
import CornDogImage from "../../imgs/items/corndog (Small).jpeg";
import DogDealImage from "../../imgs/items/dogdeal (Small).jpeg";
import FriesImage from "../../imgs/items/fries (Small).jpeg";
import ItalianBeefImage from "../../imgs/items/italianbeef (Small).jpeg";
import JumboImage from "../../imgs/items/jumbo (Small).jpeg";
import MaxwellPolishImage from "../../imgs/items/maxwellpolish (Small).jpeg";
import PizzaPuffImage from "../../imgs/items/pizzapuff (Small).jpeg";
import TomTomTamaleImage from "../../imgs/items/tamale (Small).jpeg";
import PlaceholderImage from "../../imgs/items/placeholder_image.png";
import HotDogImage from "../../imgs/items/hotdog.webp";
import OrderDetailsModifiers from './OrderDetailsModifiers';

const OrderDetails = ({ order, handleRemoveItem, handleEditItemClick }) => {
    // TODO: Add modifiers price to total price.

    function getImage(name) {
        switch(name) {
            case "Chicago Style Hot Dog":
                return HotDogImage;
            case "Cheese Dog":
                return CheeseDogImage;
            case "Chicago Polish":
                return ChicagoPolishImage;
            case "Chicken Strips - 3 Piece":
                return ChickenImage;
            case "Chicken Strips - 5 Piece":
                return ChickenImage;
            case "Chili Cheese Dog":
                return ChiliCheeseDogImage;
            case "Chili Dog":
                return ChiliDogImage;
            case "12 oz Can":
                return CokeCanImage;
            case "Corn Dog":
                return CornDogImage;
            case "2 DOG DEAL- 2 Dogs Fries & 12oz Can -":
                return DogDealImage;
            case "Fresh Cut Fries - Regular":
                return FriesImage;
            case "Fresh Cut Fries - Large":
                return FriesImage;
            case "Italian Beef Sandwich":
                return ItalianBeefImage;
            case "Jumbo Dog":
                return JumboImage;
            case "Maxwell Street Polish":
                return MaxwellPolishImage;
            case "Chicago Pizza Puff":
                return PizzaPuffImage;
            case "Tom Tom Tamale":
                return TomTomTamaleImage;
            default:
                return PlaceholderImage;
        }
    }

    return (
        <div className={OrderDetailsStyles.container}>
            <h2 className={OrderDetailsStyles.header}>Order Details</h2>
            <div className={OrderDetailsStyles.border}></div>
            <div className={OrderDetailsStyles.items}>
            {
                order.orderItems.map((orderItem, index) => (
                    <>
                        <div key={index} className={OrderDetailsStyles.item_card} onClick={() => handleEditItemClick(index, orderItem.itemId)}>
                            <button className={OrderDetailsStyles.item_button}>
                                <div className={OrderDetailsStyles.item_image_wrapper}>
                                    <img className={OrderDetailsStyles.item_image} src={getImage(orderItem.name)} alt={`${orderItem.name} Image`} />
                                </div>
                                <div className={OrderDetailsStyles.item_details}>
                                    <h3 className={OrderDetailsStyles.item_header}>{orderItem.name}</h3>
                                    <OrderDetailsModifiers groups={orderItem.modifier.groups} addons={orderItem.modifier.addons} noOptions={orderItem.modifier.noOptions} />
                                    <span className={OrderDetailsStyles.item_price}>{`$${orderItem.price}`}</span>
                                </div>
                                <div className={OrderDetailsStyles.delete_button_wrapper} onClick={e => e.stopPropagation()}>
                                    <button type="button" className={OrderDetailsStyles.delete_button} value={index} onClick={handleRemoveItem}>Remove</button>
                                </div>
                            </button>
                        </div>
                        <div className={OrderDetailsStyles.border}></div>
                    </>
                ))
            }
            </div>
            <div className={OrderDetailsStyles.footer}>
                <span className={OrderDetailsStyles.total_label}>Subtotal: </span>
                <span className={OrderDetailsStyles.total}>{` $${order.subtotal.toFixed(2)}`}</span>
                <button type="button" className={OrderDetailsStyles.checkout_button}>Checkout</button>
            </div>
        </div>
    )
}

export default OrderDetails;