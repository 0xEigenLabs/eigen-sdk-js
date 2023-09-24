import { HttpRequest } from "../utils";

export class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    private createUrlForZkEvm(network: string, url: string) {
        return `${network}/${url}`;
    }

    getMerkleProofForZkEvm(network: string, networkID: number, depositCount: number) {
        const url = `merkle-proof?net_id=${networkID}&deposit_cnt=${depositCount}`
        console.log("getMerkleProofForZkEvm url is:", url);
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }

    getBridgeTransactionDetails(network: string, networkID: number, depositCount: number) {
        const url = `bridge?net_id=${networkID}&deposit_cnt=${depositCount}`;
        return this.httpRequest.get<any>(url).then(result => {
            return result.deposit;
        });
    }
}
