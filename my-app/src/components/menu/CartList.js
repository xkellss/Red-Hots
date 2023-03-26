import React, { useContext } from "react";
import CartContext from "../../store/Cart-Context";

function CartList() {
    const cartCtx = useContext(CartContext);

    if (cartCtx.totalCart === 0) {
        return <p>You got nothing in your order. Start adding some?</p>;
    }

    return (

        <div>
            {cartCtx.cart.map((item) => (
                <div key={item.id}>
                    <div>
                        <h3>{item.name}</h3>
                    </div>
                    <div>${item.price}</div>
                </div>
            ))}
        </div>
    );
}

export default CartList;