import React, { useContext } from "react";
import CartContext from "../../store/Cart-Context";
import classes from "./CartItem.module.css";
import Card from "../ui/Card";

function CartItem(props) {
    const cartCtx = useContext(CartContext);

    function removeItem() {
        cartCtx.removeItem(props.item.id);
    }

    function decrementItem() {
        cartCtx.decrementItem(props.item.id);
    }

    function incrementItem() {
        cartCtx.incrementItem(props.item.id);
    }

    return (
        <div className={classes.cartItem}>
            <Card>
                <div className={classes.content}>
                    <h3>{props.item.name}</h3>
                <span>${props.item.price}</span>
                </div>
                <div className={classes.cartButtons}>
                    <button className={classes.btnQty} onClick={removeItem} >Remove</button>
                    <button className={classes.btnQty} onClick={decrementItem} >-</button>
                    <button className={classes.btnQty} onClick={incrementItem} >+</button>
                </div>
            </Card>
        </div>

    );
}

export default CartItem;