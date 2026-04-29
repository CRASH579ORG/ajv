import type {
  CodeKeywordDefinition,
  ErrorObject,
  KeywordErrorDefinition,
  AnySchema,
} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {_, not} from "../../compile/codegen"
import {alwaysValidSchema} from "../../compile/util"

export type PropertyNamesError = ErrorObject<"propertyNames", {propertyName: string}, AnySchema>

const error: KeywordErrorDefinition = {
  message: "property name must be valid",
  params: ({params}) => { throw new Error("STUB"); },
}

const def: CodeKeywordDefinition = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error,
  code(cxt: KeywordCxt) {
    const {gen, schema, data, it} = cxt
    if (alwaysValidSchema(it, schema)) return
    const valid = gen.name("valid")

    gen.forIn("key", data, (key) => {
        throw new Error("STUB");
    })

    cxt.ok(valid)
  },
}

export default def
