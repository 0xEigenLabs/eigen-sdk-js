const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config({
  path: path.join(__dirname, '.env')
});

if (env.error) {
  throw new Error("no env file found");
}

module.exports = {
  rpc: {
    zkEvm: {
      parent: process.env.GOERLI_ROOT_RPC,
      child: process.env.ZKEVM_RPC,
    },
  },
  zkEvm: {
    parent: {
      ether: '0x0000000000000000000000000000000000000000',
      erc20: 'your erc20 address'
    },
    child: {
      ether: '0x0000000000000000000000000000000000000000',
      erc20: 'your erc20 address'
    },
  },
  user1: {
    // '<paste your private key here>' - A sample private key prefix with `0x`
    privateKey: process.env.USER1_PRIVATE_KEY,
    //'<paste address belonging to private key here>', Your address
    address: process.env.USER1_FROM
  },
  user2: {
    address: process.env.USER2_FROM
  },
  proofApi: process.env.PROOF_API
}
