<template>
  <div id="fileItems">
      <su-file-box :fileData="files[index]" v-for="(value, index) in files" />
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
import suFileBox from './su-file-box.vue'

export default defineComponent({
    components: {
        suFileBox
    },
  setup() {
      const store = useStore()
      let files = reactive({})
      files = computed(() => {
          return store.getters.fileData
      })
      
      return {
          files
      }
  }
})
</script>

<style lang="less" scoped>
    @silver9: #555761;
    @silver7: #7e8087;
    @silver1: #fafafa;
    @silver3: #d4d4d4;
    @silver5: #abacae;
    #fileItems{
        height: calc(100% - 79px);
        box-shadow: inset 0px 0px 3px @silver3;
        background: @silver1;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow: auto;
    }
</style>
