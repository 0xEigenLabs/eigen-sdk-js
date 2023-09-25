const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  const erc20Token = client.erc20(zkEvm.parent.erc20);
  const networkID = 0
  const tokenWrappedAddress = await erc20Token.getMappedTokenInfo(networkID)
  console.log("tokenWrappedAddress: ", tokenWrappedAddress);
}

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})