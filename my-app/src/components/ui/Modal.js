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
                modifier: props.selectedMenuItem.modifier

            });
        }
        props.onConfirm();
        console.log('cart:', cartCtx.cart);
    }
    function backHandler() {
        props.onBack();
    }
    //check if modifier exists before accessing groups
    const modifierGroups = props.selectedMenuItem.modifier?.groups;
    const modifierAddons = props.selectedMenuItem.modifier?.addons;
    const modifierNoOptions = props.selectedMenuItem.modifier?.noOptions;
    return(
        <div className={classes.modal}>
            <h2>{props.name}</h2>
            <div className={classes.image}>
                <img src={props.image} alt="My Image" />
            </div>

            <div>
                {modifierGroups && modifierGroups.map(group => (
                    <div key={group.groupId}>
                        <h3>{group.name}</h3>
                            {group.groupOptions.map(option => (
                                <div key={option.groupOptionId}>
                                    <input type="checkbox" value={option.groupOptionId} name="groups" />
                                    {option.name} ({option.price})
                                </div>
                            ))}
                    </div>
                ))}

                {modifierGroups && modifierAddons.map(addon => (
                    <div key={addon.addonId}>
                        <input type="checkbox" value={addon.addonId} name="addon" />
                        {addon.name} ({addon.price})
                    </div>
                ))}

                {modifierGroups && modifierNoOptions.map(noOpt => (
                    <div key={noOpt.noOptionId}>
                        <input type="checkbox" value={noOpt.noOptionId} name="noOption" />

                        {noOpt.name} ({noOpt.discountPrice})
                    </div>
                ))}
            </div>




            <p>Are you sure?</p>

            <button className={classes.btnBack} onClick={backHandler}>Back</button>
            {/*<button className={classes.btn} onClick={confirmHandler}>Add to Cart</button>*/}

            <button className={classes.btn} onClick={toggleCartStatusHandler}>{itemIsInCart?
                ' Remove From Cart': 'Add To Cart'}</button>

        </div>
    )
}export default Modal;