import type {ErrorNoParams, Vocabulary} from "../../types"
import additionalItems, {AdditionalItemsError} from "./additionalItems"
import prefixItems from "./prefixItems"
import items from "./items"
import items2020, {ItemsError} from "./items2020"
import contains, {ContainsError} from "./contains"
import dependencies, {DependenciesError} from "./dependencies"
import propertyNames, {PropertyNamesError} from "./propertyNames"
import additionalProperties, {AdditionalPropertiesError} from "./additionalProperties"
import properties from "./properties"
import patternProperties from "./patternProperties"
import notKeyword, {NotKeywordError} from "./not"
import anyOf, {AnyOfError} from "./anyOf"
import oneOf, {OneOfError} from "./oneOf"
import allOf from "./allOf"
import ifKeyword, {IfKeywordError} from "./if"
import thenElse from "./thenElse"

export default function getApplicator(draft2020 = false): Vocabulary {
    throw new Error("STUB");
}

export type ApplicatorKeywordError =
  | ErrorNoParams<"false schema">
  | AdditionalItemsError
  | ItemsError
  | ContainsError
  | AdditionalPropertiesError
  | DependenciesError
  | IfKeywordError
  | AnyOfError
  | OneOfError
  | NotKeywordError
  | PropertyNamesError
