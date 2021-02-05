<template lang="html">
    <div id="aside">
        <su-up-side />
        <su-down-side />
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import suUpSide from './su-up-side'
import suDownSide from './su-down-side'

export default defineComponent({
    components: {
        suUpSide,
        suDownSide
    },
    setup() {
        return {

        }
    }
})
</script>
<style lang="less">
    #aside{
        width: 40px;
        background: #222222;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }
</style>