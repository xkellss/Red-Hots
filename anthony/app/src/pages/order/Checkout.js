import React from 'react';

const Checkout = ({ order }) => {

    return (
        <div className="checkout">
            <div className="checkout__details">
                <div className="details__container">
                    <button type="button" className="checkout__back-button">Back to Menu</button>
                    <div className="details__item">
                        <span className="checkout__"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}