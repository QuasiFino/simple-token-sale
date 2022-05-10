module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: '7545',
      network_id: '*' // match any network
    },
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