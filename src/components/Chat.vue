<template>

    <div class="chat-container">
        <div class="chat">
            <div class="contact bar">
                <div class="pic stark"></div>
                <div class="name">
                    Verbio Bot
                </div>
                <div class="active">
                    Today at {{currentDate}}
                </div>
                <div
                    class="logout"
                    @click="logout"
                ></div>
            </div>
            <div
                class="messages"
                id="chat"
            >
                <template
                    v-for=" (message, index) in messages"
                    :key="index"
                >
                    <div
                        class="message"
                        :class="!message.user ? 'bot' : 'user'"
                    >
                        <template v-if="message.type == 'image'">
                            <img
                                class="message-text"
                                :src="'/img/'+message.url"
                            />
                        </template>
                        <template v-else>
                            <p class="message-text">{{ message.text }}</p>
                        </template>
                    </div>
                </template>
            </div>
            <div class="input">
                <div
                    class="image"
                    @click="sendImage"
                ></div><input
                    v-model="messageText"
                    placeholder="Type your message"
                    type="text"
                    @keyup.enter="sendMessage"
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentDate: this.getCurrentTime(),
            messageText: '',
        };
    },
    computed: {
        user () {
            return this.$store.state.auth.user;
        },

        messages () {
            return this.$store.state.chat.messages;
        },
    },
    mounted () {
        var self = this

        if (!this.user) {
            this.$router.push('/login');
        }

        setTimeout(function () {
            self.$store.dispatch('chat/sendMessage', { type: "text", user: false, text: "Hi! Welcome to Verbio BOT. How can I help you?" });
        }, 3000);
    },
    methods: {
        getCurrentTime () {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours}:${minutes}`;
        },

        sendMessage () {
            var self = this
            var text = this.messageText.toLowerCase().trim();
            if (this.messageText) {
                this.$store.dispatch('chat/sendMessage', { type: "text", user: true, text: this.messageText }).then(() => {
                    setTimeout(function () {
                        if (text == 'image') {
                            self.sendImage();
                        } else {
                            self.$store.dispatch('chat/sendMessage', { type: "text", user: false, text: "I'm thinking how can I help you, please give more information" });
                        }
                    }, 3000);
                });
                self.messageText = '';
            }
        },

        sendImage () {
            this.$store.dispatch('chat/sendMessage', { type: "image", user: false, url: "heart.svg" });
        },

        logout () {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    },
};
</script>

<style lang="scss">
$primary: #ff1f58;
$secondary: #0cddb8;
$primary-t40: #f15079;
$background: #f7f7f7;

.chat-container {
    margin: 0 auto;
    width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.chat {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80vw;
    height: 80vh;
    z-index: 2;
    box-sizing: border-box;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 0 8rem 0 rgba(black, 0.1),
        0rem 2rem 4rem -3rem rgba(black, 0.5);

    @media screen and (max-width: 768px) {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
    }

    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: $primary-t40;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }

    .contact.bar {
        margin: 1rem;
        box-sizing: border-box;
        height: 60px;
        color: $primary;
        position: relative;

        .name {
            font-weight: 700;
            font-size: 20px;
        }

        .logout {
            position: absolute;
            right: 10px;
            top: calc(50% - 15px);
            height: 30px;
            width: 30px;
            background-size: 100%;
            background-position: center center;
            background-image: url("/img/logout.svg");
            cursor: pointer;
        }
    }

    .messages {
        padding: 1rem;
        background: $background;
        overflow-y: auto;
        height: calc(100% - (40px * 2));
        box-shadow: inset 0 2rem 2rem -2rem rgba(black, 0.05),
            inset 0 -2rem 2rem -2rem rgba(black, 0.05);

        .message {
            box-sizing: border-box;
            padding: 0.5rem 1rem;
            margin: 1rem;
            background: #fff;
            border-radius: 1.125rem 1.125rem 1.125rem 0;
            min-height: 2.25rem;
            width: fit-content;
            max-width: 66%;
            box-shadow: 0 0 2rem rgba(black, 0.075),
                0rem 1rem 1rem -1rem rgba(black, 0.1);

            &.user {
                margin: 1rem 1rem 1rem auto;
                border-radius: 1.125rem 1.125rem 0 1.125rem;
                background: $secondary;
                color: white;
            }
        }
    }

    .input {
        box-sizing: border-box;
        flex-basis: 4rem;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        padding: 0 0.5rem 0 1.5rem;

        .image {
            height: 30px;
            width: 30px;
            background-size: 100%;
            background-position: center center;
            background-image: url("/img/image.svg");
            cursor: pointer;
            margin-right: 15px;
            background-repeat: no-repeat;
        }

        input {
            border: none;
            background-image: none;
            background-color: white;
            padding: 0.5rem 1rem;
            margin-right: 1rem;
            border-radius: 1.125rem;
            flex-grow: 2;
            box-shadow: 0 0 1rem rgba(black, 0.1),
                0rem 1rem 1rem -1rem rgba(black, 0.2);

            font-family: Red hat Display, sans-serif;
            font-weight: 400;
            letter-spacing: 0.025em;

            &::placeholder {
                color: #aaa;
            }
        }
    }
}
</style>
