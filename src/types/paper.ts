import schema from "../db/schema.json"

const properties = schema.items.properties

function createEnum(values: string[]): Record<string, string> {
	return Object.fromEntries(values.map((value) => [value, value]))
}

export const Data = createEnum(properties["Type of Data"].items.enum)
export const Explanation = createEnum(properties["Type of Explanation"].items.enum)
export const Problem = createEnum(properties["Type of Problem"].items.enum)
export const Model = createEnum(properties["Type of Model to be Explained"].items.enum)
export const Task = createEnum(properties["Type of Task"].items.enum)
export const Method = createEnum(properties["Method used to explain"].items.enum)

export interface Paper {
    Title: string
    url: string
    Year: string
    Venue: VenueType
    Authors: Array<string>
    "Type of Data": Array<string>
    "Type of Problem": Array<string>
    "Type of Model to be Explained": Array<string>
    "Type of Task": Array<string>
    "Type of Explanation": Array<string>
    "Method used to explain": Array<string>
    Abstract: string
    Comment?: string
    Date?: Date,
    IsOld?: boolean
}

export type VenueType = {
    isOld: boolean,
    value: Venue | string
}

export enum Venue {
    ACL = "ACL",
    ICDM = "ICDM",
    KDD = "KDD",
    SIGIR = "SIGIR",
    AAAI = "AAAI",
    NeurIPS = "NeurIPS",
    ICCV = "ICCV",
    ICLR = "ICLR",
    WWW = "WWW",
    IJCAI = "IJCAI",
    ICML = "ICML",
    CVPR = "CVPR",
    Other = "Other"
}
