import type Ajv from "../../core"
import type {SchemaObject} from "../../types"
import {jtdForms, JTDForm, SchemaObjectMap} from "./types"
import {SchemaEnv, getCompilingSchema} from ".."
import {_, str, and, getProperty, CodeGen, Code, Name} from "../codegen"
import MissingRefError from "../ref_error"
import N from "../names"
import {isOwnProperty} from "../../vocabularies/code"
import {hasRef} from "../../vocabularies/jtd/ref"
import {useFunc} from "../util"
import quote from "../../runtime/quote"

const genSerialize: {[F in JTDForm]: (cxt: SerializeCxt) => void} = {
  elements: serializeElements,
  values: serializeValues,
  discriminator: serializeDiscriminator,
  properties: serializeProperties,
  optionalProperties: serializeProperties,
  enum: serializeString,
  type: serializeType,
  ref: serializeRef,
}

interface SerializeCxt {
  readonly gen: CodeGen
  readonly self: Ajv // current Ajv instance
  readonly schemaEnv: SchemaEnv
  readonly definitions: SchemaObjectMap
  schema: SchemaObject
  data: Code
}

export default function compileSerializer(
  this: Ajv,
  sch: SchemaEnv,
  definitions: SchemaObjectMap
): SchemaEnv {
    throw new Error("STUB");
}

function serializeCode(cxt: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeNullable(cxt: SerializeCxt, serializeForm: (_cxt: SerializeCxt) => void): void {
    throw new Error("STUB");
}

function serializeElements(cxt: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeValues(cxt: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeKeyValue(cxt: SerializeCxt, key: Name, schema: SchemaObject, first?: Name): void {
    throw new Error("STUB");
}

function serializeDiscriminator(cxt: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeProperties(cxt: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeSchemaProperties(cxt: SerializeCxt, discriminator?: string): void {
    throw new Error("STUB");
}

function serializeType(cxt: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeString({gen, data}: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeNumber({gen, data, self}: SerializeCxt): void {
    throw new Error("STUB");
}

function serializeRef(cxt: SerializeCxt): void {
    throw new Error("STUB");
}

function getSerialize(gen: CodeGen, sch: SchemaEnv): Code {
    throw new Error("STUB");
}

function serializeEmpty({gen, data}: SerializeCxt): void {
    throw new Error("STUB");
}

function addComma({gen}: SerializeCxt, first?: Name): void {
    throw new Error("STUB");
}
