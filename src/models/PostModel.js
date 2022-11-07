import { Model } from "@vuex-orm/core";
import Comment from "./CommentModel";

class Post extends Model {
  static entity = "post";

  static fields() {
    return {
      userId: this.attr(null),
      id: this.attr(null),
      title: this.attr(null),
      completed: this.attr(null),
      comment: this.hasMany(Comment, "postId"),
    };
  }
}

export default Post;
