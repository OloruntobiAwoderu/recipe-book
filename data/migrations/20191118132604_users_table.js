exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users.string("name", 255).notNullable();

    users.string("password", 255).notNullable();
    users
      .string("email", 255)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
