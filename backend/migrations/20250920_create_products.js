exports.up = function(knex) {
  return knex.schema.createTable('productos', function(table) {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.decimal('precio', 12, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('productos');
};
