import { createStore } from "vuex";
import { auth } from "./auth";
import { chat } from "./chat";

const store = createStore({
    modules: {
        auth,
        chat,
    },
});

export default store;
