import React from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import ModifierStyles from './css/OrderItemModifier.module.css';

const OrderItemAddons = ({ itemName, addons, optionsSelected, setOptionsSelected }) => {

    function formatPrice(price) {
        if (!isNaN(price) && price > 0)
            return `+$${price.toFixed(2)}`;
        else
            return "";
    }

    const handleAddonClick = (addon) => {
        const tempOptionsSelected = Object.assign({}, optionsSelected);
        if (tempOptionsSelected.addons.find(a => a.addonId === addon.addonId) !== undefined)
            tempOptionsSelected.addons = tempOptionsSelected.addons.filter(a => a.addonId !== addon.addonId);
        else
            tempOptionsSelected.addons.push(addon);
        setOptionsSelected(tempOptionsSelected);
    }
    const CheckBox = ({ addonId }) => {
        if (optionsSelected.addons.find(addon => addon.addonId === addonId)) {
            return <ImCheckboxChecked className={ModifierStyles.checkbox} size={"1.1em"} style={{color: "rgb(255, 27, 26)"}} />
        } else {
            return <ImCheckboxUnchecked className={ModifierStyles.checkbox} size={"1.1em"} />
        }
    }
    if (addons.length === 0) return <></>
    return (
        <div className={ModifierStyles.container}>
            <div className={ModifierStyles.header}>
                <span className={ModifierStyles.title}>Add to {itemName}</span>
                <span className={ModifierStyles.select_type}>(Optional)</span>
            </div>
            <span className={ModifierStyles.max_select_label}>Select up to {addons.length}</span>
            <ul className={ModifierStyles.options}>
            {
                addons.map(addon => (
                    <li className={ModifierStyles.option} key={addon.addonId}>
                        <button className={ModifierStyles.button} onClick={() => handleAddonClick({ addonId: addon.addonId, name: addon.name, price: addon.price })}>
                            <CheckBox addonId={addon.addonId} />
                            <span className={ModifierStyles.label}>{addon.name}</span>
                            <span className={ModifierStyles.label__price}>{formatPrice(addon.price)}</span>
                        </button>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default OrderItemAddons;