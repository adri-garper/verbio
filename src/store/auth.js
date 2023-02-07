const user = localStorage.getItem('session');
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login ({ commit }, params) {
            var response;
            if (params.user === 'admin' && params.password === 'admin') {
                response = {
                    status: 200,
                    data: {
                        session_id: 'TOKEN'
                    }
                }
                localStorage.setItem('session', response.data.session_id);
                commit('loginSuccess', params.user);
                return response;

            } else {
                response = {
                    status: 401
                }
                return response;
            }
        },
        logout ({ commit }) {
            localStorage.removeItem('session');
            commit('logout');
        }
    },
    mutations: {
        loginSuccess (state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        logout (state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    }
};
