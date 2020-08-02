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

<style lang="less" scoped></style>
