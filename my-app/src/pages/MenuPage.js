import {useState, useEffect} from "react";
import MenuList from "../components/menu/MenuList";

function MenuPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [loadedMenuItems, setLoadedMenuItems] = useState([])

    function handleAddToCart(menuItem) {
        // Add the selected menuItem to the cart
        console.log(`Adding ${menuItem.name} to the cart...`);
    }
    useEffect(() => {
        setIsLoading(true);
        fetch('/json/item1.json'
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const menuItems = [];

                for (const key in data) {
                    const menuItem = {
                        id: key,
                        ...data[key]
                    };

                    menuItems.push(menuItem);
                }
                setIsLoading(false)
                setLoadedMenuItems(menuItems)
            });
    }, []);


    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }
    return (
        <section>
            <h1> Online Ordering</h1>
            <MenuList menuItems={loadedMenuItems} onAddToCart={handleAddToCart} />
        </section>
    );
}

export default MenuPage;