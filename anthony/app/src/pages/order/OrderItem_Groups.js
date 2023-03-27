import React from 'react';
import { GiPlainCircle } from 'react-icons/gi';
import { FaRegCircle } from 'react-icons/fa';
import { BsRecordCircle, BsCircle } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';
import ModifierStyles from './css/OrderItemModifier.module.css';

const OrderItemGroups = ({ groups, optionsSelected, setOptionsSelected }) => {
    console.log(groups);
    function formatPrice(price) {
        if (!isNaN(price) && price > 0)
            return `+$${price.toFixed(2)}`;
        else
            return "";
    }

    const handleGroupClick = (option) => {
        const tempOptionsSelected = Object.assign({}, optionsSelected);
        if (tempOptionsSelected.groups.find(group => group.groupId === option.groupId) !== undefined) {
            tempOptionsSelected.groups = tempOptionsSelected.groups.filter(group => group.groupId !== option.groupId);
            tempOptionsSelected.groups.push(option);
        } else {
            tempOptionsSelected.groups.push(option);
        }
        setOptionsSelected(tempOptionsSelected);
    }
    const CheckBox = ({ groupId, groupOptionId }) => {
        if (optionsSelected.groups.find(group => (group.groupId === groupId && group.groupOptionId === groupOptionId)))
            return <BsRecordCircle size={"1.3em"} style={{color: "red"}}/>
        else
            return <BsCircle size={"1.3em"} />
    }

    if (groups.length === 0) return <></>
    return (
        <div className="orderitem__modifier">
        {
            groups.map(group => (
                <div className={ModifierStyles.container} key={group.groupId}>
                    <div className={ModifierStyles.header}>
                        <span className={ModifierStyles.title}>{group.name}</span>
                        <span className={ModifierStyles.select_type__group}>
                            <FiAlertTriangle className={ModifierStyles.alert_icon} size={"1.25em"} />Required</span>
                    </div>
                    <span className={ModifierStyles.max_select_label}>Select 1</span>
                    <ul className={ModifierStyles.options}>
                    {
                        group.groupOptions.map(groupOption => (
                            <li key={`groupId-${group.groupId}-groupOptionId${groupOption.groupOptionId}`} className={ModifierStyles.option}>
                                <button className={ModifierStyles.button}
                                    onClick={() => handleGroupClick(
                                        { 
                                            groupId: group.groupId,
                                            groupName: group.name,
                                            groupOptionId: groupOption.groupOptionId,
                                            groupOptionName: groupOption.name,
                                            price: groupOption.price
                                        }
                                    )}>
                                        <span className={ModifierStyles.radio_icon}>
                                            <CheckBox groupId={group.groupId} groupOptionId={groupOption.groupOptionId} />
                                        </span>
                                    <span className={ModifierStyles.label}>{groupOption.name}</span>
                                    <span className={ModifierStyles.label__price}>{formatPrice(groupOption.price)}</span>
                                </button>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            ))
        }
        </div>
    )
}

export default OrderItemGroups;