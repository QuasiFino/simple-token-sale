import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import * as actions from './redux/blockchain/blockchainActions';
import { connectBlockchain } from './redux/blockchain/blockchainActions';
import { fetchData } from './redux/data/dataActions';
import './App.css';

const App = (props) => {

  const { account, myToken, myTokenSale, kycContract, errorMsg, loading } = props.blockchain;
  const { kycCompleted, tokenBalance } = props.data;
  const [kycAddress, setKycAddress] = useState("0x123");
  const [userBalance, setUserBalance] = useState("0");

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;
    setKycAddress(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await kycContract.methods.setKycCompleted(kycAddress).send({from: account});
      alert(`Account ${kycAddress} is now whitelisted`);
    } catch (err) {
      console.log(err);
    }
  }

  const handleBuyTokens = async (event) => {
    event.preventDefault();
    await myTokenSale.methods.buyTokens(account).send({ from: account, value: 1, gasPrice: '20000000000' });
    props.fetchData(account);
  }

  // const listenToTokenTransfer = () => {
  //   myToken.events.Transfer({ to: account }).on("data", async () => {
  //     let userTokens = await myToken.methods.balanceOf(account).call();
  //     setUserBalance(userTokens);
  //   })
  // }

  useEffect(() => {
    let isMounted = true;

    if(isMounted && account && myToken && myTokenSale && kycContract) {
      props.fetchData(account);
    }

    return () => { isMounted = false }
  }, [account]);

  // console.log(props.data);

  const renderConnect = () => {
    if(
      account === ""
      || myToken === null
      || myTokenSale === null
      || kycContract === null
    ) {
      
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            props.connectBlockchain();
          }}
        >
          Connect
        </button>
      );
    }

    return (
      <span>
        {`Connected ${account.slice(0, 4)}...${account.slice(-4)}`}
      </span>
    );
  }

  const renderContent = () => {
    if(loading) return (<p>Loading...</p>);
    return (
      <div>
        <h1>Capuccino Token for StarDucks</h1>
        <h2>Enable your account</h2>
        Address to allow: <input type="text" name="kycAddress" value={kycAddress} onChange={handleChange}/>
        <button type="button" onClick={handleSubmit} disabled={myToken ? false : true}>Add address to Whitelist</button>
        <h2>Buy Cappucino-Tokens</h2>
        {myTokenSale ? (
          <div>
            <p>Send Ether to this address: {myTokenSale._address}</p>
            <p>kyc Completed: {(kycCompleted).toString()}</p>
            <p>You have: {tokenBalance} tokens</p>
            <button type='button' onClick={handleBuyTokens}>Buy one token</button>
          </div>
        ) : null}
        
      </div>
    );
  }

  return (
    <div className="App">
      {renderConnect()}
      {renderContent()}
      <p>{errorMsg && errorMsg}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    blockchain: state.blockchain,
    data: state.data
  }
};

export default connect(mapStateToProps, { connectBlockchain, fetchData })(App);
