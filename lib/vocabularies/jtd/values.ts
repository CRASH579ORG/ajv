import type {CodeKeywordDefinition, SchemaObject} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {alwaysValidSchema, Type} from "../../compile/util"
import {not, or, Name} from "../../compile/codegen"
import {checkMetadata} from "./metadata"
import {checkNullableObject} from "./nullable"
import {typeError, _JTDTypeError} from "./error"

export type JTDValuesError = _JTDTypeError<"values", "object", SchemaObject>

const def: CodeKeywordDefinition = {
  keyword: "values",
  schemaType: "object",
  error: typeError("object"),
  code(cxt: KeywordCxt) {
    checkMetadata(cxt)
    const {gen, data, schema, it} = cxt
    const [valid, cond] = checkNullableObject(cxt, data)
    if (alwaysValidSchema(it, schema)) {
      gen.if(not(or(cond, valid)), () => { throw new Error("STUB"); })
    } else {
      gen.if(cond)
      gen.assign(valid, validateMap())
      gen.elseIf(not(valid))
      cxt.error()
      gen.endIf()
    }
    cxt.ok(valid)

    function validateMap(): Name | boolean {
      const _valid = gen.name("valid")
      if (it.allErrors) {
        const validMap = gen.let("valid", true)
        validateValues(() => { throw new Error("STUB"); })
        return validMap
      }
      gen.var(_valid, true)
      validateValues(() => { throw new Error("STUB"); })
      return _valid

      function validateValues(notValid: () => void): void {
        gen.forIn("key", data, (key) => {
            throw new Error("STUB");
        })
      }
    }
  },
}

export default def
