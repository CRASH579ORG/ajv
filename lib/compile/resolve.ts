import type {AnySchema, AnySchemaObject, UriResolver} from "../types"
import type Ajv from "../ajv"
import type {URIComponent} from "fast-uri"
import {eachItem} from "./util"
import * as equal from "fast-deep-equal"
import * as traverse from "json-schema-traverse"

// the hash of local references inside the schema (created by getSchemaRefs), used for inline resolution
export type LocalRefs = {[Ref in string]?: AnySchemaObject}

// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const",
])

export function inlineRef(schema: AnySchema, limit: boolean | number = true): boolean {
    throw new Error("STUB");
}

const REF_KEYWORDS = new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor",
])

function hasRef(schema: AnySchemaObject): boolean {
  for (const key in schema) {
    if (REF_KEYWORDS.has(key)) return true
    const sch = schema[key]
    if (Array.isArray(sch) && sch.some(hasRef)) return true
    if (typeof sch == "object" && hasRef(sch)) return true
  }
  return false
}

function countKeys(schema: AnySchemaObject): number {
    throw new Error("STUB");
}

export function getFullPath(resolver: UriResolver, id = "", normalize?: boolean): string {
    throw new Error("STUB");
}

export function _getFullPath(resolver: UriResolver, p: URIComponent): string {
    throw new Error("STUB");
}

const TRAILING_SLASH_HASH = /#\/?$/
export function normalizeId(id: string | undefined): string {
  return id ? id.replace(TRAILING_SLASH_HASH, "") : ""
}

export function resolveUrl(resolver: UriResolver, baseId: string, id: string): string {
  id = normalizeId(id)
  return resolver.resolve(baseId, id)
}

const ANCHOR = /^[a-z_][-a-z0-9._]*$/i

export function getSchemaRefs(this: Ajv, schema: AnySchema, baseId: string): LocalRefs {
    throw new Error("STUB");
}
