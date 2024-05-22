import { IBaseClientConfig } from "../interfaces";
import { BaseWeb3Client } from "../abstracts";
import { ABIManager } from "../utils";
import { Logger } from "./logger";
import { utils } from "..";

import { Web3Client } from "../../zeth-web3/src/web3";

const chainIdToConfigPath = {
    1: 'Main',
    5: 'Main',
    1442: 'zkEVM',
    1101: 'zkEVM'
};

export class Web3SideChainClient<T_CONFIG> {
    parent: BaseWeb3Client;
    child: BaseWeb3Client;

    config: T_CONFIG;

    abiManager: ABIManager;

    logger = new Logger();
    resolution: {};

    init(config: IBaseClientConfig) {
        config = config || {} as any;
        config.parent.defaultConfig = config.parent.defaultConfig || {} as any;
        config.child.defaultConfig = config.child.defaultConfig || {} as any;
        this.config = config as any;

        const web3Client = Web3Client;

        if (!web3Client) {
            throw new Error("Web3Client is not set");
        }

        if (utils.UnstoppableDomains) {
            this.resolution = utils.UnstoppableDomains;
        }

        this.parent = new (web3Client as any)(config.parent.provider, this.logger);
        this.child = new (web3Client as any)(config.child.provider, this.logger);

        this.logger.enableLog(config.log);

        const network = config.network;
        const version = config.version;
        const abiManager = this.abiManager =
            new ABIManager(network, version);
        this.logger.log("init called", abiManager);
        return abiManager.init().catch(err => {
            throw new Error(`network ${network} - ${version} is not supported`);
        });
    }

    getABI(name: string, type?: string) {
        return this.abiManager.getABI(name, type);
    }

    getConfig(path: string) {
        return this.abiManager.getConfig(path);
    }

    get mainZkEvmContracts() {
        return this.getConfig("Main.Contracts");
    }

    get zkEvmContracts() {
        return this.getConfig("zkEVM.Contracts");
    }

    getBlock(blockNum: any, isParent?: boolean){
        if(isParent){
            return this.parent.getBlock(blockNum);
        }
        else{
            return this.child.getBlock(blockNum);
        }
    }

    eigenGetBlock(blockNum: any, isParent?: boolean){
        if(isParent){
            return this.parent.eigenGetBlock(blockNum);
        }
        else{
            return this.child.eigenGetBlock(blockNum);
        }
    }

    getBlockByNumber(blockNum: any, isParent?: boolean){
        if(isParent){
            return this.parent.getBlockByNumber(blockNum);
        }
        else{
            return this.child.getBlockByNumber(blockNum);
        }
    }

    getBatchProof(blockNum: any, isParent?: boolean){
        if(isParent){
            return this.parent.getBatchProof(blockNum);
        }
        else{
            return this.child.getBatchProof(blockNum);
        }
    }

    isEIP1559Supported(chainId: number): boolean {
        return this.getConfig(`${chainIdToConfigPath[chainId]}.SupportsEIP1559`);
    }

}
