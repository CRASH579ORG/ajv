import type {CodeKeywordDefinition, ErrorObject, KeywordErrorDefinition} from "../../types"
import type {KeywordCxt} from "../../compile/validate"
import {checkDataTypes, getSchemaTypes, DataType} from "../../compile/validate/dataType"
import {_, str, Name} from "../../compile/codegen"
import {useFunc} from "../../compile/util"
import equal from "../../runtime/equal"

export type UniqueItemsError = ErrorObject<
  "uniqueItems",
  {i: number; j: number},
  boolean | {$data: string}
>

const error: KeywordErrorDefinition = {
  message: ({params: {i, j}}) =>
    { throw new Error("STUB"); },
  params: ({params: {i, j}}) => { throw new Error("STUB"); },
}

const def: CodeKeywordDefinition = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error,
  code(cxt: KeywordCxt) {
    const {gen, data, $data, schema, parentSchema, schemaCode, it} = cxt
    if (!$data && !schema) return
    const valid = gen.let("valid")
    const itemTypes = parentSchema.items ? getSchemaTypes(parentSchema.items) : []
    cxt.block$data(valid, validateUniqueItems, _`${schemaCode} === false`)
    cxt.ok(valid)

    function validateUniqueItems(): void {
        throw new Error("STUB");
    }

    function canOptimize(): boolean {
      return itemTypes.length > 0 && !itemTypes.some((t) => { throw new Error("STUB"); })
    }

    function loopN(i: Name, j: Name): void {
        throw new Error("STUB");
    }

    function loopN2(i: Name, j: Name): void {
        throw new Error("STUB");
    }
  },
}

export default def
