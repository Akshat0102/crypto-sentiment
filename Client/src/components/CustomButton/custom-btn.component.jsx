import React from "react";
import './custom-btn.styles.css';

const CustomButton = ({ onClickHandler, children }) => {
    return (
        <button className="btn" type="submit" onClick={onClickHandler}>
            {children}
        </button>
    )
}

export default CustomButton;