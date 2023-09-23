const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');
const ether = require("ethers")

const execute = async () => {
  const client = await getZkEvmClient();
  const etherToken = client.erc20(zkEvm.parent.ether, true);
  const result = await etherToken.deposit("20000000000000000", from);

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})