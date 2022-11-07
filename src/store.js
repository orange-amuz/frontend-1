import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";

import User from "./models/UserModel";
import Comment from "./models/CommentModel";
import Post from "./models/PostModel";

const database = new VuexORM.Database();

database.register(User);
database.register(Post);
database.register(Comment);

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
});

export default store;
