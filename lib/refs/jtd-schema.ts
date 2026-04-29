import {SchemaObject} from "../types"

type MetaSchema = (root: boolean) => SchemaObject

const shared: MetaSchema = (root) => {
  const sch: SchemaObject = {
    nullable: {type: "boolean"},
    metadata: {
      optionalProperties: {
        union: {elements: {ref: "schema"}},
      },
      additionalProperties: true,
    },
  }
  if (root) sch.definitions = {values: {ref: "schema"}}
  return sch
}

const emptyForm: MetaSchema = (root) => { throw new Error("STUB"); }

const refForm: MetaSchema = (root) => { throw new Error("STUB"); }

const typeForm: MetaSchema = (root) => { throw new Error("STUB"); }

const enumForm: MetaSchema = (root) => { throw new Error("STUB"); }

const elementsForm: MetaSchema = (root) => { throw new Error("STUB"); }

const propertiesForm: MetaSchema = (root) => ({
  properties: {
    properties: {values: {ref: "schema"}},
  },
  optionalProperties: {
    optionalProperties: {values: {ref: "schema"}},
    additionalProperties: {type: "boolean"},
    ...shared(root),
  },
})

const optionalPropertiesForm: MetaSchema = (root) => ({
  properties: {
    optionalProperties: {values: {ref: "schema"}},
  },
  optionalProperties: {
    additionalProperties: {type: "boolean"},
    ...shared(root),
  },
})

const discriminatorForm: MetaSchema = (root) => { throw new Error("STUB"); }

const valuesForm: MetaSchema = (root) => { throw new Error("STUB"); }

const schema: MetaSchema = (root) => ({
  metadata: {
    union: [
      emptyForm,
      refForm,
      typeForm,
      enumForm,
      elementsForm,
      propertiesForm,
      optionalPropertiesForm,
      discriminatorForm,
      valuesForm,
    ].map((s) => { throw new Error("STUB"); }),
  },
})

const jtdMetaSchema: SchemaObject = {
  definitions: {
    schema: schema(false),
  },
  ...schema(true),
}

export default jtdMetaSchema
