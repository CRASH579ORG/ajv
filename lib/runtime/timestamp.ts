const DT_SEPARATOR = /t|\s/i
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/
const TIME = /^(\d\d):(\d\d):(\d\d)(?:\.\d+)?(?:z|([+-]\d\d)(?::?(\d\d))?)$/i
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export default function validTimestamp(str: string, allowDate: boolean): boolean {
    throw new Error("STUB");
}

function validDate(str: string): boolean {
    throw new Error("STUB");
}

function validTime(str: string): boolean {
    throw new Error("STUB");
}

validTimestamp.code = 'require("ajv/dist/runtime/timestamp").default'
