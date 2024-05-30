const { getZkEvmClient, zkEvm, from } = require('../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  let lastMainnetExitRoot = "0x696ab68e8fc171a30b26f661191a258f72a7a8a4794bb7d87647c32733909170"
  await client.updateGlobalExitRootMap(lastMainnetExitRoot);
}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})