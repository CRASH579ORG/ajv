import type {CodeKeywordDefinition, AnySchema} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {alwaysValidSchema} from "../../compile/util"

const def: CodeKeywordDefinition = {
  keyword: "allOf",
  schemaType: "array",
  code(cxt: KeywordCxt) {
    const {gen, schema, it} = cxt
    /* istanbul ignore if */
    if (!Array.isArray(schema)) throw new Error("ajv implementation error")
    const valid = gen.name("valid")
    schema.forEach((sch: AnySchema, i: number) => {
        throw new Error("STUB");
    })
  },
}

export default def
