
const initialState = { messages: [] }

export const chat = {
    namespaced: true,
    state: initialState,
    actions: {
        sendMessage ({ commit }, params) {
            console.log(params)
            var response;
            if (params.type) {
                response = {
                    status: 200,
                    data: {
                        message: params.message
                    }
                }

                if (response.status === 200) {
                    commit('sendMessage', params);
                }
            }
        },

    },
    mutations: {
        sendMessage (state, message) {
            state.messages.push(message);
        }
    }
};
