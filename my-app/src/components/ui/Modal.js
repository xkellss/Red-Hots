import React, {useContext, useState} from "react";
import classes from './Modal.module.css'
import CartContext from "../../store/Cart-Context";

function Modal(props){

    const cartCtx= useContext(CartContext)

    const itemIsInCart = cartCtx.itemIsInCart(props.selectedMenuItem.id);

    const [price, setPrice] = useState(parseFloat(props.selectedMenuItem.price));



    function toggleCartStatusHandler(){
        console.log('props.selectedMenuItem.id:', props.selectedMenuItem.id);
        console.log('itemIsInCart:', itemIsInCart);

        let itemPrice = price;
        let modifierTotal = itemPrice;

        //loop through each & add up ones that are checked
        if (modifierGroups) {
            modifierGroups.forEach(group => {
                group.groupOptions.forEach(option => {
                    if (document.querySelector(`input[type="checkbox"][value="${option.groupOptionId}"]:checked`)) {
                        modifierTotal += option.price;
                    }
                });
            });

            modifierAddons.forEach(addon => {
                if (document.querySelector(`input[type="checkbox"][value="${addon.addonId}"]:checked`)) {
                    modifierTotal += addon.price;
                }
            });

            modifierNoOptions.forEach(noOpt => {
                if (document.querySelector(`input[type="checkbox"][value="${noOpt.noOptionId}"]:checked`)) {
                    modifierTotal -= noOpt.discountPrice;
                }
            });
        }
        console.log(modifierTotal)

        itemPrice = parseFloat(modifierTotal.toFixed(2));
        if (modifierTotal >= 0) {
            setPrice(itemPrice);
        }

        if (itemIsInCart){
            cartCtx.removeCart(props.selectedMenuItem.id);
        }else {
            cartCtx.addCart({
                id: props.selectedMenuItem.id,
                name: props.selectedMenuItem.name,
                image: props.selectedMenuItem.image,
                modifier: props.selectedMenuItem.modifier,
                price: itemPrice
            });
        }
        props.onConfirm();
        console.log('cart:', cartCtx.cart);
    }

    //check if modifier exists before accessing groups
    const modifierGroups = props.selectedMenuItem.modifier?.groups;
    const modifierAddons = props.selectedMenuItem.modifier?.addons;
    const modifierNoOptions = props.selectedMenuItem.modifier?.noOptions;


    return(
        <div className={classes.modal}>
            <h2>{props.name}</h2>
            <div className={classes.overflow}>
            <div className={classes.image}>
                {/*<img src={props.image} alt="My Image" />*/}
            </div>

            <div>
                {modifierGroups && modifierGroups.map(group => (
                    <div key={group.groupId}>
                        <h3>{group.name}</h3>
                            {group.groupOptions.map(option => (
                                <div key={option.groupOptionId}>
                                    <input type="checkbox" value={option.groupOptionId} name="groups" />
                                    {option.name} (${option.price})
                                </div>
                            ))}
                    </div>
                ))}
            </div>
            <div>
                {modifierGroups && modifierAddons.length > 0 && (
                    <div>
                        <h3>Addons</h3>
                        {modifierGroups && modifierAddons.map(addon => (
                            <div key={addon.addonId}>
                                <input type="checkbox" value={addon.addonId} name="addon" />
                                {addon.name} (${addon.price})
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                {modifierGroups && modifierNoOptions.length > 0 && (
                    <div>
                        <h3>Removal Options</h3>
                        {modifierGroups && modifierNoOptions.map(noOpt => (
                            <div key={noOpt.noOptionId}>
                                <input type="checkbox" value={noOpt.noOptionId} name="noOption" />

                                {noOpt.name} (${noOpt.discountPrice})
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>
            <div className={classes.btnLayout}>
            {/*<button className={classes.btnBack} onClick={backHandler}>Back</button>*/}
            {/*<button className={classes.btn} onClick={confirmHandler}>Add to Cart</button>*/}

            <button className={classes.btnCart} onClick={toggleCartStatusHandler}>{itemIsInCart?
                ' Remove From Cart': 'Add To Cart'}
            </button>
                <span className={classes.price}>${price.toFixed(2)}</span>
            </div>
        </div>
    )
}export default Modal;