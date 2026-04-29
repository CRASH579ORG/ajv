import type {CodeKeywordDefinition, ErrorObject, KeywordErrorDefinition} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {
  checkReportMissingProp,
  checkMissingProp,
  reportMissingProp,
  propertyInData,
  noPropertyInData,
} from "../code"
import {_, str, nil, not, Name, Code} from "../../compile/codegen"
import {checkStrictMode} from "../../compile/util"

export type RequiredError = ErrorObject<
  "required",
  {missingProperty: string},
  string[] | {$data: string}
>

const error: KeywordErrorDefinition = {
  message: ({params: {missingProperty}}) => { throw new Error("STUB"); },
  params: ({params: {missingProperty}}) => { throw new Error("STUB"); },
}

const def: CodeKeywordDefinition = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error,
  code(cxt: KeywordCxt) {
    const {gen, schema, schemaCode, data, $data, it} = cxt
    const {opts} = it
    if (!$data && schema.length === 0) return
    const useLoop = schema.length >= opts.loopRequired
    if (it.allErrors) allErrorsMode()
    else exitOnErrorMode()

    if (opts.strictRequired) {
      const props = cxt.parentSchema.properties
      const {definedProperties} = cxt.it
      for (const requiredKey of schema) {
        if (props?.[requiredKey] === undefined && !definedProperties.has(requiredKey)) {
          const schemaPath = it.schemaEnv.baseId + it.errSchemaPath
          const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`
          checkStrictMode(it, msg, it.opts.strictRequired)
        }
      }
    }

    function allErrorsMode(): void {
      if (useLoop || $data) {
        cxt.block$data(nil, loopAllRequired)
      } else {
        for (const prop of schema) {
          checkReportMissingProp(cxt, prop)
        }
      }
    }

    function exitOnErrorMode(): void {
      const missing = gen.let("missing")
      if (useLoop || $data) {
        const valid = gen.let("valid", true)
        cxt.block$data(valid, () => { throw new Error("STUB"); })
        cxt.ok(valid)
      } else {
        gen.if(checkMissingProp(cxt, schema, missing))
        reportMissingProp(cxt, missing)
        gen.else()
      }
    }

    function loopAllRequired(): void {
        throw new Error("STUB");
    }

    function loopUntilMissing(missing: Name, valid: Name): void {
      cxt.setParams({missingProperty: missing})
      gen.forOf(
        missing,
        schemaCode as Code,
        () => {
            throw new Error("STUB");
        },
        nil
      )
    }
  },
}

export default def
