import type {
  CodeKeywordDefinition,
  ErrorObject,
  KeywordErrorDefinition,
  AnySchema,
} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {_, Name} from "../../compile/codegen"
import {alwaysValidSchema} from "../../compile/util"
import {SchemaCxt} from "../../compile"

export type OneOfError = ErrorObject<
  "oneOf",
  {passingSchemas: [number, number] | null},
  AnySchema[]
>

const error: KeywordErrorDefinition = {
  message: "must match exactly one schema in oneOf",
  params: ({params}) => { throw new Error("STUB"); },
}

const def: CodeKeywordDefinition = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error,
  code(cxt: KeywordCxt) {
    const {gen, schema, parentSchema, it} = cxt
    /* istanbul ignore if */
    if (!Array.isArray(schema)) throw new Error("ajv implementation error")
    if (it.opts.discriminator && parentSchema.discriminator) return
    const schArr: AnySchema[] = schema
    const valid = gen.let("valid", false)
    const passing = gen.let("passing", null)
    const schValid = gen.name("_valid")
    cxt.setParams({passing})
    // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas

    gen.block(validateOneOf)

    cxt.result(
      valid,
      () => { throw new Error("STUB"); },
      () => { throw new Error("STUB"); }
    )

    function validateOneOf(): void {
        throw new Error("STUB");
    }
  },
}

export default def
