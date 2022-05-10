// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Crowdsale.sol";
import "./KycContract.sol";

contract MyTokenSale is CrowdSale {
  KycContract kyc;

  // rate in TKNbits
  constructor(
    uint256 rate, 
    address payable wallet, 
    IERC20 token
    ) 
    CrowdSale(rate, wallet, token)
  {
  
  }
}
