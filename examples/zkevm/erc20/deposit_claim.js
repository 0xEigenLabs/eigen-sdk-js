const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');
//const transactionHash = '0x4cd97048e77215b93bbfeb1e5ee7eadef74cccba13de7cd286e55f17726385c2';
const transactionHash = '0x0596ba594f764a53759f584731a435a111f0d5d4eaa790a6c34fb63768d3f384';


const execute = async () => {
  const client = await getZkEvmClient();
  const erc20Token = client.erc20(zkEvm.child.erc20);

  const result = await erc20Token.depositClaim(transactionHash, {
    from, 
    gasLimit: 300000,
    gasPrice: 10000000000,
    // maxPriorityFeePerGas: 6000000000, 
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