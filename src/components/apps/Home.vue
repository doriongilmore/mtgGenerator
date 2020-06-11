<template>
    <div id="home">
        <i>Mis à jour le <b>22/05/2020</b><br/></i>
        <details>
            <summary>TOTO</summary>
            <b>Hello world</b>
        </details>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
            };
        },
        created() {
        },
        methods: {
        }
    }
</script>

<style lang="less" scoped>
    #home {
        details {
            margin-top: 10px;
        }
    }
</style>
