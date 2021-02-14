<template>
  <div id="fileSet">
      <div id="path">
        <a v-for="(val, index) in path" @click="changeDir(val,index)">{{val}}<ph-house v-if="index===0" weight="bold" :size="14" /></a>
      </div>
      <div id="mobile">
        <ph-wrench weight="bold" :size="14" />
      </div>
      <div id="set">
        <a class="listD"><ph-list-bullets :size="20" weight="bold" color="#555761" /></a>
        <a class="dotD"><ph-dots-nine :size="20" weight="bold" color="#555761" /></a>
        <a class="words"><ph-folder :size="20" />新建文件夹</a>
        <a class="words"><ph-file-plus :size="20" />文件上传</a>
        <a class="words"><ph-folder-plus :size="20" />文件夹上传</a>
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
      console.log(store.state.init.profile.currentPath)
      return store.state.init.profile.currentPath.split('/')
    })
    function changeDir(data: string, i: number) {
      let cpath = (path.value as any).filter((val: string, index: number) => {
        return index<=i
      })
      store.commit('readDir', cpath)
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
      #mobile{
        display: none;
      }
      #path{
        a{
          cursor: pointer;
          border: 1px solid @silver3;
          border-left: 0px;
          padding: 5px 5px;
          border-radius: 0px;
          background: @silver1;
          box-shadow: 0px 0px 2px @silver3;
          font: 14px sans-serif;
          &:active{
            background: @silver3;
          }
          &:first-child{
            margin-left: 20px;
            border-radius: 4px 0px 0px 4px;
            svg{
              position: relative;
              top: 2px;
            }
            border-left: 1px solid @silver3;
          }
          &:last-child{
            border-radius: 0px 4px 4px 0px;
            
          }
        }
      }
      #set{
        display: flex;
        flex-direction: row-reverse; 
        align-items: center;
        .dotD{
            border: 1px solid @silver5;
            border-radius: 3px;
            box-shadow: inset 0px 0px 2px @silver3;
          }
        .words{
            width: 90px;
          }
        a{
          display: inline-flex;
          cursor: pointer;
          margin: 0px 10px;
          overflow: hidden;
          white-space: nowrap;
          &:first-child,&:nth-child(2){
              margin-top: 2px;
          }
          &:hover{
              
          }
        }
      }
      @media screen and (max-width: 580px) {
        #mobile{
          display: inline-block;
          cursor: pointer;
          border: 1px solid @silver3;
          padding: 4px 5px;
          border-radius: 3px;
          margin-right: 16px;
          background: @silver1;
          box-shadow: 0px 0px 2px @silver3;
          font: 14px sans-serif;
          border-radius: 0px 4px 4px 0px;
          svg{
            position: relative;
            top: 2px;
          }
        }
        #set{
          display: flex;
          flex-direction: column-reverse;
          background: @silver3;
          width: 100px;
          height: 25vh;
          display: none;
          a{
            border: 1px solid @silver1;
            background: @silver1;
          }
          
        }
      }
      
  }
</style>
