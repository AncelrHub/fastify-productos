exports.up = function (knex) {
  return knex.schema.createTable("productos", (table) => {
    table.increments("id").primary();
    table.string("nombre").notNullable();
    table.decimal("precio", 10, 2).notNullable();
    table.integer("stock").defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("productos");
};

