import { Model } from "@vuex-orm/core";
import Post from "./PostModel";

class Comment extends Model {
  static entity = "comment";

  static primaryKey = ["postId", "id"];

  static fields() {
    return {
      postId: this.attr(null),
      id: this.attr(null),
      name: this.attr(null),
      email: this.attr(null),
      body: this.attr(null),
      post: this.belongsTo(Post, "postId", "id"),
      isEditing: this.attr(false),
    };
  }
}

export default Comment;
