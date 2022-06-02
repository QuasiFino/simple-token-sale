import { createSlice } from "@reduxjs/toolkit";
import { 
  CONNECTION_REQUEST,
  CONNECTION_SUCCCESS,
  CONNECTION_FAILED,
  UPDATE_ACCOUNT 
} from "../ActionTypes";

const initialState = {
  loading: false,
  account: null,
  myToken: null,
  myTokenSale: null,
  kycContract: null,
  web3: null,
  tokenBalance: "",
  kycCompleted: false,
  errorMsg: "",
}

export const blockchainReducer = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    connectRequest: (state, action) => {
      return { ...state, loading: true };
    },
    connectSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        myToken: action.payload.myToken,
        myTokenSale: action.payload.myTokenSale,
        kycContract: action.payload.kycContract,
        tokenBalance: action.payload.tokenBalance,
        kycCompleted: action.payload.kycCompleted,
        web3: action.payload.web3,
      };
    },
    connectFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    },
    updateAccountRequest: (state, action) => {
      return {
        ...state,
        account: action.payload.account,
        tokenBalance: action.payload.tokenBalance,
        kycCompleted: action.payload.kycCompleted,
      };
    }
  }
});

const blockchainReducerold = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case CONNECTION_SUCCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        myToken: action.payload.myToken,
        myTokenSale: action.payload.myTokenSale,
        kycContract: action.payload.kycContract,
        web3: action.payload.web3,
      }
    case CONNECTION_FAILED:
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      }
    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducerold;

// to export action
// export const { connectRequest, connectSuccess, connectFailed, updateAccountRequest } = blockchainReducer.actions;
// to export reducer
// export default blockchainReducer.reducer;
