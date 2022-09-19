import React, { useEffect, useState } from 'react';
import './homepage.styles.css';
import { Modal } from 'web3uikit';
import Coin from '../../components/Coin/coin.component';
import { abouts } from '../../about';
import { useMoralisWeb3Api, useMoralis } from "react-moralis";

const HomePage = () => {

    const [btc, setBtc] = useState(80);
    const [eth, setEth] = useState(30);
    const [link, setLink] = useState(60);
    const [modalPrice, setModalPrice] = useState();
    const Web3Api = useMoralisWeb3Api();
    const { Moralis, isInitialized } = useMoralis();
    const [visible, setVisible] = useState(false);
    const [modalToken, setModalToken] = useState();

    const getRatio = async (crypt, setPerc) => {
        const Votes = Moralis.Object.extend("Votes");
        const query = new Moralis.Query(Votes);
        query.equalTo("crypto", crypt);
        query.descending("createdAt");
        const results = await query.first();
        let up = Number(results.attributes.up);
        let down = Number(results.attributes.down);
        let ratio = Math.round(up / (up + down) * 100);
        setPerc(ratio);
    }

    useEffect(() => {
        if (isInitialized) {
            getRatio("BTC", setBtc);
            getRatio("ETH", setEth);
            getRatio("LINK", setLink);

            const createLiveQuery = async () => {
                let query = new Moralis.Query('Votes');
                let subscription = await query.subscribe();

                subscription.on('update', (object) => {

                    if (object.attributes.crypto === "LINK") {
                        getRatio("LINK", setLink);
                    } else if (object.attributes.crypto === "ETH") {
                        getRatio("ETH", setEth);
                    } else if (object.attributes.crypto === "BTC") {
                        getRatio("BTC", setBtc);
                    }
                });
            }
            createLiveQuery();
        }
    }, [isInitialized]);

    useEffect(() => {
        const fetchTokenPrice = async () => {
            const options = {
                address: abouts[abouts.findIndex((idx) => idx.token === modalToken)].address
            };
            const price = await Web3Api.token.getTokenPrice(options);
            setModalPrice(price.usdPrice.toFixed(2));
        }
        if (modalToken) { fetchTokenPrice(); }
    }, [modalToken]);

    return (
        <div className="homepage">
            <div className="homepage-wrap">
                <div className="instructions">
                    <p>Where do you think these tokens are going? Up or Down?</p>
                </div>
                <div className="list">
                    <Coin perc={btc} setPerc={setBtc} token={"BTC"} setModalToken={setModalToken} setVisible={setVisible} />
                    <Coin perc={eth} setPerc={setEth} token={"ETH"} setModalToken={setModalToken} setVisible={setVisible} />
                    <Coin perc={link} setPerc={setLink} token={"LINK"} setModalToken={setModalToken} setVisible={setVisible} />
                </div>
                <Modal
                    isVisible={visible}
                    onCloseButtonPressed={() => { setVisible(false) }}
                    hasFooter={false}
                    title={modalToken}>
                    <div>
                        <span style={{ color: "white" }}>{`Price: `}</span>
                        {modalPrice}$
                    </div>
                    <div>
                        <span style={{ color: "white" }}>{`About`}</span>
                    </div>
                    <div>
                        {modalToken && abouts[abouts.findIndex((idx) => idx.token === modalToken)].about}
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default HomePage;