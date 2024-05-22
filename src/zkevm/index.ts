import { ERC20 } from "./erc20";
import { ZkEvmBridge } from "./zkevm_bridge";
import { BridgeUtil } from "./bridge_util";
import { ZkEvmBridgeClient } from "../utils";
import { IZkEvmClientConfig, IZkEvmContracts } from "../interfaces";
import { config as urlConfig } from "../config";
import { service, NetworkService } from "../services";
import { ZkEVMWrapper } from "./zkevm_wrapper";


export * from "./zkevm_bridge";
export * from "./bridge_util";
export * from "./zkevm_wrapper";

export class ZkEvmClient extends ZkEvmBridgeClient {

    zkEVMWrapper: ZkEVMWrapper;

    init(config: IZkEvmClientConfig) {
        const client = this.client;

        return client.init(config).then(_ => {
            const mainZkEvmContracts = client.mainZkEvmContracts; 
            const zkEvmContracts = client.zkEvmContracts;
            client.config = config = Object.assign(
                {
                    parentBridge: mainZkEvmContracts.PolygonZkEVMBridgeProxy,
                    childBridge: zkEvmContracts.PolygonZkEVMBridge,
                    zkEVMWrapper: mainZkEvmContracts.ZkEVMWrapper
                } as IZkEvmClientConfig,
                config
            );

            this.rootChainBridge = new ZkEvmBridge(
                this.client,
                config.parentBridge,
                true
            );

            this.childChainBridge = new ZkEvmBridge(
                this.client,
                config.childBridge,
                false
            );

            this.zkEVMWrapper = new ZkEVMWrapper(
                this.client,
                config.zkEVMWrapper
            );

            this.bridgeUtil = new BridgeUtil(
                this.client
            );

            if (!service.zkEvmNetwork) {
                if (urlConfig.zkEvmBridgeService[urlConfig.zkEvmBridgeService.length - 1] !== '/') {
                    urlConfig.zkEvmBridgeService += '/';
                }
                urlConfig.zkEvmBridgeService += 'api/zkevm/';
                service.zkEvmNetwork = new NetworkService(urlConfig.zkEvmBridgeService);
            }

            return this;
        });
    }

    /**
     * creates instance of ERC20 token
     *
     * @param {string} tokenAddress
     * @param {boolean} isParent
     * 
     * @returns
     * @memberof ERC20
     */
    erc20(tokenAddress: string, isParent?: boolean) {
        return new ERC20(
            tokenAddress,
            isParent,
            this.client,
            this.getContracts_.bind(this)
        );
    }

    getBlock(blockNum: any, isParent?: boolean){
        return this.client.getBlock(blockNum, isParent);
    }

    eigenGetBlock(blockNum: any, isParent?: boolean){
        return this.client.eigenGetBlock(blockNum, isParent);
    }

    getBlockByNumber(blockNum: any, isParent?: boolean){
        return this.client.getBlockByNumber(blockNum, isParent);
    }

    getBatchProof(blockNum: any, isParent?: boolean){
        return this.client.getBatchProof(blockNum, isParent);
    }
    
    private getContracts_() {
        return {
            parentBridge: this.rootChainBridge,
            childBridge: this.childChainBridge,
            bridgeUtil: this.bridgeUtil,
            zkEVMWrapper: this.zkEVMWrapper
        } as IZkEvmContracts;
    }
}
