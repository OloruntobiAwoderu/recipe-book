const Users = require("../helpers/userModel");
const db = require("../data/dbConfig");

 describe("Users model", () => {
   beforeEach(async () => {
    await db("users").del();
  });

   it("should set environment to development", () => {
    // eslint-disable-next-line no-undef
     expect(process.env.DB_ENV).toBe("development");
   });

  describe("add User to database", () => {
    it("should increase database length by 1", async () => {
      const records = await db("users");
      expect(records).toHaveLength(0);

      await Users.insert({ name: "Oloruntobi", email: "ademola4@gmail.com", password: "florence" });

      const users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("should insert a specific user into database", async () => {
      const user = await Users.insert({ name: "Oloruntobi", email: "ademola1@gmail.com", password: "florence"  });
      expect(user.id).toBe(Number(user.id));
    });
  });

  describe("remove function", () => {
    it("should remove an inserted user", async () => {
      const records = await db("users").insert({ name: "Oloruntobi", email: "ademola@gmail.com", password: "florence"  }, "id");
      expect(records).toHaveLength(1);

      await Users.remove(1);

      const users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("should show number of users deleted", async () => {
      await Users.insert({ name: "Oloruntobi", email: "ademola2@gmail.com", password: "florence" });

      const deleted = await Users.remove(1);
      expect(deleted).toBe(0);
    });
  });
});
