import React, { useState } from 'react';
import classes from './MenuItem.module.css'
import './MenuItem.module.css';
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";

import './menuitem.css';

import CheeseDogImage from "../../../imgs/items/cheesedog (Small).jpeg";
import ChicagoPolishImage from "../../../imgs/items/chicagopolish (Small).jpeg";
import ChickenImage from "../../../imgs/items/chicken (Small).jpeg";
import ChiliCheeseDogImage from "../../../imgs/items/chilicheesedog (Small).jpeg";
import ChiliDogImage from "../../../imgs/items/chilidog (Small).jpeg";
import CokeCanImage from "../../../imgs/items/coke_can (Small).jpeg";
import CornDogImage from "../../../imgs/items/corndog (Small).jpeg";
import DogDealImage from "../../../imgs/items/dogdeal (Small).jpeg";
import FriesImage from "../../../imgs/items/fries (Small).jpeg";
import ItalianBeefImage from "../../../imgs/items/italianbeef (Small).jpeg";
import JumboImage from "../../../imgs/items/jumbo (Small).jpeg";
import MaxwellPolishImage from "../../../imgs/items/maxwellpolish (Small).jpeg";
import PizzaPuffImage from "../../../imgs/items/pizzapuff (Small).jpeg";
import TomTomTamaleImage from "../../../imgs/items/tamale (Small).jpeg";
import PlaceholderImage from "../../../imgs/items/placeholder_image.png";
import HotDogImage from "../../../imgs/items/hotdog.webp";

const MenuItem = (props) => {

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
    const ItemImage = ({ name }) => {
        const image = getImage(name);
        return (
            <img className="MenuItem_Image" src={image} alt={`${name} Image`} />
        )
    }
    return (
        <div className="MenuItem">
            <button className="MenuItem_Button" onClick={() => props.handleOpenItem(props.itemId)}>
                <div className="MenuItem_Card_Details">
                    <h3 className="MenuItem_Card_Header">{props.name}</h3>
                    <div className="MenuItem_Card_Description">{props.description}</div>
                    <div className="MenuItem_Card_Price">{`$${props.price.toFixed(2)}`}</div>
                </div>
                <div className="MenuItem_Image_Wrapper">
                    <ItemImage name={props.name} />
                </div>
            </button>
        </div>
    );
}

export default MenuItem;