const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./chaisetup");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async(accounts) => {
  const [deployer, recipient, anotherAccount] = accounts;
  let tokenInstance, tokenSaleInstance, kycInstance;

  beforeEach(async() => {
    tokenInstance = await Token.deployed();
    tokenSaleInstance = await TokenSale.deployed();
    kycInstance = await KycContract.deployed();
  });

  it("there should not be any coins in my account", async() => {
    return expect(tokenInstance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("all coins should be in the tokenSale smart contract", async() => {
    let totalSupply = await tokenInstance.totalSupply.call();
    let balance = await tokenInstance.balanceOf.call(tokenSaleInstance.address);
    return expect(balance).to.be.a.bignumber.equal(totalSupply);
  });

  it("should be possible to buy one token by sending one wei to the tokenSale contract", async() => {
    let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);

    await expect(tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "wei") })).to.be.rejected;
    await kycInstance.setKycCompleted(recipient);

    await expect(tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "wei") })).to.be.fulfilled;
    return expect(tokenInstance.balanceOf.call(recipient)).to.eventually.be.a.bignumber.equal(balanceBeforeAccount.add(new BN(1)));
    // or
    // return expect(balanceBeforeAccount + 1).to.be.a.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
  });
});
