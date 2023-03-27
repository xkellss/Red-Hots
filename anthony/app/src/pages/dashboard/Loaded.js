import React, { useEffect, useRef } from 'react';
import './css/loaded.css';

const Loaded = () => {
    const loadedRef = useRef();

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    async function wait(delay) {
        await timeout(250); //for 1 sec delay
        loadedRef.current.style.width = '0';
    }

    useEffect(() => {
        wait();
    }, []);
    return (
        <div className='Loaded' ref={loadedRef}>
            Loading...
        </div>
    )
}

export default Loaded;