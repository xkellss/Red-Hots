import React from "react";
import classes from './Modal.module.css'

function Modal(props){
    function backHandler() {
        props.onBack();
    }

    function confirmHandler() {
        props.onConfirm();
    }

    return(
        <div className={classes.modal}>
            <h2>{props.name}</h2>
            <div className={classes.image}>
                <img src={props.image} alt={`${props.name} image`} />
            </div>

            <p>Are you sure?</p>
            <button className={classes.btnBack} onClick={backHandler}>Back</button>
            <button className={classes.btn} onClick={confirmHandler}>Add to cart</button>

        </div>
    )
}export default Modal;