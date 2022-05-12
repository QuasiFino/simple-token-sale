import Web3 from "web3/dist/web3.min";

import MyToken from "../../truffle_abis/MyToken.json";
import MyTokenSale from "../../truffle_abis/MyTokenSale.json";
import KycContract from "../../truffle_abis/KycContract.json";

import { 
  CONNECTION_SUCCCESS,  
  CONNECTION_REQUEST,
  CONNECTION_FAILED,
  UPDATE_ACCOUNT
} from "../ActionTypes";

const connectRequest = () => {
  return {
    type: CONNECTION_REQUEST,
  };
};

const connectSuccess = (payload) => {
  return {
    type: CONNECTION_SUCCCESS,
    payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: CONNECTION_FAILED,
    payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: UPDATE_ACCOUNT,
    payload,
  };
};

export const connectBlockchain = () => async dispatch => {
  dispatch(connectRequest());
  if(window.ethereum) {
    let web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request ({
        method: "eth_requestAccounts",
      });

      const networkId = await window.ethereum.request ({
        method: "net_version",
      });
      const NetworkDataMyToken = await MyToken.networks[networkId];
      const NetworkDataMyTokenSale = await MyTokenSale.networks[networkId];
      const NetworkDataKycContract = await KycContract.networks[networkId];
      if(NetworkDataMyToken && NetworkDataMyTokenSale && NetworkDataKycContract) {
        const myTokenObj = new web3.eth.Contract(
          MyToken.abi,
          NetworkDataMyToken.address
        );
        const myTokenSaleObj = new web3.eth.Contract(
          MyTokenSale.abi,
          NetworkDataMyTokenSale.address
        );
        const kycContractObj = new web3.eth.Contract(
          KycContract.abi,
          NetworkDataKycContract.address
        );
        dispatch(connectSuccess({
          account: accounts[0],
          myToken: myTokenObj,
          myTokenSale: myTokenSaleObj,
          kycContract: kycContractObj,
          web3,
        }));

        window.ethereum.on("accountsChanged", (accounts) => {
          dispatch(updateAccount(accounts[0]));
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } else {
        dispatch(connectFailed("Change to correct network"));
      }
    } catch (err) {
      dispatch(connectFailed("Something went wrong"));
    }
  } else {
    dispatch(connectFailed("Install Metamask"));
  }
};

export const updateAccount = (account) => async dispatch => {
  dispatch(updateAccountRequest({ account: account }));
};
