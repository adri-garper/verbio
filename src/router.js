import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Chat from "./components/Chat.vue";

const routes = [
    {
        path: "/",
        name: "chat",
        component: Chat,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;