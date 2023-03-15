import React, {useState} from 'react';
import classes from './MenuList.module.css'
import MenuItem from "./MenuItem";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";

function MenuList(props) {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    function handleAddToCart(menuItem) {
        setSelectedMenuItem(menuItem);
    }

    function handleModalClose() {
        setSelectedMenuItem(null);
    }

    return (
        <>
            <ul className={classes.list}>
                {props.menuItems.map((menuItem) => (
                    <MenuItem
                        key={menuItem.id}
                        id={menuItem.id}
                        name={menuItem.name}
                        image={menuItem.image}
                        price={menuItem.price}
                        category={menuItem.category}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </ul>
            {selectedMenuItem && (
                <>
                    <Modal
                        name={selectedMenuItem.name}
                        image={selectedMenuItem.image}
                        onBack={handleModalClose}
                        onConfirm={() => {
                            props.onAddToCart(selectedMenuItem);
                            handleModalClose();
                        }}
                        selectedMenuItem={selectedMenuItem}
                    />
                    <Backdrop onClick={handleModalClose} />
                </>
            )}
        </>
    );
}

export default MenuList;