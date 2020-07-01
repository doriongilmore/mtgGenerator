<template>
    <div class="confirm">Are you sure ?
        <div class="buttons">
            <Button :text="'Yes'" :handle-click="confirm" class="button"></Button>
            <Button :text="'No'" :handle-click="close"></Button>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Button from "src/components/uiElements/Button.vue";
    export default {
        name: "Confirmation",
        components: { Button },
        computed: {
            ...mapState({
                confirm: state => state.modals.resolve,
                close: state => state.modals.reject,
            }),
        },
    };
</script>

<style lang="less" scoped>
    .confirm {
        margin-top: 20px;
        text-align: center;
        .buttons {
            margin-top: 30px;
            width: 80%;
            margin-left: 10%;
            margin-right: 10%;
            .button {
                width: 50%;
            }
        }
    }
</style>
