const rxParseJson = /position\s(\d+)(?: \(line \d+ column \d+\))?$/

export function parseJson(s: string, pos: number): unknown {
    throw new Error("STUB");
}

parseJson.message = undefined as string | undefined
parseJson.position = 0 as number
parseJson.code = 'require("ajv/dist/runtime/parseJson").parseJson'

export function parseJsonNumber(s: string, pos: number, maxDigits?: number): number | undefined {
    throw new Error("STUB");
}

parseJsonNumber.message = undefined as string | undefined
parseJsonNumber.position = 0 as number
parseJsonNumber.code = 'require("ajv/dist/runtime/parseJson").parseJsonNumber'

const escapedChars: {[X in string]?: string} = {
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t",
  '"': '"',
  "/": "/",
  "\\": "\\",
}

const CODE_A: number = "a".charCodeAt(0)
const CODE_0: number = "0".charCodeAt(0)

export function parseJsonString(s: string, pos: number): string | undefined {
    throw new Error("STUB");
}

parseJsonString.message = undefined as string | undefined
parseJsonString.position = 0 as number
parseJsonString.code = 'require("ajv/dist/runtime/parseJson").parseJsonString'
