import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({

  // Tabla de clientes
  clientes: a
    .model({
      // Campos
      nombre: a.string().required(),
      nif: a.integer().required(),
      pais: a.string().required(),
      ciudad: a.string().required(),
      direccion: a.string().required(),
      telefonoPrincipal: a.integer().required(),
      telefonoAlterno: a.integer(),
      industria: a.string().required(),
      // Relaciones
      relacionPais: a.belongsTo('paises', 'pais'),
      relacionCiudad: a.belongsTo('ciudades', 'ciudad'),
      relacionIndustria: a.belongsTo('industrias', 'industria'),
    })
    .identifier(['nombre'])
    .authorization(
      allow => [allow.groups([
        "administrador",
        "comercial",
        "operaciones"
      ])]),

  // Tabla de ciudades
  ciudades: a
    .model({
      // Campos
      nombre: a.string().required(),
      pais: a.integer().required(),
      // Relaciones
      relacionCiudades: a.hasMany('clientes', 'ciudad'),
      relacionPais: a.belongsTo('paises', 'pais'),
    })
    .identifier(['nombre'])
    .authorization(
      allow => [allow.groups([
        "administrador",
      ])]),

  // Tabla de industrias
  industrias: a
    .model({
      // Campos
      nombre: a.string().required(),
      descripcion: a.string().required(),
      // Relaciones
      relacionCiudades: a.hasMany('clientes', 'industria'),
    })
    .identifier(['nombre'])
    .authorization(
      allow => [allow.groups([
        "administrador",
      ])]),    

  // Tabla de paises
  paises: a
    .model({
      // Campos
      nombre: a.string().required(),
      indicativo: a.integer().required(),
      // Relaciones
      relacionClientes: a.hasMany('clientes', 'pais'),
      relacionCiudades: a.hasMany('ciudades', 'ciudad'),
    })
    .identifier(['nombre'])
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

