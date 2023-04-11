import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("test", function(table){
        table.increments('id')
        table.string('first_name', 60).notNullable();
        table.integer('price', 5).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("test")
}

exports.config ={transaction: true}