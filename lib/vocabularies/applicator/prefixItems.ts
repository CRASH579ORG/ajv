import type {CodeKeywordDefinition} from "../../types"
import {validateTuple} from "./items"

const def: CodeKeywordDefinition = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (cxt) => { throw new Error("STUB"); },
}

export default def
