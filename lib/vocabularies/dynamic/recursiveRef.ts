import type {CodeKeywordDefinition} from "../../types"
import {dynamicRef} from "./dynamicRef"

const def: CodeKeywordDefinition = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (cxt) => { throw new Error("STUB"); },
}

export default def
