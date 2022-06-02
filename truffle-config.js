const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: '7545',
      network_id: '*' // match any network
    },
    // to work with metemask first account
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", MetaMaskAccountIndex)
      },
      network_id: 5777
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/INFURA_KEY", MetaMaskAccountIndex)
      },
      network_id: 4
    }
  },
  contracts_directory: './contracts',
  contracts_build_directory: './src/truffle_abis',
  compilers: {
    solc: {
      version: '0.8.7',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  }
}
