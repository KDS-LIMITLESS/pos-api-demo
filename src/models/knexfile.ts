import type { Knex } from "knex";

// Update with your config settings.

module.exports  = {
  development: {
    client: "pg",
    connection: {
      host: '0.0.0.0', //docker host
      port: 15432,   // docker host port
      user: 'rms',
      password: "5E^&()VB78954!@PG"
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },
// 
  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }
// 
};

