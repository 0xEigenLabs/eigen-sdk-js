import { ITransactionData } from "@maticnetwork/maticjs";
import { Transaction } from "web3/eth/types";

export const web3TxToZethTx = (tx: Transaction) => {
    const zethTx: ITransactionData = tx as any;
    zethTx.transactionHash = tx.hash;
    return zethTx;
};