import React from 'react';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import ModifierStyles from './css/OrderItemModifier.module.css';

const OrderItemNoOptions = ({ itemName, noOptions, optionsSelected, setOptionsSelected }) => {

    function formatPrice(price) {
        if (!isNaN(price) && price > 0)
            return `+$${price.toFixed(2)}`;
        else
            return "";
    }

    const handleNoOptionClick = (noOption) => {
        const tempOptionsSelected = Object.assign({}, optionsSelected);
        if (tempOptionsSelected.noOptions.find(n => n.noOptionId === noOption.noOptionId) !== undefined)
            tempOptionsSelected.noOptions = tempOptionsSelected.noOptions.filter(n => n.noOptionId !== noOption.noOptionId);
        else
            tempOptionsSelected.noOptions.push(noOption);
        setOptionsSelected(tempOptionsSelected);
    }
    const CheckBox = ({ noOptionId }) => {
        if (optionsSelected.noOptions.find(noOption => noOption.noOptionId === noOptionId)) {
            return <ImCheckboxChecked className={ModifierStyles.checkbox} size={"1.1em"} style={{color: "rgb(255, 27, 26)"}} />
        } else {
            return <ImCheckboxUnchecked className={ModifierStyles.checkbox}size={"1.1em"} />
        }
    }
    if (noOptions.length === 0) return <></>
    return (
        <div className={ModifierStyles.container}>
            <div className={ModifierStyles.header}>
                <span className={ModifierStyles.title}>Remove from {itemName}</span>
                <span className={ModifierStyles.select_type}>(Optional)</span>
            </div>
            <span className={ModifierStyles.max_select_label}>Select up to {noOptions.length}</span>
            <ul className={ModifierStyles.options}>
            {
                noOptions.map(noOption => (
                    <li className={ModifierStyles.option} key={noOption.noOptionId}>
                        <button className={ModifierStyles.button} onClick={() => handleNoOptionClick({ noOptionId: noOption.noOptionId, name: noOption.name, discountPrice: noOption.discountPrice })}>
                            <CheckBox noOptionId={noOption.noOptionId} />
                            <span className={ModifierStyles.label}>{noOption.name}</span>
                            <span className={ModifierStyles.label__price}>{formatPrice(noOption.discountPrice)}</span>
                        </button>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default OrderItemNoOptions;