<template>
    <div class="login-container">
        <div class="card card-container">
            <img
                class="profile-img"
                src="/img/verbio.png"
            />
            <div
                class="error-feedback"
                v-if="error"
            >Usuario y contraseña incorrectos</div>

            <div class="form-group">
                <label for="username">User</label>
                <input
                    name="username"
                    type="text"
                    class="form-control"
                    v-model="user"
                >
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    name="username"
                    type="password"
                    class="form-control"
                    v-model="password"
                >
            </div>

            <div
                class="form-group submit"
                @click="login()"
            >
                <button
                    class="btn btn-primary btn-block"
                    :disabled="loading"
                >
                    <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                    ></span>
                    <span>Login</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: "Login",
    components: {
    },
    data () {
        return {
            loading: false,
            error: false,
            user: '',
            password: ''
        };
    },
    computed: {
        loggedIn () {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created () {
        if (this.loggedIn) {
            this.$router.push("/chat");
        }
    },
    methods: {
        login () {
            this.error = false;

            if (this.user.trim() && this.password.trim()) {
                this.$store
                    .dispatch("auth/login", { user: this.user, password: this.password })
                    .then(response => {
                        console.log(response)
                        if (response.status === 200) {
                            this.$router.push("/chat");
                        } else {
                            this.error = true;
                        }
                    })
            }

        }
    },
};
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-image: url("/img/world.png");
    background-position: center center;
    background-size: 100%;

    label {
        display: block;
        margin-top: 10px;
    }

    .card-container.card {
        max-width: 350px !important;
        padding: 40px 40px;
    }

    .card {
        background-color: #f7f7f7;
        padding: 20px 25px 30px;
        margin: 0 auto 25px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .profile-img {
        margin-bottom: 30px;
    }

    .submit {
        margin-top: 30px;

        button {
            background-color: #0cddb8;
            border: 1px solid #057963;
            text-transform: uppercase;
            color: #333;
            font-weight: 700;
        }
    }

    .error-feedback {
        color: #ff1f58;
        text-align: center;
    }
}
</style>
