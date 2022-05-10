// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

  constructor(uint256 initialSupply) ERC20("StarDucks Capu-Token", "SCT") {
    _mint(msg.sender, initialSupply);
  }

  // The new ERC20 contract has a default decimal points of 18, we can change it to decimal points of 0 in the constructor by overriding
  function decimals() public pure override returns(uint8) {
    return 0;
  }
  
}
