import type {AnySchema, EvaluatedProperties, EvaluatedItems} from "../types"
import type {SchemaCxt, SchemaObjCxt} from "."
import {_, getProperty, Code, Name, CodeGen} from "./codegen"
import {_Code} from "./codegen/code"
import type {Rule, ValidationRules} from "./rules"

// TODO refactor to use Set
export function toHash<T extends string = string>(arr: T[]): {[K in T]?: true} {
  const hash: {[K in T]?: true} = {}
  for (const item of arr) hash[item] = true
  return hash
}

export function alwaysValidSchema(it: SchemaCxt, schema: AnySchema): boolean | void {
  if (typeof schema == "boolean") return schema
  if (Object.keys(schema).length === 0) return true
  checkUnknownRules(it, schema)
  return !schemaHasRules(schema, it.self.RULES.all)
}

export function checkUnknownRules(it: SchemaCxt, schema: AnySchema = it.schema): void {
  const {opts, self} = it
  if (!opts.strictSchema) return
  if (typeof schema === "boolean") return
  const rules = self.RULES.keywords
  for (const key in schema) {
    if (!rules[key]) checkStrictMode(it, `unknown keyword: "${key}"`)
  }
}

export function schemaHasRules(
  schema: AnySchema,
  rules: {[Key in string]?: boolean | Rule}
): boolean {
  if (typeof schema == "boolean") return !schema
  for (const key in schema) if (rules[key]) return true
  return false
}

export function schemaHasRulesButRef(schema: AnySchema, RULES: ValidationRules): boolean {
  if (typeof schema == "boolean") return !schema
  for (const key in schema) if (key !== "$ref" && RULES.all[key]) return true
  return false
}

export function schemaRefOrVal(
  {topSchemaRef, schemaPath}: SchemaObjCxt,
  schema: unknown,
  keyword: string,
  $data?: string | false
): Code | number | boolean {
  if (!$data) {
    if (typeof schema == "number" || typeof schema == "boolean") return schema
    if (typeof schema == "string") return _`${schema}`
  }
  return _`${topSchemaRef}${schemaPath}${getProperty(keyword)}`
}

export function unescapeFragment(str: string): string {
    throw new Error("STUB");
}

export function escapeFragment(str: string | number): string {
  return encodeURIComponent(escapeJsonPointer(str))
}

export function escapeJsonPointer(str: string | number): string {
  if (typeof str == "number") return `${str}`
  return str.replace(/~/g, "~0").replace(/\//g, "~1")
}

export function unescapeJsonPointer(str: string): string {
    throw new Error("STUB");
}

export function eachItem<T>(xs: T | T[], f: (x: T) => void): void {
    throw new Error("STUB");
}

type SomeEvaluated = EvaluatedProperties | EvaluatedItems

type MergeEvaluatedFunc<T extends SomeEvaluated> = (
  gen: CodeGen,
  from: Name | T,
  to: Name | Exclude<T, true> | undefined,
  toName?: typeof Name
) => Name | T

interface MakeMergeFuncArgs<T extends SomeEvaluated> {
  mergeNames: (gen: CodeGen, from: Name, to: Name) => void
  mergeToName: (gen: CodeGen, from: T, to: Name) => void
  mergeValues: (from: T, to: Exclude<T, true>) => T
  resultToName: (gen: CodeGen, res?: T) => Name
}

function makeMergeEvaluated<T extends SomeEvaluated>({
  mergeNames,
  mergeToName,
  mergeValues,
  resultToName,
}: MakeMergeFuncArgs<T>): MergeEvaluatedFunc<T> {
  return (gen, from, to, toName) => {
      throw new Error("STUB");
  }
}

interface MergeEvaluated {
  props: MergeEvaluatedFunc<EvaluatedProperties>
  items: MergeEvaluatedFunc<EvaluatedItems>
}

export const mergeEvaluated: MergeEvaluated = {
  props: makeMergeEvaluated({
    mergeNames: (gen, from, to) =>
      { throw new Error("STUB"); },
    mergeToName: (gen, from, to) =>
      { throw new Error("STUB"); },
    mergeValues: (from, to) => { throw new Error("STUB"); },
    resultToName: evaluatedPropsToName,
  }),
  items: makeMergeEvaluated({
    mergeNames: (gen, from, to) =>
      { throw new Error("STUB"); },
    mergeToName: (gen, from, to) =>
      { throw new Error("STUB"); },
    mergeValues: (from, to) => { throw new Error("STUB"); },
    resultToName: (gen, items) => { throw new Error("STUB"); },
  }),
}

export function evaluatedPropsToName(gen: CodeGen, ps?: EvaluatedProperties): Name {
  if (ps === true) return gen.var("props", true)
  const props = gen.var("props", _`{}`)
  if (ps !== undefined) setEvaluated(gen, props, ps)
  return props
}

export function setEvaluated(gen: CodeGen, props: Name, ps: {[K in string]?: true}): void {
  Object.keys(ps).forEach((p) => { throw new Error("STUB"); })
}

const snippets: {[S in string]?: _Code} = {}

export function useFunc(gen: CodeGen, f: {code: string}): Name {
  return gen.scopeValue("func", {
    ref: f,
    code: snippets[f.code] || (snippets[f.code] = new _Code(f.code)),
  })
}

export enum Type {
  Num,
  Str,
}

export function getErrorPath(
  dataProp: Name | string | number,
  dataPropType?: Type,
  jsPropertySyntax?: boolean
): Code | string {
  // let path
  if (dataProp instanceof Name) {
    const isNumber = dataPropType === Type.Num
    return jsPropertySyntax
      ? isNumber
        ? _`"[" + ${dataProp} + "]"`
        : _`"['" + ${dataProp} + "']"`
      : isNumber
      ? _`"/" + ${dataProp}`
      : _`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")` // TODO maybe use global escapePointer
  }
  return jsPropertySyntax ? getProperty(dataProp).toString() : "/" + escapeJsonPointer(dataProp)
}

export function checkStrictMode(
  it: SchemaCxt,
  msg: string,
  mode: boolean | "log" = it.opts.strictSchema
): void {
  if (!mode) return
  msg = `strict mode: ${msg}`
  if (mode === true) throw new Error(msg)
  it.self.logger.warn(msg)
}
