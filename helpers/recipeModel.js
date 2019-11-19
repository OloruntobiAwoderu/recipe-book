const db = require("../data/dbConfig");



function find() {
  return db("recipes");
}

module.exports = {
  get: function(id) {
    return db("recipes")
      .where("id", id)
      .first();
  },

  insert: function(action) {
    return db("recipes")
      .insert(action, 'id')
      .then(([id]) => this.get(id));
  },
  update: function(id, changes) {
    return db("recipes")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db("recipes")
      .where("id", id)
      .del();
  },
  find
};
