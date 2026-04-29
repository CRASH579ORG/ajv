import type {AddedKeywordDefinition} from "../types"

const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"] as const

export type JSONType = (typeof _jsonTypes)[number]

const jsonTypes: Set<string> = new Set(_jsonTypes)

export function isJSONType(x: unknown): x is JSONType {
    throw new Error("STUB");
}

type ValidationTypes = {
  [K in JSONType]: boolean | RuleGroup | undefined
}

export interface ValidationRules {
  rules: RuleGroup[]
  post: RuleGroup
  all: {[Key in string]?: boolean | Rule} // rules that have to be validated
  keywords: {[Key in string]?: boolean} // all known keywords (superset of "all")
  types: ValidationTypes
}

export interface RuleGroup {
  type?: JSONType
  rules: Rule[]
}

// This interface wraps KeywordDefinition because definition can have multiple keywords
export interface Rule {
  keyword: string
  definition: AddedKeywordDefinition
}

export function getRules(): ValidationRules {
    throw new Error("STUB");
}
