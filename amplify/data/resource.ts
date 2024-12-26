import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({

  // Tabla de clientes
  clientes: a
    .model({
      // Campos
      nif: a.integer().required(),
      razonSocial: a.string().required(),
      paisId: a.string().required(),
      ciudadId: a.string().required(),
      direccion: a.string().required(),
      telefonoPrincipal: a.integer().required(),
      telefonoAlterno: a.integer().required(),
      // Relaciones
      pais: a.belongsTo('paises', 'paisId'),
    })
    .authorization(
      allow => [allow.groups([
        "administrador",
        "comercial",
        "operaciones"
      ])]),

  // Tabla de paises
  paises: a
      .model({
        // Campos
        nombre: a.string().required(),
        indicativo: a.integer().required(),
        // Relaciones
        clientes: a.hasMany('clientes', 'paisId'),
      })
      .authorization(
        allow => [allow.groups([
          "administrador",
          "comercial",
          "operaciones"
        ])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

