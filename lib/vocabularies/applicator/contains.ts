import type {
  CodeKeywordDefinition,
  KeywordErrorDefinition,
  ErrorObject,
  AnySchema,
} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {_, str, Name} from "../../compile/codegen"
import {alwaysValidSchema, checkStrictMode, Type} from "../../compile/util"

export type ContainsError = ErrorObject<
  "contains",
  {minContains: number; maxContains?: number},
  AnySchema
>

const error: KeywordErrorDefinition = {
  message: ({params: {min, max}}) =>
    { throw new Error("STUB"); },
  params: ({params: {min, max}}) =>
    { throw new Error("STUB"); },
}

const def: CodeKeywordDefinition = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error,
  code(cxt: KeywordCxt) {
    const {gen, schema, parentSchema, data, it} = cxt
    let min: number
    let max: number | undefined
    const {minContains, maxContains} = parentSchema
    if (it.opts.next) {
      min = minContains === undefined ? 1 : minContains
      max = maxContains
    } else {
      min = 1
    }
    const len = gen.const("len", _`${data}.length`)
    cxt.setParams({min, max})
    if (max === undefined && min === 0) {
      checkStrictMode(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`)
      return
    }
    if (max !== undefined && min > max) {
      checkStrictMode(it, `"minContains" > "maxContains" is always invalid`)
      cxt.fail()
      return
    }
    if (alwaysValidSchema(it, schema)) {
      let cond = _`${len} >= ${min}`
      if (max !== undefined) cond = _`${cond} && ${len} <= ${max}`
      cxt.pass(cond)
      return
    }

    it.items = true
    const valid = gen.name("valid")
    if (max === undefined && min === 1) {
      validateItems(valid, () => { throw new Error("STUB"); })
    } else if (min === 0) {
      gen.let(valid, true)
      if (max !== undefined) gen.if(_`${data}.length > 0`, validateItemsWithCount)
    } else {
      gen.let(valid, false)
      validateItemsWithCount()
    }
    cxt.result(valid, () => { throw new Error("STUB"); })

    function validateItemsWithCount(): void {
      const schValid = gen.name("_valid")
      const count = gen.let("count", 0)
      validateItems(schValid, () => { throw new Error("STUB"); })
    }

    function validateItems(_valid: Name, block: () => void): void {
      gen.forRange("i", 0, len, (i) => {
          throw new Error("STUB");
      })
    }

    function checkLimits(count: Name): void {
      gen.code(_`${count}++`)
      if (max === undefined) {
        gen.if(_`${count} >= ${min}`, () => { throw new Error("STUB"); })
      } else {
        gen.if(_`${count} > ${max}`, () => { throw new Error("STUB"); })
        if (min === 1) gen.assign(valid, true)
        else gen.if(_`${count} >= ${min}`, () => { throw new Error("STUB"); })
      }
    }
  },
}

export default def
