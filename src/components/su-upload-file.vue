<template>
  <div id="uploadFile" v-show="isShow">
    <label for="upfiles">选择文件</label>
    <input type="file" @change="files()" ref="upfiles" name="" id="upfiles" multiple>
    <li v-for="(val, index) in filesInfo">{{val.name}}</li>
    <ph-check v-if="isExit && isDone" id="check" weight="bold" :size="20" />
    <ph-hand-palm v-if="isExit" id="uploading" :size="20" />
    <button v-if="noWait" @click="uploadNow">上传文件</button>
    <button v-else="noWait" id="wait" disabled><ph-hand-palm weight="bold" :size="18" /></button>
  </div>
</template>

<script lang="ts">
import {reactive, ref, defineComponent, onMounted, computed} from "vue"
import { useStore } from 'vuex'
export default defineComponent({
  name: 'upLoadFile',
  props: [
    'isShow'
  ],
  setup(props) {
    let upfiles = ref()
    let filesInfo = reactive(new Array<any>())
    let noWait = ref(true)
    let store = useStore()
    function files() {
      filesInfo.length = 0
      for(let i=0;i<upfiles.value.files.length;i++){
        filesInfo[i] = upfiles.value.files[i]
      }
      
      for ( let val of upfiles.value.files) {
        let fileReader = new FileReader()
        fileReader.readAsArrayBuffer(val)
        fileReader.onloadstart = () => {
          noWait.value = false
        }
        fileReader.onloadend = () => {
          console.log('end')
          if(fileReader.readyState === 2) {
          noWait.value = true
          store.dispatch('upload', {file: val, data: fileReader.result , currentPath: store.state.init.profile.currentPath})
          }
        }
      } 
      // console.log(filesInfo)
    }
    function uploadNow() {
      store.dispatch('uploadNow')
    }
    const isDone = computed(() => {
      return store.state.itemSet.currentTask.isDone
    })
    const isExit = computed(() => {
      return store.state.itemSet.currentTask.isExit
    })
    onMounted(() => {
      // console.log(upfiles)
    })
    return {
      upfiles,
      files,
      filesInfo,
      noWait,
      uploadNow,
      isDone,
      isExit
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
@silvero: #F6F6F6;
@banana5: #f9c440;
@lime1: #d1ff82;
@lime3: #9bdb4d;
@lime5: #82BF8C;
@lime7: #3a9104;
@lime9: #206b00;
@keyframes hover {
  from{
    background: @lime5;
    box-shadow: 0px 0px 2px @lime5;
  }
  to{
    background: @lime1;
    box-shadow: 0px 0px 5px @lime5;
  }
}
  #uploadFile{
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    border: 1px solid @silver5;
    width: 300px;
    left: 77.5%;
    top: 155px;
    transform: translate(-50%, -50%);
    padding: 30px 10px;
    border-radius: 5px;
    background: @silver1;
    list-style: none;
    box-shadow: 0px 0px 5px @silver3;
    #uploading, #check{
      position: relative;
      left: 7px;
      padding: 3px;
    }
    li{
      padding: 1px 0px 1px 11px;
      border: 1px solid @silver5;
      border-radius: 3px;
      margin-bottom: 4px;
      margin-left: 10px;
      background: @silver3;
      width: 70%;
      overflow: hidden;
    }
    label{
      width: 49px;
      margin-left: 10px;
      margin-bottom: 10px;
      display: inline-block;
      position: relative;
      top: 0px;
      background: @lime5;
      font-size: 14px;
      border: 1px solid darken(@lime7, 8%);
      box-shadow: 0px 0px 2px @lime5;
      outline: none;
      padding: 3px 10px 4px 10px;
      border-radius: 4px;
      font: 400 12px sans-serif;
      color: #000;
      &:active{
        background: darken(@lime5, 8%);
      }
    }
    input{
      opacity: 0;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    span{
      padding: 10px 11px;
    }
    button{
      width: 72px;
      margin-left: 10px;
      position: relative;
      top: 0px;
      background: @lime5;
      border: 1px solid darken(@lime7, 8%);
      box-shadow: 0px 0px 2px @lime5;
      outline: none;
      padding: 3px 10px 4px 10px;
      border-radius: 4px;
      font: 400 12px sans-serif;
      &:active{
        background: darken(@lime5, 8%);
      }
    }
    #wait{
      svg{
        position: relative;
        top: 3px;
      }
    }
  }
  
</style>
