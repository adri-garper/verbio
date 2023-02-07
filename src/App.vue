<template>
    <div id="app">
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
#app {
    .container {
        width: 100vw;
        height: 100vh;
        margin: 0 auto !important;
        max-width: unset;
        min-width: none;
        min-height: none;
        padding: 0;
    }
}
</style>
