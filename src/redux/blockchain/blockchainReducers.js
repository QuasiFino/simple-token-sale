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
  errorMsg: "",
}

const blockchainReducer = (state = initialState, action) => {
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

export default blockchainReducer;
