<template>
  <div id="fileItems" @click.right.prevent="showMenu($event)" @click.left="closeMenu">
      <su-file-box :fileData="value" :depth="value.depth" :fileInd="index" v-for="(value, index) in files" />
      <su-rename></su-rename>
      <su-right-item-menu :isShow="isMenuShow" :where="where"></su-right-item-menu>
      <su-photo></su-photo>
  </div>
  
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
import suFileBox from './su-file-box.vue'
import suRename from './su-rename.vue'
import suRightItemMenu from './su-right-item-menu.vue'
import suPhoto from './su-photo.vue'

export default defineComponent({
    components: {
        suFileBox,
        suRename,
        suRightItemMenu,
        suPhoto
    },
  setup() {
      const store = useStore()
      let files = reactive({})
      files = computed(() => {
        //   console.log(store.getters.fileData.data)
          return store.getters.fileData.data
      })
      let isMenuShow = ref(false)
      const where = reactive({
          x: 0,
          y: 0
      })
      function showMenu(e) {
          isMenuShow.value = true
          where.x = e.x
          where.y = e.y
      }
      function closeMenu() {
          isMenuShow.value = false
      }
      return {
          files,
          showMenu,
          closeMenu,
          isMenuShow,
          where
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
        @media screen and (max-width: 580px) {
            #fileItems{
                justify-content: space-around;
            }
        }
    }
</style>
