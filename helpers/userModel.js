const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findBy,
  getUsersRecipes
};

function find() {
  return db("users").select("id", "name", "email");
}

function findById(id) {
  return db("users")
    .where({ id: Number(id) })
    .first()
    .select("id", "name", "email");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    
}
function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => this.findById(id))
    //.then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return db("users")
    .where("id", Number(id))
    .update(user, "id")
    .then(() => {
      return this.findById(id);
   });
}



function remove(id) {
  return db("users")
    .where("id", Number(id))
    .del();
}

function getUsersRecipes(projectId) {
  return db("recipes").where("user_id", projectId);
}
