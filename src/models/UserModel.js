import { Model } from "@vuex-orm/core";

class User extends Model {
  static entity = "user";

  // static primaryKey = "user";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      username: this.attr(null),
      email: this.attr(null),
      address: this.attr(null),
      phone: this.attr(null),
      website: this.attr(null),
      company: this.attr(null),
    };
  }
}

export default User;
