import { Provision } from "../provision/provisionModel";
import { Realization } from "../realization/makeData";

export type Report = {
    id: string;
    year: number;
    month: number;
    provisions: Provision[];
    realizations: Realization[];
}