import type {AnySchemaObject} from "../../types"
import type {SchemaObjCxt} from ".."
import type {JSONType, RuleGroup, Rule} from "../rules"

export function schemaHasRulesForType(
  {schema, self}: SchemaObjCxt,
  type: JSONType
): boolean | undefined {
  const group = self.RULES.types[type]
  return group && group !== true && shouldUseGroup(schema, group)
}

export function shouldUseGroup(schema: AnySchemaObject, group: RuleGroup): boolean {
  return group.rules.some((rule) => { throw new Error("STUB"); })
}

export function shouldUseRule(schema: AnySchemaObject, rule: Rule): boolean | undefined {
  return (
    schema[rule.keyword] !== undefined ||
    rule.definition.implements?.some((kwd) => { throw new Error("STUB"); })
  )
}
