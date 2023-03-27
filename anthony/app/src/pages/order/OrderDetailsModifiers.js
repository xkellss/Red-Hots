import React from 'react';
import { TbPointFilled } from 'react-icons/tb';
import OrderDetailsModifiersStyles from './css/OrderDetailsModifiers.module.css';

const OrderDetailsModifiers = ({ groups, addons, noOptions }) => {

    function formatPrice(price, type) {
        if (!isNaN(price) && price > 0) {
            if (type === "noOptions")
                return `-$${price.toFixed(2)}`;
            return `+$${price.toFixed(2)}`;
        }
            return "";
    }

    const Groups = () => {
        if (groups.length === 0) return <></>
        return groups.map(group => (
            <span key={`group-${group.groupId}-groupOption-${group.groupOptionId}`} className={OrderDetailsModifiersStyles.modifier}>{group.groupOptionName}</span>
        ));
    }
    const Addons = () => {
        if (addons.length === 0) return <></>
        return addons.map(addon => (
            <span key={`addon-${addon.addonId}`} className={OrderDetailsModifiersStyles.modifier}>{addon.name}</span>
        ));
    }
    const NoOptions = () => {
        if (noOptions.length === 0) return <></>
        return noOptions.map(noOption => (
            <span key={`noOption-${noOption.noOptionId}`} className={OrderDetailsModifiersStyles.modifier}>{noOption.name}</span>
        ));
    }

    return (
        <div className={OrderDetailsModifiersStyles.container}>
            <Groups />
            <Addons />
            <NoOptions />
        </div>
    )
}

export default OrderDetailsModifiers;