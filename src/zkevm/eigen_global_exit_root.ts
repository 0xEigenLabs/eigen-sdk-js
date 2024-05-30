import { BaseToken, Web3SideChainClient, Converter, promiseResolve } from "../utils";
import { IZkEvmClientConfig, ITransactionOption } from "../interfaces";
import { TYPE_AMOUNT } from "../types";

export class EigenGlobalExitRootL2 extends BaseToken<IZkEvmClientConfig> {

    networkID_: number;

    constructor(client_: Web3SideChainClient<IZkEvmClientConfig>, address: string) {
        // EigenGlobalExitRootL2 contract is deployed on L2, isParent is false
        super({
            address: address,
            name: 'EigenGlobalExitRootL2',
            bridgeType: 'zkevm',
            isParent: false
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    updateGlobalExitRootMap(lastMainnetExitRoot: string){
        return this.method(
            "updateGlobalExitRootMap",
            lastMainnetExitRoot,
        ).then(method => {
            return this.processWrite(method);
        });
    }
}
