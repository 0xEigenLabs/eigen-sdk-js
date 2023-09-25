import { defaultExport } from "../default";

export interface IPlugin {
    setup(eigen: typeof defaultExport, ...payload);
}