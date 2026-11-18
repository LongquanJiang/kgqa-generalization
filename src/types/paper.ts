import schema from "../db/schema.json"

const properties = schema.items.properties


// This creates an object with the schema.json enum as both keys and values. 
// The synstax is a bit weird, but this is what typescript would compile a type to.
// Because of the syntax it can be used to get the correct types using typeof (creating a normal object does not work)
export let Data: any
(function (Data) {
	properties["Data Level Mechanisms"].items.enum.forEach((val) => {
		Data[val] = val
	})
})(Data || (Data = {}))

export let Model: any
(function (Model) {
	properties["Model Level Mechanisms"].items.enum.forEach((val) => {
		Model[val] = val
	})
})(Model || (Model = {}))

export let Learning: any
(function (Learning) {
	properties["Learning Level Mechanisms"].items.enum.forEach((val) => {
		Learning[val] = val
	})
})(Learning || (Learning = {}))

export interface Paper {
    Title: string
    url: string
    Year: string
    Venue: VenueType
    Authors: Array<string>
    "Data Level Mechanisms": Array<typeof Data>
    "Model Level Mechanisms": Array<typeof Model>
    "Learning Level Mechanisms": Array<typeof Learning>
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
    NAACL = "NAACL",
    EMNLP = "EMNLP",
    CIKM = "CIKM",
    COLING = "COLING",
    LREC = "LREC",
    Other = "Other"
}

