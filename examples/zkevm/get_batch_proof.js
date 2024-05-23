const { getZkEvmClient, zkEvm, from } = require('../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  let blockNum = 1;
  let isParaent = false
  let batchProof = await client.getBatchProof(blockNum, isParaent)
  /***
   * batchProof:
   * 
   * {
   *    "block_number": "",
   *    "proof": "{
   *        "pi_a": "",
   *        "pi_b": "",
   *        "pi_c": "",
   *        "protocol": "",
   *        "curve": ""
   *     }",
   *     "pre_state_root": "0x",
   *     "post_state_root": "0x"
   * }
   */
  console.log("batchProof", batchProof);
}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})