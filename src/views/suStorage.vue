<template>
  <div class="storage">
    <su-catalog></su-catalog>
    <su-file></su-file>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs, defineComponent} from "vue"
import suCatalog from  '../components/suCatalog.vue'
import suFile from '../components/suFile.vue'

export default defineComponent({
  components: {
    suCatalog,
    suFile
  },
  setup() {
      
  }
})
</script>

<style lang="less">
  .storage{
    height: 100%;
    display: flex;
    width: calc(100vw - 40px);
  }
</style>
