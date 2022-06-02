import { 
  CHECK_DATA_REQUEST, 
  CHECK_DATA_SUCCESS, 
  CHECK_DATA_FAILED 
} from "../ActionTypes";

const initialState = {
  tokenBalance: 0,
  kycCompleted: false,
  dataLoading: false,
  errMsg: ""
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_DATA_REQUEST:
      return {
        ...initialState,
        dataLoading: true
      };
    case CHECK_DATA_SUCCESS:
      return {
        ...initialState,
        dataLoading: false,
        tokenBalance: action.payload.tokenBalance,
        kycCompleted: action.payload.kycCompleted
      }
    case CHECK_DATA_FAILED:
      return {
        ...initialState,
        dataLoading: false,
        errMsg: action.payload
      }
    default:
      return state;
  }
};

export default dataReducer;
