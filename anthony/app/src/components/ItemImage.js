import React from 'react';
import CheeseDogImage from "../imgs/items/cheesedog (Small).jpeg";
import ChicagoPolishImage from "../imgs/items/chicagopolish (Small).jpeg";
import ChickenImage from "../imgs/items/chicken (Small).jpeg";
import ChiliCheeseDogImage from "../imgs/items/chilicheesedog (Small).jpeg";
import ChiliDogImage from "../imgs/items/chilidog (Small).jpeg";
import CokeCanImage from "../imgs/items/coke_can (Small).jpeg";
import CornDogImage from "../imgs/items/corndog (Small).jpeg";
import DogDealImage from "../imgs/items/dogdeal (Small).jpeg";
import FriesImage from "../imgs/items/fries (Small).jpeg";
import ItalianBeefImage from "../imgs/items/italianbeef (Small).jpeg";
import JumboImage from "../imgs/items/jumbo (Small).jpeg";
import MaxwellPolishImage from "../imgs/items/maxwellpolish (Small).jpeg";
import PizzaPuffImage from "../imgs/items/pizzapuff (Small).jpeg";
import TomTomTamaleImage from "../imgs/items/tamale (Small).jpeg";
import PlaceholderImage from "../imgs/items/placeholder_image.png";
import HotDogImage from "../imgs/items/hotdog.webp";

const ItemImage = ({ itemName }) => {
    console.log(itemName)
    function getImage(name) {
        switch(name) {
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
            case "Chicago Pizza Puff - Beef":
                return PizzaPuffImage;
            case "Chicago Pizza Puff - Pepperoni":
                return PizzaPuffImage;
            case "Tom Tom Tamale":
                return TomTomTamaleImage;
            case "Chicago Style Hot Dog":
                return HotDogImage;
            default:
                return PlaceholderImage;
        }
    }
    
    const image = getImage(itemName);
    // if (image === null) return <></>;
    return (
        <img className="MenuItem_Image" src={image} alt={`${itemName} Image`} />
    )
}

export default ItemImage;