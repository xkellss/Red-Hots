import React, {useContext} from "react";
import classes from './Modal.module.css'
import CartContext from "../../store/Cart-Context";

function Modal(props){

    const cartCtx= useContext(CartContext)

    const itemIsInCart = cartCtx.itemIsInCart(props.selectedMenuItem.id);

    function toggleCartStatusHandler(){
        console.log('props.selectedMenuItem.id:', props.selectedMenuItem.id);
        console.log('itemIsInCart:', itemIsInCart);

        if (itemIsInCart){
            cartCtx.removeCart(props.selectedMenuItem.id);
        }else {
            cartCtx.addCart({
                id: props.selectedMenuItem.id,
                name: props.selectedMenuItem.name,
                image: props.selectedMenuItem.image,
            });
        }
        props.onConfirm();
        console.log('cart:', cartCtx.cart);
    }
    function backHandler() {
        props.onBack();
    }

    return(
        <div className={classes.modal}>
            <h2>{props.name}</h2>
            <div className={classes.image}>
                <img src={props.image} alt="My Image" />
            </div>

            <p>Are you sure?</p>
            <button className={classes.btnBack} onClick={backHandler}>Back</button>
            {/*<button className={classes.btn} onClick={confirmHandler}>Add to Cart</button>*/}

            <button className={classes.btn} onClick={toggleCartStatusHandler}>{itemIsInCart?
                ' Remove From Cart': 'Add To Cart'}</button>

        </div>
    )
}export default Modal;