import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/todos",
        name: "todos",
        component: () => import("./components/TodosList")
    },
    {
        path: "/todos/:id",
        name: "todo-details",
        component: ()=> import("./components/TodoDetails")
    },
    {
        path: "/add",
        name: "add",
        component: ()=> import("./components/AddTodo")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;