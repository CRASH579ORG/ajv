import type {
  AnySchema,
  AnySchemaObject,
  AnyValidateFunction,
  AsyncValidateFunction,
  EvaluatedProperties,
  EvaluatedItems,
} from "../types"
import type Ajv from "../core"
import type {InstanceOptions} from "../core"
import {CodeGen, _, nil, stringify, Name, Code, ValueScopeName} from "./codegen"
import ValidationError from "../runtime/validation_error"
import N from "./names"
import {LocalRefs, getFullPath, _getFullPath, inlineRef, normalizeId, resolveUrl} from "./resolve"
import {schemaHasRulesButRef, unescapeFragment} from "./util"
import {validateFunctionCode} from "./validate"
import {URIComponent} from "fast-uri"
import {JSONType} from "./rules"

export type SchemaRefs = {
  [Ref in string]?: SchemaEnv | AnySchema
}

export interface SchemaCxt {
  readonly gen: CodeGen
  readonly allErrors?: boolean // validation mode - whether to collect all errors or break on error
  readonly data: Name // Name with reference to the current part of data instance
  readonly parentData: Name // should be used in keywords modifying data
  readonly parentDataProperty: Code | number // should be used in keywords modifying data
  readonly dataNames: Name[]
  readonly dataPathArr: (Code | number)[]
  readonly dataLevel: number // the level of the currently validated data,
  // it can be used to access both the property names and the data on all levels from the top.
  dataTypes: JSONType[] // data types applied to the current part of data instance
  definedProperties: Set<string> // set of properties to keep track of for required checks
  readonly topSchemaRef: Code
  readonly validateName: Name
  evaluated?: Name
  readonly ValidationError?: Name
  readonly schema: AnySchema // current schema object - equal to parentSchema passed via KeywordCxt
  readonly schemaEnv: SchemaEnv
  readonly rootId: string
  baseId: string // the current schema base URI that should be used as the base for resolving URIs in references (\$ref)
  readonly schemaPath: Code // the run-time expression that evaluates to the property name of the current schema
  readonly errSchemaPath: string // this is actual string, should not be changed to Code
  readonly errorPath: Code
  readonly propertyName?: Name
  readonly compositeRule?: boolean // true indicates that the current schema is inside the compound keyword,
  // where failing some rule doesn't mean validation failure (`anyOf`, `oneOf`, `not`, `if`).
  // This flag is used to determine whether you can return validation result immediately after any error in case the option `allErrors` is not `true.
  // You only need to use it if you have many steps in your keywords and potentially can define multiple errors.
  props?: EvaluatedProperties | Name // properties evaluated by this schema - used by parent schema or assigned to validation function
  items?: EvaluatedItems | Name // last item evaluated by this schema - used by parent schema or assigned to validation function
  jtdDiscriminator?: string
  jtdMetadata?: boolean
  readonly createErrors?: boolean
  readonly opts: InstanceOptions // Ajv instance option.
  readonly self: Ajv // current Ajv instance
}

export interface SchemaObjCxt extends SchemaCxt {
  readonly schema: AnySchemaObject
}
interface SchemaEnvArgs {
  readonly schema: AnySchema
  readonly schemaId?: "$id" | "id"
  readonly root?: SchemaEnv
  readonly baseId?: string
  readonly schemaPath?: string
  readonly localRefs?: LocalRefs
  readonly meta?: boolean
}

export class SchemaEnv implements SchemaEnvArgs {
  readonly schema: AnySchema
  readonly schemaId?: "$id" | "id"
  readonly root: SchemaEnv
  baseId: string // TODO possibly, it should be readonly
  schemaPath?: string
  localRefs?: LocalRefs
  readonly meta?: boolean
  readonly $async?: boolean // true if the current schema is asynchronous.
  readonly refs: SchemaRefs = {}
  readonly dynamicAnchors: {[Ref in string]?: true} = {}
  validate?: AnyValidateFunction
  validateName?: ValueScopeName
  serialize?: (data: unknown) => string
  serializeName?: ValueScopeName
  parse?: (data: string) => unknown
  parseName?: ValueScopeName

  constructor(env: SchemaEnvArgs) {
      throw new Error("STUB");
  }
}

// let codeSize = 0
// let nodeCount = 0

// Compiles schema in SchemaEnv
export function compileSchema(this: Ajv, sch: SchemaEnv): SchemaEnv {
    throw new Error("STUB");
}

export function resolveRef(
  this: Ajv,
  root: SchemaEnv,
  baseId: string,
  ref: string
): AnySchema | SchemaEnv | undefined {
    throw new Error("STUB");
}

function inlineOrCompile(this: Ajv, sch: SchemaEnv): AnySchema | SchemaEnv {
    throw new Error("STUB");
}

// Index of schema compilation in the currently compiled list
export function getCompilingSchema(this: Ajv, schEnv: SchemaEnv): SchemaEnv | void {
    throw new Error("STUB");
}

function sameSchemaEnv(s1: SchemaEnv, s2: SchemaEnv): boolean {
    throw new Error("STUB");
}

// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(
  this: Ajv,
  root: SchemaEnv, // information about the root schema for the current schema
  ref: string // reference to resolve
): SchemaEnv | undefined {
  let sch
  while (typeof (sch = this.refs[ref]) == "string") ref = sch
  return sch || this.schemas[ref] || resolveSchema.call(this, root, ref)
}

// Resolve schema, its root and baseId
export function resolveSchema(
  this: Ajv,
  root: SchemaEnv, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
  ref: string // reference to resolve
): SchemaEnv | undefined {
    throw new Error("STUB");
}

const PREVENT_SCOPE_CHANGE = new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions",
])

function getJsonPointer(
  this: Ajv,
  parsedRef: URIComponent,
  {baseId, schema, root}: SchemaEnv
): SchemaEnv | undefined {
    throw new Error("STUB");
}
