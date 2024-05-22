const { getZkEvmClient, zkEvm, from } = require('../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  let blockNum = 1;
  let isParaent = true
  let block = await client.getBatchProof(blockNum, isParaent)
  console.log("block", block);
}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})