const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  const erc20Token = client.erc20(zkEvm.parent.erc20, true);

  const to = "0x588d680b2F3E6cC01De5a1EFe77FfAaAC61cf45E"
    const result = await erc20Token.transfer(1, to, {
        gasPrice: '30000000000',
    });

    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})