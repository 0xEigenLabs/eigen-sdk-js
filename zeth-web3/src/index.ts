import { IPlugin } from "@maticnetwork/maticjs";
import Web3 from "web3";
import { ZethBigNumber } from "./utils";
import { Web3Client } from "./web3";

export class Web3ClientPlugin implements IPlugin {
    setup(zeth) {
        zeth.utils.Web3Client = Web3Client;
        zeth.utils.BN = ZethBigNumber;
        zeth.utils.isBN = (value) => {
            return Web3.utils.isBN(value);
        };
    }
}

export * from "./utils";

/* tslint:disable-next-line */
export default Web3ClientPlugin;