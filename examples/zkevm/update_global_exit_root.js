const { getZkEvmClient, zkEvm, from } = require('../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  let lastMainnetExitRoot = "0x2cba6a7fc479e4f6993e891d125788dcac7ac4db16fe48d5a7ed646222c96d82"
  let res = await client.updateGlobalExitRootMap(lastMainnetExitRoot);

  const txHash = await res.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await res.getReceipt();
  console.log("receipt", receipt);
}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})