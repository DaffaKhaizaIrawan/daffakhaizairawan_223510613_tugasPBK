import { createRouter, createWebHistory } from "vue-router";

const Posts = () => import("../views/Posts.vue");

const routes = [
    { path: "/", component: Posts},
    { path: "/todos", component: () => import("../views/Todos.vue")}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;