// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract CrowdSale is Context, ReentrancyGuard{

  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  IERC20 private _token;

  address payable private _wallet;

  // How many tokens a buyer gets per Wei
  uint256 private _rate;

  // Amount of Wei raised
  uint256 private _weiRaised;

  /**
    * Event for token purchase logging
    * @param purchaser who paid for the tokens
    * @param beneficiary who got the tokens
    * @param value weis paid for purchase
    * @param amount amount of tokens purchased
    */
  event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

  constructor(uint256 rateVal, address payable walletAddress, IERC20 tokenAddress) {
    _rate = rateVal;
    _wallet = walletAddress;
    _token = tokenAddress;
  }

  receive () external payable {
    buyTokens(_msgSender());
  }

  function token() public view returns(IERC20) {
    return _token;
  }

  function wallet() public view returns(address payable) {
    return _wallet;
  }

  function rate() public view returns(uint256) {
    return _rate;
  }

  function weiRaised() public view returns(uint256) {
    return _weiRaised;
  }

  function buyTokens(address beneficiary) public nonReentrant payable {
    uint256 weiAmount = msg.value;
    _preValidatePurchase(beneficiary, weiAmount);

    uint256 tokens = _getTokenAmount(weiAmount);

    _weiRaised = _weiRaised.add(weiAmount);

    _processPurchase(beneficiary, tokens);
    emit TokensPurchased(_msgSender(), beneficiary, weiAmount, tokens);

    _updatePurchasingState(beneficiary, weiAmount);
    _forwardFunds();
    _postValidatePurchase(beneficiary, weiAmount);
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view virtual {
    require(beneficiary != address(0), "CrowdSale: beneficiary is the zero address");
    require(weiAmount != 0, "CrowdSale: weiAmount is 0");
    this;
  }

  function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view virtual {

  }

  function _deliverTokens(address beneficiary, uint256 tokenAmount) internal virtual {
    _token.safeTransfer(beneficiary, tokenAmount);
  }

  function _processPurchase(address beneficiary, uint256 tokenAmount) internal virtual {
    _deliverTokens(beneficiary, tokenAmount);
  }

  function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal virtual {

  }

  function _getTokenAmount(uint256 weiAmount) internal view virtual returns(uint256) {
    return weiAmount.mul(_rate);
  }

  function _forwardFunds() internal {
    _wallet.transfer(msg.value);
  }

}

