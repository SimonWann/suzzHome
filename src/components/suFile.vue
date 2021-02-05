<template lang="html">
    <div id="fileArea">
        <su-profile />
        <su-file-set />
        <su-file-items />
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import suProfile from './su-profile'
import suFileSet from './su-file-set'
import suFileItems from './su-file-items'

export default defineComponent({
    components: {
        suProfile,
        suFileSet,
        suFileItems
    },
    setup() {
        return {

        }
    }
})
</script>
<style lang="less">
   #fileArea{
       width: calc(100% - 195px);
   }
</style>