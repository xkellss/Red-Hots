import React, {createContext, useState} from "react";

const CartContext = createContext({
    cart: [],
    totalCart: 0,
    addCart: (cartMenu) => {
    },
    removeCart: (menuId) => {
    },
    itemIsInCart: (menuId) => {
    }
});

export function CartContextProvider(props) {
    const [userCart, setUserCart] = useState([]);

    function addCartHandler(cartMenu) {
        setUserCart((prevUserCart) => {
            return prevUserCart.concat(cartMenu)
        });
    }

    function removeCartHandler(menuId) {
        setUserCart(prevUserCart => {
            return prevUserCart.filter(menu => menu.id !== menuId);
        })

    }

    function itemIsInCartHandler(menuId) {
        return userCart.some(menu => menu.id === menuId)
    }

    const context = {
        cart: userCart,
        totalCart: userCart.length,
        addCart: addCartHandler,
        removeCart: removeCartHandler,
        itemIsInCart: itemIsInCartHandler,
    };

    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;