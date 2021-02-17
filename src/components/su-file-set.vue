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
        <a class="words" @click.stop="newDirModal()" id="newDir"><ph-folder :size="20" />新建文件夹</a>
        <a class="words" @click="upLoadFileShow()" id="uploadDir"><ph-file-plus :size="20" />文件上传</a>
        <a class="words" id="uploadFile"><ph-folder-plus :size="20" />文件夹上传</a>
      </div>
      <su-new-dir :isShow="newDirShow" label="文件夹名" btn="新建文件夹" ></su-new-dir>
      <su-upload-file :isShow="isUpLoadFileShow"></su-upload-file>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, computed, onMounted} from "vue"
import { useStore } from 'vuex'
import suNewDir from './su-new-dir.vue'
import suUploadFile from './su-upload-file.vue'

export default defineComponent({
  components: {
    suNewDir,
    suUploadFile
  },
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
    let newDirShow = ref(false)
    let isUpLoadFileShow = ref(false)
    function newDirModal() {
      newDirShow.value = !newDirShow.value
    }
    function upLoadFileShow() {
      isUpLoadFileShow.value = !isUpLoadFileShow.value
      console.log(isUpLoadFileShow.value)
    }
    onMounted(() => {
      document.onclick = () => {
        newDirShow.value = false
      }
    })
    return {
      path,
      changeDir,
      newDirModal,
      newDirShow,
      isUpLoadFileShow,
      upLoadFileShow
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
@blueberry1: #8cd5ff;
@blueberry3: #64baff;
@blueberry5: #3689e6;
@blueberry7: #0d52bf;
@blueberry9: #002e99;
@keyframes hover {
  from{
    border: 1px solid @silver3;
  }
  to{
    background: @blueberry5;
    color: @silver1;
    border: 1px solid @blueberry9;
    box-shadow: 0px 0px 3px @blueberry7;
  }
}
@keyframes leave {
  from{
    background: @blueberry5;
    color: @silver1;
    border: 1px solid @blueberry9;
    box-shadow: 0px 0px 3px @blueberry7;
  }
  to{
    border: 1px solid @silver3;
  }
}
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
            animation: leave 0.5s forwards;
            width: 90px;
            border: 1px solid @silver3;
            padding: 4px 7px;
            border-radius: 3px;
            font-size: 14px;
            &:hover{
              animation: hover 0.5s forwards ease-out;
            }
            &:active{
              background: @blueberry9;
              
            }
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
