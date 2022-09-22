import React from "react";
import { ConnectButton } from "web3uikit";
import './header.styles.css';
import logo from '../../assets/images/Moralis.png';

const Header = () => {
    return (
        <div className="header">
            <div className="header-wrap">
                <div className="logo">
                    <img src={logo} alt="Moralis Logo" height="50px" />
                    Sentiment
                </div>
                <ConnectButton />
            </div>
        </div>
    )
}

export default Header;