import React, { useContext } from "react";
import CartContext from "../../store/Cart-Context";
import classes from "./CartList.module.css";
import CartItem from "./CartItem";

function CartList() {
    const cartCtx = useContext(CartContext);

    if (cartCtx.totalCart === 0) {
        return <p>You got nothing in your order. Start adding some?</p>;
    }

    return (
        <>
        <ul className={classes.CartItems}>
            {cartCtx.cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
        </ul>
            <button className={classes.checkout}>Checkout</button>

        </>
    );
}

export default CartList;