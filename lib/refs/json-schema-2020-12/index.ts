import type Ajv from "../../core"
import type {AnySchemaObject} from "../../types"
import * as metaSchema from "./schema.json"
import * as applicator from "./meta/applicator.json"
import * as unevaluated from "./meta/unevaluated.json"
import * as content from "./meta/content.json"
import * as core from "./meta/core.json"
import * as format from "./meta/format-annotation.json"
import * as metadata from "./meta/meta-data.json"
import * as validation from "./meta/validation.json"

const META_SUPPORT_DATA = ["/properties"]

export default function addMetaSchema2020(this: Ajv, $data?: boolean): Ajv {
    throw new Error("STUB");
}
