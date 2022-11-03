import { createRouter, createWebHistory } from "vue-router";

import PostDetailPage from "./views/PostDetailPage.vue";
import UserListPage from "./views/UserListPage.vue";
import UserListFilteredPage from "./views/UserListFilteredPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "UserList",
      component: UserListPage,
    },
    {
      path: "/user/:userId",
      name: "UserListFiltered",
      component: UserListFilteredPage,
    },
    {
      path: "/post/:userId/:id",
      name: "PostDetailPage",
      component: PostDetailPage,
      props: true,
    },
  ],
});
