<template>
  <div class="filecatalog">
    <su-search></su-search>
    <su-dir></su-dir>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs, defineComponent} from "vue"
import suSearch from './su-search.vue'
import suDir from './su-dir.vue'

export default defineComponent({
  components: {
    suSearch,
    suDir
  },
  setup() {
      
  }
})
</script>

<style lang="less" scoped>
  .filecatalog{
    height: 100%;
    width: 195px;
    overflow: hidden;
  }
  @media screen and (max-width: 580px) {
    .filecatalog{
      display: none;
    }
    
  }
</style>
