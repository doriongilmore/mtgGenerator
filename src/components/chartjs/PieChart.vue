<script>
    // DO NOT create template tag see warning in https://vue-chartjs.org/guide/#vue-single-file-components
    import { Pie, mixins } from 'vue-chartjs';

    export default {
        extends: Pie,
        mixins: [mixins.reactiveProp],
        props: ['options'],
        mounted () {
            this.renderChart(this.chartData, this.options);
        }
    }
</script>

<style>
</style>
