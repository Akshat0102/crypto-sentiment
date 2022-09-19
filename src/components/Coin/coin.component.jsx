import React, { useEffect, useState } from "react";
import { Button } from "web3uikit";
import './coin.styles.css';
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import CustomButton from "../CustomButton/custom-btn.component";

const Coin = ({ perc, setPerc, token, setModalToken, setVisible }) => {

    const [color, setColor] = useState();
    const contractProcessor = useWeb3ExecuteFunction();
    const { isAuthenticated } = useMoralis();

    useEffect(() => {
        if (perc < 50) {
            setColor("#c43d08");
        } else {
            setColor("green");
        }
    }, [perc]);

    const vote = async (upDown) => {
        let options = {
            contractAddress: "0xfDd1D41F2E06D8FaDe039617b884588f96dd010B",
            functionName: "vote",
            abi: [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_crypto",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "_vote",
                            "type": "bool"
                        }
                    ],
                    "name": "vote",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            params: {
                _crypto: token,
                _vote: upDown,
            },
        }


        await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
                console.log("vote successful");
            },
            onError: (error) => {
                alert(error.data.message)
            }
        });
    }

    return (
        <div className="coin-wrap">
            <div className="token">
                {token}
            </div>
            <div className="circle" style={{ boxShadow: `0 0 20px ${color}` }}>
                <div className="wave" style={{
                    marginTop: `${100 - perc}%`,
                    boxShadow: `0 0 20px ${color}`,
                    backgroundColor: color,
                }}>
                </div>
                <p className="percentage">
                    {perc}%
                </p>
            </div>
            <div className="votes">
                <div className="up-div">
                    <CustomButton
                        onClickHandler={() => {
                            if (isAuthenticated) {
                                vote(false)
                            } else {
                                alert("Authenticate to Vote")
                            }
                        }}>up</CustomButton>
                </div>
                <div className="down-div">
                    <CustomButton
                        className="down-btn"
                        onClickHandler={() => {
                            if (isAuthenticated) {
                                vote(false)
                            } else {
                                alert("Authenticate to Vote")
                            }
                        }}>down</CustomButton>
                </div>
            </div>
            <div className="votes">
                <Button
                    size="large"
                    onClick={() => { setModalToken(token); setVisible(true); }}
                    text="INFO"
                    theme="translucent"
                    type="button" isFullWidth />
            </div>
        </div>
    )
}

export default Coin;