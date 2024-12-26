import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({

  // Tabla de clientes
  clientes: a
    .model({
      // Campos
      nombre: a.string().required(),
      nif: a.integer().required(),
      paisNombre: a.string().required(),
      ciudadNombre: a.string().required(),
      direccion: a.string().required(),
      telefonoPrincipal: a.integer().required(),
      telefonoAlterno: a.integer(),
      // Relaciones
      relacionPais: a.belongsTo('paises', 'paisNombre'),
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
      clientes: a.hasMany('clientes', 'paisNombre'),
    })
    .authorization(
      allow => [allow.groups([
        "administrador",
      ])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

