import type Ajv from "../../core"
import type {SchemaObject} from "../../types"
import {jtdForms, JTDForm, SchemaObjectMap} from "./types"
import {SchemaEnv, getCompilingSchema} from ".."
import {_, str, and, or, nil, not, CodeGen, Code, Name, SafeExpr} from "../codegen"
import MissingRefError from "../ref_error"
import N from "../names"
import {hasPropFunc} from "../../vocabularies/code"
import {hasRef} from "../../vocabularies/jtd/ref"
import {intRange, IntType} from "../../vocabularies/jtd/type"
import {parseJson, parseJsonNumber, parseJsonString} from "../../runtime/parseJson"
import {useFunc} from "../util"
import validTimestamp from "../../runtime/timestamp"

type GenParse = (cxt: ParseCxt) => void

const genParse: {[F in JTDForm]: GenParse} = {
  elements: parseElements,
  values: parseValues,
  discriminator: parseDiscriminator,
  properties: parseProperties,
  optionalProperties: parseProperties,
  enum: parseEnum,
  type: parseType,
  ref: parseRef,
}

interface ParseCxt {
  readonly gen: CodeGen
  readonly self: Ajv // current Ajv instance
  readonly schemaEnv: SchemaEnv
  readonly definitions: SchemaObjectMap
  schema: SchemaObject
  data: Code
  parseName: Name
  char: Name
}

export default function compileParser(
  this: Ajv,
  sch: SchemaEnv,
  definitions: SchemaObjectMap
): SchemaEnv {
    throw new Error("STUB");
}

const undef = _`undefined`

function parserFunction(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseCode(cxt: ParseCxt): void {
    throw new Error("STUB");
}

const parseBoolean = parseBooleanToken(true, parseBooleanToken(false, jsonSyntaxError))

function parseNullable(cxt: ParseCxt, parseForm: GenParse): void {
    throw new Error("STUB");
}

function parseElements(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseValues(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseItems(cxt: ParseCxt, endToken: string, block: () => void): void {
    throw new Error("STUB");
}

function tryParseItems(cxt: ParseCxt, endToken: string, block: () => void): void {
    throw new Error("STUB");
}

function parseKeyValue(cxt: ParseCxt, schema: SchemaObject): void {
    throw new Error("STUB");
}

function parseDiscriminator(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseProperties(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseSchemaProperties(cxt: ParseCxt, discriminator?: string): void {
    throw new Error("STUB");
}

function parseDefinedProperty(cxt: ParseCxt, key: Name, schemas: SchemaObjectMap = {}): void {
    throw new Error("STUB");
}

function parsePropertyValue(cxt: ParseCxt, key: Name, schema: SchemaObject): void {
    throw new Error("STUB");
}

function parseType(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseString(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseEnum(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseNumber(cxt: ParseCxt, maxDigits?: number): void {
    throw new Error("STUB");
}

function parseBooleanToken(bool: boolean, fail: GenParse): GenParse {
  return (cxt) => {
      throw new Error("STUB");
  }
}

function parseRef(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function getParser(gen: CodeGen, sch: SchemaEnv): Code {
    throw new Error("STUB");
}

function parseEmpty(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parseWith(cxt: ParseCxt, parseFunc: {code: string}, args?: SafeExpr): void {
    throw new Error("STUB");
}

function partialParse(cxt: ParseCxt, parseFunc: Name, args?: SafeExpr): void {
    throw new Error("STUB");
}

function parseToken(cxt: ParseCxt, tok: string): void {
    throw new Error("STUB");
}

function tryParseToken(cxt: ParseCxt, tok: string, fail: GenParse, success?: GenParse): void {
  const {gen} = cxt
  const n = tok.length
  skipWhitespace(cxt)
  gen.if(
    _`${jsonSlice(n)} === ${tok}`,
    () => {
        throw new Error("STUB");
    },
    () => { throw new Error("STUB"); }
  )
}

function skipWhitespace({gen, char: c}: ParseCxt): void {
  gen.code(
    _`while((${c}=${N.json}[${N.jsonPos}],${c}===" "||${c}==="\\n"||${c}==="\\r"||${c}==="\\t"))${N.jsonPos}++;`
  )
}

function jsonSlice(len: number | Name): Code {
  return len === 1
    ? _`${N.json}[${N.jsonPos}]`
    : _`${N.json}.slice(${N.jsonPos}, ${N.jsonPos}+${len})`
}

function jsonSyntaxError(cxt: ParseCxt): void {
    throw new Error("STUB");
}

function parsingError({gen, parseName}: ParseCxt, msg: Code): void {
    throw new Error("STUB");
}
