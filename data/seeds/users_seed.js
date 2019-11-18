const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "Oloruntobi",
          email: "tobi55@gmail.com",
          password: bcrypt.hashSync("1234", 11)
        },
        {
          id: 2,
          name: "awoderu",
          email: "tobi51@gmail.com",
          password: bcrypt.hashSync("1234", 11)
        },
        {
          id: 3,
          name: "messi",
          email: "tobi52@gmail.com",
          password: bcrypt.hashSync("1234", 11)
        },
        {
          id: 4,
          name: "ronaldo",
          email: "awoderu@5.com",
          password: bcrypt.hashSync("1234", 11)
        },
       
      ]);
    });
};
