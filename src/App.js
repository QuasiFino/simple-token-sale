import React, {useState} from 'react';
import { connect } from 'react-redux';

import * as actions from './redux/blockchain/blockchainActions';
import './App.css';

const App = (props) => {

  const { account, myToken, myTokenSale, kycContract, errorMsg, loading } = props.blockchain;
  const [kycAddress, setKycAddress] = useState("0x123");

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
        <button type="button" onClick={handleSubmit}>Add address to Whitelist</button>
      </div>
    );
  }

  // console.log(props.blockchain);
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
    blockchain: state.blockchain
  }
};

export default connect(mapStateToProps, actions)(App);
