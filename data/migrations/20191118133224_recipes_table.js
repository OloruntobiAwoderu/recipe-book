exports.up = function(knex) {
    return knex.schema.createTable("recipes", function(table) {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
   
      table.string("title", 255).notNullable();
      table.string("source", 255).notNullable();
      table.text("ingredients").notNullable();
      table.text("instructions").notNullable();
      table.string("category", 255).notNullable();
      table.binary("image");
    });
  };
   
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("recipes");
  };
   