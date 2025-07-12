module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (Ganache)
      port: 7545,            // Port number used by Ganache
      network_id: "*",       // Match any network id (use * if not sure)
    },
  },

  compilers: {
    solc: {
      version: "0.8.19",     // Your Solidity version
    },
  },
};
