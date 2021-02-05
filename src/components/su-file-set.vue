<template>
  <div id="fileSet">
      <div id="path">
        <a v-for="(val, index) in path" @click="changeDir(val,index)">{{val}}<ph-house v-if="index===0" weight="bold" :size="14" /></a>
      </div>
      <div id="set">
        <a><ph-list-bullets :size="20" weight="bold" color="#555761" /></a>
        <a><ph-dots-nine :size="20" weight="bold" color="#555761" /></a>
        <a><ph-folder :size="20" />新建文件夹</a>
        <a><ph-file-plus :size="20" />文件上传</a>
        <a><ph-folder-plus :size="20" />文件夹上传</a>
      </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    let store = useStore()
    let path  = computed(() => {
      return store.state.init.profile.currentPath.split('/')
    })
    function changeDir(data: string, i: number) {
      let cpath = (path.value as any).filter((val: string, index: number) => {
        return index<=i
      })
      store.dispatch('readDir', cpath.join('/'))
    }

    return {
      path,
      changeDir
    }
  }
})
</script>

<style lang="less" scoped>
@silver1: #fafafa;
@silver3: #d4d4d4;
@silver5: #abacae;
@silver7: #7e8087;
@silver9: #555761;
  #fileSet{
      display: flex;
      justify-content: space-between;
      color: @silver9;
      height: 40px;
      align-items: center;
      font: 400 14px san-serif;
      border-bottom: 1px solid #d4d4d4;
      #path{
        a{
          cursor: pointer;
          border: 1px solid @silver3;
          border-left: 0px;
          padding: 5px 5px;
          border-radius: 1px;
          background: @silver1;
          box-shadow: 0px 0px 2px @silver3;
          font: 14px sans-serif;
          &:first-child{
            margin-left: 20px;
            svg{
              position: relative;
              top: 2px;
            }
            border-left: 1px solid @silver3;
          }
        }
      }
      #set{
        display: flex;
        flex-direction: row-reverse; 
        align-items: center;
        
        a{
          display: inline-flex;
          cursor: pointer;
          margin: 0px 10px;
          &:first-child,&:nth-child(2){
              margin-top: 2px;
          }
          &:hover{
              
          }
        }
      }
      
  }
</style>
