import {useState, useEffect} from "react";
import MenuList from "../components/menu/MenuList";

import './menupage.css';
import axios from 'axios';

const MenuPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [loadedMenuItems, setLoadedMenuItems] = useState([])

    const getItems = async () => {
        await axios.get("https://localhost:7074/api/items")
        .then(res => {
            console.log(res);
            setLoadedMenuItems(res.data);
            console.log(res.data)
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getItems();
        setIsLoading(false);
    }, []);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('/json/item.json'
    //     )
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             const menuItems = [];

    //             for (const key in data) {
    //                 const menuItem = {
    //                     id: key,
    //                     ...data[key]
    //                 };

    //                 menuItems.push(menuItem);
    //             }
    //             setIsLoading(false)
    //             setLoadedMenuItems(menuItems)
    //         });
    // }, []);


    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }
    return (
        <section className="MenuPage">
            <h1> Online Ordering</h1>
            <MenuList menuItems={loadedMenuItems} />
        </section>
    );
}

export default MenuPage;