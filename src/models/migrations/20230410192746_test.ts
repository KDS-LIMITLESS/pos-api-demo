import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', function(table){
		table.string('full_name', 256).notNullable();
		table.string('email', 256).notNullable().primary().unique();
		table.string('password', 256).notNullable();
		table.string('role', 20).notNullable();
		table.string('phone_number', 30);
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}
