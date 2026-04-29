import type {
  CodeKeywordDefinition,
  ErrorObject,
  KeywordErrorDefinition,
  AnySchema,
} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {_, str, not, Name} from "../../compile/codegen"
import {alwaysValidSchema, checkStrictMode, Type} from "../../compile/util"

export type AdditionalItemsError = ErrorObject<"additionalItems", {limit: number}, AnySchema>

const error: KeywordErrorDefinition = {
  message: ({params: {len}}) => { throw new Error("STUB"); },
  params: ({params: {len}}) => { throw new Error("STUB"); },
}

const def: CodeKeywordDefinition = {
  keyword: "additionalItems" as const,
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error,
  code(cxt: KeywordCxt) {
    const {parentSchema, it} = cxt
    const {items} = parentSchema
    if (!Array.isArray(items)) {
      checkStrictMode(it, '"additionalItems" is ignored when "items" is not an array of schemas')
      return
    }
    validateAdditionalItems(cxt, items)
  },
}

export function validateAdditionalItems(cxt: KeywordCxt, items: AnySchema[]): void {
  const {gen, schema, data, keyword, it} = cxt
  it.items = true
  const len = gen.const("len", _`${data}.length`)
  if (schema === false) {
    cxt.setParams({len: items.length})
    cxt.pass(_`${len} <= ${items.length}`)
  } else if (typeof schema == "object" && !alwaysValidSchema(it, schema)) {
    const valid = gen.var("valid", _`${len} <= ${items.length}`) // TODO var
    gen.if(not(valid), () => { throw new Error("STUB"); })
    cxt.ok(valid)
  }

  function validateItems(valid: Name): void {
    gen.forRange("i", items.length, len, (i) => {
        throw new Error("STUB");
    })
  }
}

export default def
