import React, { useEffect, useState } from 'react';
import { ConnectButton, Modal } from 'web3uikit';
import './App.css';
import logo from './assets/images/Moralis.png';
import Coin from './components/Coin/coin.component';
import { abouts } from './about';
import { useMoralisWeb3Api } from 'react-moralis';

function App() {

  const [btc, setBtc] = useState(50);
  const [eth, setEth] = useState(50);
  const [link, setLink] = useState(50);
  const [modalPrice, setModalPrice] = useState();
  const Web3Api = useMoralisWeb3Api();
  const [visible, setVisible] = useState(false);
  const [modalToken, setModalToken] = useState();

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
    <div className="App">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="Moralis Logo" height="50px" />
          Sentiment
        </div>
        <ConnectButton />
      </div>
      <div className="instructions">
        Where do you think these tokens are going? Up or Down?
      </div>
      <div className="list">
        <Coin perc={btc} setPerc={setBtc} token={"BTC"} setModalToken={setModalToken} setVisible={setVisible} />
        <Coin perc={eth} setPerc={setEth} token={"ETH"} setModalToken={setModalToken} setVisible={setVisible} />
        <Coin perc={link} setPerc={setLink} token={"LINK"} setModalToken={setModalToken} setVisible={setVisible} />
      </div>
      <Modal
        className="sc-kTvvXX"
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
  );
}

export default App;
